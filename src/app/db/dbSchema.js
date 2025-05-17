

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
   
  },
  email: {
    type: String,
    required: true,
    unique: true,
    
  },
 
  posts: [{
    type: Schema.Types.String,
    ref: 'Post'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Subscriber Schema
const subscriberSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
});

// Post Schema
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 10
  },
  images:{
    type: Array,
    default: []
    },
    
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName:{
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Models
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);
export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
