import {Likes} from '/lib/collections';

 const Like = Astro.Class.create({
  name: 'Like',
  collection: Likes,
  fields: {
    userId: {
      type: String,
      //index:1
    },
    contentId: {
      type: String,
    },
     dateLiked: {
      type: Date,
    },
    contentCategory: {
      type: String,
    },
  }
});


export default Like;
