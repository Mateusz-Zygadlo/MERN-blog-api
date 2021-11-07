const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: 'string',
    require: true,
    minLength: 1,
    maxLength: 50,
  },
  description: {
    type: 'string',
    require: true,
    minLength: 1,
    maxLength: 500,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }]
})

module.exports = PostSchema;
module.exports = mongoose.model('Posts', PostSchema);