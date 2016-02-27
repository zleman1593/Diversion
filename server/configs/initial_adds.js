import {
  Content
} from '/lib/collections';
import workers from '/server/libs';
import {
  Meteor
} from 'meteor/meteor';

export default function() {

  //Start Workers for test data.
  const {ContentCollectors} = workers()
  ContentCollectors.getContentFromImgur("cow");
}
