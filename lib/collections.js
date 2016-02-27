import {Mongo} from 'meteor/mongo';

export const UserData = new Mongo.Collection('userData');
export const Likes = new Mongo.Collection('likes');
export const Content = new Mongo.Collection('content');
export const Shares = new Mongo.Collection('shares');
export const Friends = new Mongo.Collection('friends');
// export const Groups = new Mongo.Collection('groups');
