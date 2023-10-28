const Notes = require('../models/notes.model');



module.exports = {

  async create(body,payload)  {
    try {
      const { title, description } = body;
      const noteReference = new Notes({title, description, user: payload._id});
      
      const data = await noteReference.save();

      if(!data) {
        return {
          error: true,
          message: `Note was not created`,
        }
      }

      return {
        error: false,
        message: `Note created successfully`,
        data
      }

    } catch (error) {
      console.log(`There was an error: ${error}`);
      return {
        error: true,
        message: `There was an unexpected error!. check the logs`,
      }
    }

  },

  async allNotes(payload) {
    try {
      
      const data = await Notes.find({user: payload._id}).sort({ createdAt: 'desc' }).lean();

      if(!data) return {
        error: false,
        message: `There are not notes in the system at the moment`,
      }

      return {
        error: false,
        message: `Notes`,
        data
      }

    } catch (error) {
      console.log(`There was an error: ${error}`);
      return {
        error: true,
        message: `There was an unexpected error!. check the logs`,
      }
    }
  },

  async findNoteById(id) {
    try {
      
      const data = await Notes.findById(id).lean();

      if(!data) return {
        error: true,
        message: `Note does not exist in the system`,
      }

      return {
        error: false,
        message: `Note found`,
        data
      }

    } catch (error) {
      console.log(`There was an error: ${error}`);
      return {
        error: true,
        message: `There was an unexpected error!. check the logs`,
      }
    }
  },

  async updateNote(id, body) {
    try {
      
      if(!id) return {
        error: true,
        message: `Note identification was not sent!`,
      }

      const data = await Notes.findByIdAndUpdate({_id:id},
        {
          ...body
        }
      );

      if(!data) return {
        error: true,
        message: `Note was not updated!`,
      }

      return {
        error: false,
        message: `Note updated successfully`,
        data,   
      }

    } catch (error) {
      console.log(`There was an error: ${error}`);
      return {
        error: true,
        message: `There was an unexpected error!. check the logs`,
      }
    }
  },


  async deleteNote(id) {
    try {
      
      if(!id) return {
        error: true,
        message: `Note identification was not sent!`,
      }

      const noteDeleted = await Notes.findByIdAndDelete(id);

      if(!noteDeleted) return {
        error: true,
        message: `Note was not deleted!`,
      }

      return {
        error: false,
        message: `Note was deleted successfully`,
      }

    } catch (error) {
      console.log(`There was an error: ${error}`);
      return {
        error: true,
        message: `There was an unexpected error!. check the logs`,
      }
    }
  }

}