import {
  Friends
} from '/lib/collections';

const Friend = Astro.Class.create({
  name: 'Friend',
  collection: Friends,
  fields: {
    userA: String,
    userB: String,
    dateFriended: {
      type: Date,
      default: () => {
        new Date()
      },
    },
    confirmed: {
      type: Boolean,
      default: false
    }
  },
  // indexes: {
  //   userAConfirm: {
  //     fields: {
  //       userA: 1,
  //       confirmed: 1
  //     },
  //     options: {}
  //   },
  //   userAConfirm: {
  //     fields: {
  //       userB: 1,
  //       confirmed: 1
  //     },
  //     options: {}
  //   }
  // }
});


export default Friend;
