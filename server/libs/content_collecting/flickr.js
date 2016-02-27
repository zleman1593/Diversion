import {
  HTTP
} from 'meteor/http';
import Constants from '/server/libs/constants';

export default class Flickr {

  static getContentFromFlickr() {
    const json = this.getJsonFromFlickr();
    console.log(JSON.stringify(json));
    // for (item of json) {
    // 	const content = new Content();
    // 	content.title = item.title;
    // 	content.type = !!item.type ? item.type : "Unspecified";
    // 	content.description = item.description;
    // 	content.contentUrl = item.link;
    // 	content.source = item.link;
    // 	content.rating = 50;
    // 	content.save();
    // }
  }

  static getJsonFromFlickr() {
    const key = Constants.flickrKey;
    let url = 'https://api.flickr.com/services/rest/?api_key=${key}&format=json&method=flickr.interestingness.getlist'
    return HTTP.get(url);
  }
}
