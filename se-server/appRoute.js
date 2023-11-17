const express = require("express");
const fs = require('fs');
const path = require('path')
const AuthHandler = require('./handlers/Auth')
const NoteHandler = require('./handlers/NoteHandler')
const MusicHandler = require('./handlers/MusicHandler')
const user = require('./Auth').user

const router = express.Router();
const { getToDo, addToDo, completeToDo, updateToDo, deleteToDo, deleteAllToDo, trashToDo} = require("./load");
router.route("/load/ToDo").get(getToDo);
router.route("/load/ToDo/").post(addToDo);
router.route("/load/ToDo/complete").put(completeToDo);
router.route("/load/ToDo/update").put(updateToDo);
router.route("/load/ToDo").delete(deleteToDo);
router.route("/load/ToDo/trash").put(trashToDo);
router.route("/admin/delete").delete(deleteAllToDo);
router.route('/login').post(AuthHandler.handleLogin)
router.route('/signup').post(AuthHandler.handleSignup)
router.route('/logout').get(AuthHandler.handleLogout)
router.route('/load/notes', user.ensureAuthenticated).get(NoteHandler.handleGetNotes)
router.route('/load/note/:id', user.ensureAuthenticated).get(NoteHandler.handleGetNote)
router.route('/load/note', user.ensureAuthenticated).post(NoteHandler.handleCreateNote)
router.route('/load/note', user.ensureAuthenticated).put(NoteHandler.handleUpdateNote)
router.route('/load/note/:noteId', user.ensureAuthenticated).delete(NoteHandler.handleDeleteNote)
router.route('/load/note/favourite', user.ensureAuthenticated).post(NoteHandler.handleMarkAsFavourite)

router.route('/load/music', user.ensureAuthenticated).get(MusicHandler.handleGetMusicList)
router.route('/load/music/:id', user.ensureAuthenticated).delete(MusicHandler.handleDeleteMusic)
router.route('/load/music', user.ensureAuthenticated).post(MusicHandler.handleCreateMusic)
module.exports = router;