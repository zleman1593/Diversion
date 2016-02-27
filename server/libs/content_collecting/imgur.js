import {
  HTTP
} from 'meteor/http';
import Constants from '/server/libs/constants';

export default class Imgur {

  static getContent(tag) {
    const json = this.getJsonForTag(tag).data.data.items;
    for (item of json) {
      const content = new Content();
      content.title = item.title;
      content.type = !!item.type ? item.type : "Unspecified";
      content.description = item.description;
      content.contentUrl = item.link;
      content.source = item.link;
      content.rating = 50;
      content.category = 'Funny';
      content.dateCreated = new Date();
      content.save();
    }
  }

  static getJsonForTag(tag) {
    let url = "https://api.imgur.com/3/gallery/t/" + tag;
    return HTTP.get(url, {
      headers: {
        Authorization: "Client-ID " + Constants.imgurKey
      }
    })
  }

}
