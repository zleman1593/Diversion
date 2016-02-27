import Content from '/server/libs/models/content';
import {
  HTTP
} from 'meteor/http';

export default class ContentCollectors {

  static startDailyCreation() {

    //Obtains fresh content every day by scraping popular sites.
    SyncedCron.add({
      name: 'Get popular images from imgur',
      schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('at 12:01 am');
      },
      job: function() {
        // These are simple placeholder collectors
        ContentCollectors.getContentFromImgur("dog");
        ContentCollectors.getContentFromFlickr();
      }
    });
    SyncedCron.start();
  }


  static getContentFromImgur(tag) {
    const json = this.getImgurJsonForTag(tag).data.data.items;
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
  static getImgurJsonForTag(tag) {
    let url = "https://api.imgur.com/3/gallery/t/" + tag;
    return HTTP.get(url, {
      headers: {
        Authorization: "Client-ID " + "6ed07d8e6c0411a"
      }
    })
  }

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
    const key = '486932268bb85d35e812fba65381e596';
    let url = 'https://api.flickr.com/services/rest/?api_key=${key}&format=json&method=flickr.interestingness.getlist'
    return HTTP.get(url);
  }
}
