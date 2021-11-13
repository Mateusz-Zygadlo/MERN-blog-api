const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: 'string',
    require: true,
    minLength: 1,
    maxLength: 60,
  },
  description: {
    type: 'string',
    require: true,
    minLength: 1,
    maxLength: 2500,
  },
  postAbbreviation: {
    type: 'string',
    require: true,
    minLength: 1,
    maxLength: 120,
  },
  date: {
    type: 'string',
    require: true,
  },
  isPublic: {
    type: 'boolean',
    require: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  authorEmail: {
    type: 'string',
    require: true,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }]
})

module.exports = PostSchema;
module.exports = mongoose.model('Posts', PostSchema);