import {
  Meteor
} from 'meteor/meteor';
import {
  check
} from 'meteor/check';
import UserData from '/server/libs/models/user_data';

export default function() {

  Meteor.methods({
    'users.add' (data) {

      check(data, {
        email: String,
        profile: {
          firstName: String,
          lastName: String
        },
        password: String
      });

      // Need to Handle error
      const _idNew = Accounts.createUser({
        email: data.email,
        password: data.password,
        profile: data.profile
      });
      const userData = new UserData();
      userData.nextFeed = {};
      userData.userId = _idNew;
      userData.save();
      return {
        _idNew
      };
    },

  });
}
