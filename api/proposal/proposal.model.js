const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proposalSchema = new mongoose.Schema({
    _need : { type: Schema.Types.ObjectId, ref: 'Need', required: true },
    _contributor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required : true
    },
    coverage: {
      type: String,
      enum : ['Green', 'Blue'],
      default : 'Blue',
      required: [true, 'A proposal type is required']
    },
    comment: {
      type: String,
      required: [true, 'A proposal description is required']
    },
    cost: {
      type: Number,
      default: 0
    },
    accountNo: {
      type: String,
      default: 0,
      required: [true, 'A bank account number is required to receive payment for your service']
    },
    status: {
      type: Boolean,
      default: false,
    }

  },{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model('Proposal', proposalSchema);
