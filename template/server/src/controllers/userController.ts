import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import databaseClient, { Result, Rows } from "../../database/client";

// https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
    timeCost: 2,
    parallelism: 1,
  };

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const connection = await databaseClient.getConnection();
    try {
        const hashedPassword = await argon2.hash(password, hashingOptions);

        const [result] = await connection.query<Rows>(
            "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        console.log("sql", result);
        res.status(201).json(result[0]);
    } catch (err) {
        res.status(500).json({ error: "Error registering user" });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const connection = await databaseClient.getConnection();
    try {
      const [result] = await connection.query<Rows>("SELECT * FROM users WHERE email = ?", [email]);
  
      if (result.length === 0) {
        res.status(401).json({ error: "User not found" });
        return;
      }
  
      const user = result[0];
      const isValid = await argon2.verify(user.password_hash, password);
  
      if (!isValid) {
        res.status(401).json({ error: "Invalid password" });
        return;
      }
  
      const token = jwt.sign(
        { userId: user.id },
        process.env.APP_SECRET as string,
        { expiresIn: "1h" }
      );
  
      res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Login error" });
    }
  };
  