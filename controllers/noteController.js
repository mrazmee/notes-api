const { response } = require("express");
const { nanoid } = require("nanoid")
const notes  = require("../notes");

const addNoteHandler = async (req, res) =>{
    const { title, tags, body } = req.body;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    }

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if(isSuccess){
        return res.status(201).send({
            status: "Success",
            message: "Catatan berhasil ditambahkan",
            data: {
                noteId: id
            }
        })
    }

    return res.status(500).send({
        status: 'fail',
        message: 'Catatan gagal ditambahkan'
    })
};

const getAllNoteHandler = async (req, res) => {
    return res.status(200).send({
        status: 'Success',
        data: {
            notes
        }
    })
}

const getNoteById = async (req, res) => {
    const { id } = req.params;
    const note = notes.filter((note) => note.id === id)[0];

    if(note !== undefined){
        return res.status(200).send({
            status:'Success',
            data: {
                note
            }
        })
    }

    return res.status(404).send({
        status: 'Fail',
        message: 'Catatan tidak ditemukan'
    })
}

const editNoteByIdHandler = async (req, res) => {
    const { id } = req.params;

    const { title, tags, body } = req.body;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        }

        return res.status(200).send({
            status: 'Success',
            message: 'Catatan berhasil diperbarui'
        })
    }

    return res.status(404).send({
        status: 'Fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan'
    })
}

const deleteNoteByIdHandler = async (req, res) => {
    const { id } = req.params;

    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1){
        notes.splice(index, 1);
        return res.status(200).send({
            status: 'success',
            message: 'Catatan berhasil dihapus'
        })
    }

    return res.status(404).send({
        status: 'fail',
        message: 'Catatan gagal dihapus, Id tidak ditemukan'
    })
}

module.exports = { addNoteHandler, getAllNoteHandler, getNoteById, editNoteByIdHandler, deleteNoteByIdHandler };