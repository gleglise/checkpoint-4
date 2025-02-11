import { Request, Response } from "express";
import databaseClient, { Rows, Result } from "../../database/client";

export const getItems = async (req: Request, res: Response) => {
  try {
    const { collectionId } = req.query;
    const [items] = await databaseClient.query<Rows>(
      "SELECT * FROM items WHERE collection_id = ?",
      [collectionId]
    );

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des items" });
  }
};

export const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [item] = await databaseClient.query<Rows>(
      "SELECT * FROM items WHERE id = ?",
      [id]
    );

    if (!item.length) {
      res.status(404).json({ error: "Item non trouvé" });
    } else {
      res.json(item[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération de l'item" });
  }
};

export const addItem = async (req: Request, res: Response) => {
  try {
    const { collectionId } = req.params;
    const { name, description, image_url, type } = req.body;

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO items (collection_id, name, description, image_url, type) VALUES (?, ?, ?, ?, ?)",
      [collectionId, name, description, image_url, type]
    );

    res.status(201).json({ message: "Item ajouté avec succès", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout de l'item" });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM items WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Item non trouvé" });
    } else {
      res.json({ message: "Item supprimé avec succès" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression de l'item" });
  }
};

