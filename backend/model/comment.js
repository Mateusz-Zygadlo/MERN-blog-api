const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  description: {
    type: 'string',
    require: true,
    minLength: 1,
    maxLength: 500,
  },
  authorEmail: {
    type: 'string',
    ref: 'User',
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
})

module.exports = CommentSchema;
module.exports = mongoose.model('Comments', CommentSchema);