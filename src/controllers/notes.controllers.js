const { 
  create,
  allNotes,
  deleteNote,
  findNoteById,
  updateNote,
} = require('../services/notes.services');


module.exports = {

  renderNoteForm(req,res) {
    res.render('notes/new-note')
  },

  async createNewNote(req,res) {
    try {
      
      const { error, message, data } = await create(req.body, req.user);

      if(error) {
        req.flash('error_msg', message);
      }

      req.flash('success_msg', message);
      res.redirect('/api/notes');


    } catch (error) {
      console.log(`There was an error: ${error}`);
      return res.status(500).json({
        error: true,
        message: `There was an expected error. Check the logs`,
      });
    }
  },

  async renderNotes(req,res) {
    
    const { data, error } = await allNotes(req.user);
    res.render('notes/all-notes', {data});

  },

  async renderEditForm(req,res) {
    try {
      
      const { error, message, data } = await findNoteById(req.params.id);

      if(error) {
        req.flash('error_msg', message);
      }
      
      res.render('notes/edit-note', {note:data});

    } catch (error) {
      console.log(`There was an error: ${error}`);
      return res.status(500).json({
        error: true,
        message: `There was an expected error. Check the logs`, 
      });
    }
  },

  async updateNote(req,res) {
    try {
      
      const { error, message } = await updateNote(req.params.id, req.body);

      if(error) {
        req.flash('error_msg', message);
      }

      req.flash('success_msg', message);
      res.redirect('/api/notes');

    } catch (error) {
      console.log(`There was an error: ${error}`);
      return res.status(500).json({
        error: true,
        message: `There was an expected error. Check the logs`,
      });
    }
  },


  async deleteNote(req,res) {
    try {
      
      const { error, message } = await deleteNote(req.params.id);

      if(error) {
        req.flash('error_msg', message);
      }

      req.flash('success_msg', message);
      res.redirect('/api/notes');

    } catch (error) {
      console.log(`There was an error: ${error}`);
      return res.status(500).json({
        error: true,
        message: `There was an expected error. Check the logs`,
      });
    }
  }

}
