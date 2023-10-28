const router = require('express').Router();
const {
  isAuthenticated,
} = require('../middlewares/auth.middleware');
const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote
} = require('../controllers/notes.controllers.js');


// Create new Notes routes
router.get('/add',isAuthenticated,renderNoteForm);
router.post('/new-note',isAuthenticated,createNewNote);

// Get all Notes
router.get('',isAuthenticated,renderNotes);


// Update Note
router.get('/edit/:id', isAuthenticated,renderEditForm);
router.put('/edit/:id',isAuthenticated,updateNote); 

// Delete Note 
router.delete('/delete/:id',isAuthenticated,deleteNote);


module.exports = router;