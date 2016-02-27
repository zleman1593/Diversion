import {Content} from '/lib/collections';
import {
  Meteor
} from 'meteor/meteor';

export default function () {


  Meteor.call("content.getFeed", function(error, result){
    if(error){
      console.log("error", error);
    }
    if(result){
      console.log("Sucesss", result)
    }
  });

    /*
  testUserAdd();
    function testUserAdd() {
      const dataObject = {
        email: 'test@test.com',
        profile: {
          firstName: 'test',
          lastName: 'test'
        },
        password:'123456'
      };
      Meteor.call("content.setCategories", ['Funny'], function(error, result){
        if(error){
          console.log("error", error);
        }
        if(result){
          console.log("Sucesss", result)
        }
      });
    }*/

  //testShare();

  function testShare() {



    // const dataObject = {
    //
    // toUserId: 'toUserId223'
    //   }
    //
    // Meteor.call("share.create", "contentId23", dataObject, function(error, result){
    //   if(error){
    //     console.log("error", error);
    //   }
    //   if(result){
    //     console.log("Sucesss", result)
    //   }
    // });
  }

}
