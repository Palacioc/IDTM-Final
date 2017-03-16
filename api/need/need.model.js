const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const needSchema = new mongoose.Schema({
    _project : { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    name: {
      type: String,
      required: [true, 'A need name is required']
    },
    image: {
      type: String, default: ''
    },
    accNo: {
      type: String, default: ''
    },
    description: {
      type: String,
      required: [true, 'A project description is required']
    },
    status: {
      type: String,
      enum : ['Grey', 'Green', 'Blue'],
      default : 'Grey'
    },
    _allocatedProvider: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    _allocatedCollaborator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    cost: {
      type: Number,
      default: 0
    }
  },{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model('Need', needSchema);
