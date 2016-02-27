import {Content} from '/lib/collections';

 const ContentModel = Astro.Class.create({
  name: 'Content',
  collection: Content,
  fields: {
    title: String,
    description: {
      type: String,
      optional:true
    },
    type:String,
    source: String,
    contentUrl: String,
    rating:Number,
    dateCreated:{
      type:Date,
      default: new Date()
    },
    category:String
  },
  // indexes: {
  //   bestInCategory: {
  //     fields: {
  //       category: 1,
  //       rating: 1
  //     },
  //     options: {}
  //   }
  // }
});


export default ContentModel;
