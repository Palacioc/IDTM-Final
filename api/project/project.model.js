const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
    _creator : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: {
      type: String,
      required: [true, 'A project name is required']
    },
    description: {
      type: String,
      required: [true, 'A project description is required']
    },
    image: {
      type: String, default: ''
    },
    completed: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
    }
  },{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model('Project', projectSchema);
