import express from "express";
import { getItems, addItem, getItem, deleteItem} from "../controllers/itemController";

const router = express.Router();

router.get("/readAll", getItems);
router.post("/:collectionId", addItem);
router.get("/:id", getItem);
router.delete("/:id", deleteItem);

export default router;
