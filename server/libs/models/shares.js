import {
  Shares
} from '/lib/collections';

const Share = Astro.Class.create({
  name: 'Share',
  collection: Shares,
  fields: {
    userId: {
      type: String
    },
    contentId: {
      type: String,
    },
    dateShared: {
      type: Date,
    },
    toUserId: {
      type: String,
    },
    used: {
      type: Boolean,
      default: false
    },
  },
  indexes: {
    toUserUnused: {
      fields: {
        toUserId: 1,
        used: 1
      },
      options: {}
    }
  }
});


export default Share;
