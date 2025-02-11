import express from "express";
import { getCollections, getCollection, addCollection, deleteCollection } from "../controllers/collectionController";

const router = express.Router();

router.get("/readAll", getCollections);
router.get("/:id", getCollection);
router.post("/", addCollection);
router.delete("/:id", deleteCollection);

export default router;
