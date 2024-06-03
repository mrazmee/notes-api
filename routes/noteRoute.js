const { addNoteHandler, getAllNoteHandler, getNoteById, editNoteByIdHandler, deleteNoteByIdHandler } = require("../controllers/noteController");
const express = require("express");
const router = express.Router();

router.post("/notes", addNoteHandler);
router.get("/notes", getAllNoteHandler);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', editNoteByIdHandler);
router.delete('/notes/:id', deleteNoteByIdHandler);

module.exports = router;