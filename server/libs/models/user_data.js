import {
  UserData
} from '/lib/collections';


const UserDataModel = Astro.Class.create({
  name: 'UserDataModel',
  collection: UserData,
  fields: {
    userId: {
      type: String,
      index: 1
    },
    learnedPrefs:{
      contentTypePrefs:Object,
      contentCategoryPrefs:Object,
      adEngagement:Object,
    },
    nextFeed: {
      shares: [Object],
      personalizedContent: [Object],
      nativeAds: [Object],
    },
    nextFeedCreated: {
      type: Date,
      default: new Date()
    },
    nextFeedViewed: Boolean,
    categories: {
      type: [String],
      default: () => {
        []
      }
    }
  }
});



export default UserDataModel;
