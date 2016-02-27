import {Mongo} from 'meteor/mongo';


// Stores the user's cached feed and other user related information
export const UserData = new Mongo.Collection('userData');
// Indicates what user likes what content
export const Likes = new Mongo.Collection('likes');
// Stores content metadata and possibly full content data
export const Content = new Mongo.Collection('content');
// Indicates what content one user is sharing with another
export const Shares = new Mongo.Collection('shares');
// Stores the friendship relationhip between two users
export const Friends = new Mongo.Collection('friends');
