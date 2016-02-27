import FeedCurator from '../libs/feed_curator';
import Share from '/server/libs/models/shares';
import Like from '/server/libs/models/likes';
import Friend from '/server/libs/models/friends';
import Constants from '/server/libs/constants';
import UserData from '/server/libs/models/user_data';
import {
  Meteor
} from 'meteor/meteor';
import {
  check
} from 'meteor/check';


export default function() {

  Meteor.methods({
    'content.getFeed' () {

      this.unblock(); // Allow Method to run on new fiber.
      if (!Meteor.userId()) {
        throw new Meteor.Error('logged-out', 'The user must be logged in to get a feed.');
      }
      const feedCurator = new FeedCurator(Meteor.userId(), Constants().numberOfItemsToDisplay);
      return feedCurator.getFeed();
    }
  });

  Meteor.methods({
    'content.setCategories' (categories) {
      check(categories, [String]);
      // TODO: Make sure categories are valid.
      this.unblock(); // Allow Method to run on new fiber.
      if (!Meteor.userId()) {
        throw new Meteor.Error('logged-out', 'The user must be logged in to select categories.');
      }
      const userData = UserData.findOne({
        userId: Meteor.userId()
      });
      userData.categories = categories;
      userData.save();
      console.log(categories);
    }
  });

  Meteor.methods({
    'userData.setFeedAsRead' () {
      this.unblock(); // Allow Method to run on new fiber.

      if (!Meteor.userId()) {
        throw new Meteor.Error('logged-out', 'The user must be logged in to mark feed as read.');
      }
      const userData = UserData.findOne({
        userId: Meteor.userId()
      });

      userData.nextFeedViewed = true;
      userData.save();
    }
  });




  Meteor.methods({
    'friends.create' (friendId) {
      this.unblock(); // Allow Method to run on new fiber.
      check(friendId, String);

      if (!Meteor.userId()) {
        throw new Meteor.Error('logged-out', 'The user must be logged in to send a friend request.');
      }

      // Make sure user exists
      const friend = Meteor.users.findOne({
        friendId
      });

      if (!friend) {
        throw new Meteor.Error('No such user', 'The useryou are attempting to friend doe snot exist.');
      }

      let friendship = new Friend();
      friendship.userA = Meteor.userId();
      friendship.userB = friendId;
      friendship.save();
    }
  });


  Meteor.methods({
    'friends.accept' (friendRequestId) {
      this.unblock(); // Allow Method to run on new fiber.
      check(friendRequestId, String);

      if (!Meteor.userId()) {
        throw new Meteor.Error('logged-out', 'The user must be logged in to accept a friend request.');
      }

      // Make sure friend request exists
      const friendRequest = Friend.findOne({
        friendRequestId
      });

      if (!friendRequest) {
        throw new Meteor.Error('No such friend request', 'There is friend request with this id.');
      } else if (friendRequest.userB !== Meteor.userId()) {
          throw new Meteor.Error('Acess Denied', 'You cannot accept a friend request you are not part of.');
      } else if (friendRequest.confirmed){
          throw new Meteor.Error('Already Friends', 'This request has alredy been accepted.');
      }
      friendRequest.confirmed = true;
      friendRequest.save();
    },



    'friends.reject' (friendRequestId) {
      this.unblock(); // Allow Method to run on new fiber.
      check(friendRequestId, String);

      if (!Meteor.userId()) {
        throw new Meteor.Error('logged-out', 'The user must be logged in to accept a friend request.');
      }

      // Make sure friend request exists
      const friendRequest = Friend.findOne({
        friendRequestId
      });

      if (!friendRequest) {
        throw new Meteor.Error('No such friend request', 'There is friend request with this id.');
      } else if (friendRequest.userB !== Meteor.userId()) {
          throw new Meteor.Error('Acess Denied', 'You cannot accept a friend request you are not part of.');
      }
      friendRequest.remove();
    }
  });




  Meteor.methods({
    'share.create' (contentId, {
      toUserIds
    }) {
      this.unblock(); // Allow Method to run on new fiber.
      // Security checks
      check(contentId, String);
      let usersToShareWith = [];
      check(toUserIds, [String]);

      if (!!toUserIds && toUserIds.length !== 0) {
        // TODO: Should verify they are friends
        usersToShareWith = toUserIds;
      } else {
        throw new Meteor.Error('Invalid recipient', 'No recipient exists.');
      }

      const userId = Meteor.userId();

      if (!userId) {
        throw new Meteor.Error('logged-out', 'The user must be logged in to share content.');
      }

      const dateShared = new Date();
      // TODO: Merge inserts into one efficient mongo operation
      // TODO: Share is still create even if a user with that ID does not exist
      for (userIdOfMember of usersToShareWith) {
        const share = new Share();
        share.set({
          contentId,
          toUserId: userIdOfMember,
          dateShared,
          userId
        });
        share.save();
      }
    }
  });


  Meteor.methods({
    'like.create' (contentId, contentCategory) {
      this.unblock(); // Allow Method to run on new fiber.
      check(contentId, String); // Security checks
      check(contentCategory, String); // Not essential to obtain this server side (Mainly for learning prefs).

      const userId = Meteor.userId();
      if (!userId) {
        throw new Meteor.Error('logged-out', 'The user must be logged in to like an item.');
      }

      const like = new Like();
      like.set({
        userId,
        contentId,
        dateLiked: new Date(),
        contentCategory
      });
      like.save();
    },

    // 'like.delete'(contentId, contentCategory) {
    //   this.unblock(); // Allow Method to run on new fiber.
    //   check(contentId, String); // Security checks
    //   check(contentCategory, String); // Not essential to obtain this server side (Mainly for learning prefs).
    //
    //   const userId = Meteor.userId();
    //   if (!userId) {
    //     throw new Meteor.Error('logged-out', 'The user must be logged in to like an item.');
    //   }
    //
    //   const like = new Like();
    //   like.set({
    //     userId,
    //     contentId,
    //     dateLiked: new Date(),
    //     contentCategory
    //   });
    //   like.save();
    // }


  });
}


// Meteor.methods({
//   'share.create' (contentId, {
//     toUserIds
//   }) {
//     this.unblock(); // Allow Method to run on new fiber.
//     // Security checks
//     check(contentId, String);
//     let usersInGroup = [];
//     // If a groupID is provided and a single user is not.
//     if (!!groupId && !toUserId) {
//       check(groupId, String);
//       // Obtain group memebers
//       const group = Group.findOne({
//         _id: groupId
//       });
//       if (!!group) {
//         usersInGroup = group.members;
//       } else {
//         throw new Meteor.Error('Invalid Group ID', 'This group does not exist.');
//       }
//     } else if (!!toUserId && !groupId ) {
//       check(toUserId, String);
//       usersInGroup.push(toUserId);
//     } else {
//       throw new Meteor.Error('Invalid recipient', 'No recipient exists.');
//     }
//
//     const userId = Meteor.userId();
//
//     if (!userId) {
//       throw new Meteor.Error('logged-out', 'The user must be logged in to share content.');
//     }
//
//     const dateShared = new Date();
//     // TODO: Merge inserts into one efficient mongo operation
//     // TODO: Share is still create even if a user with that ID does not exist
//     for (userIdOfMember of usersInGroup) {
//       // New share is marked as unused
//       const used = false;
//       const share = new Share();
//       share.set({
//         contentId,
//         groupId,
//         toUserId: userIdOfMember,
//         dateShared,
//         used,
//         userId
//       });
//       share.save();
//     }
//   }
// });
