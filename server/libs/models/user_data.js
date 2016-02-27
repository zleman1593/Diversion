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
