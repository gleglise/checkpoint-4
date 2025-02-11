import { Request, Response } from "express";
import databaseClient, { Result, Rows } from "../../database/client";

export const getCollections = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const [collections] = await databaseClient.query(
      "SELECT * FROM collections WHERE user_id = ?",
      [userId]
    );
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des collections" });
  }
};

export const getCollection = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [collection] = await databaseClient.query<Rows>(
      "SELECT * FROM collections WHERE id = ?",
      [id]
    );

    if (!collection.length) {
        res.status(404).json({ error: "Collection non trouvée" });
    } else {
        res.json(collection[0]);
    }
    
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération de la collection" });
  }
};

export const addCollection = async (req: Request, res: Response) => {
  try {
    const { user_id, name } = req.body;
    const [result] = await databaseClient.query<Rows>(
      "INSERT INTO collections (user_id, name) VALUES (?, ?)",
      [user_id, name]
    );
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout de la collection" });
  }
};

export const deleteCollection = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const [result] = await databaseClient.query<Result>(
        "DELETE FROM collections WHERE id = ?",
        [id]
      );
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Collection non trouvé" });
      } else {
        res.json({ message: "Collection supprimé avec succès" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression de la collection" });
    }
  };
