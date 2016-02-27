import Constants from '/server/libs/constants';
import Flickr from './flickr';
import Imgur from './imgur';
export default class ContentCollectors {

  static startDailyCreation() {

    // Obtains fresh content every day by scraping popular sites.
    SyncedCron.add({
      name: 'Get popular images from imgur',
      schedule: function(parser) {
        // parser is a later.parse object
        return parser.text(Constants.scrapingTimeMorning);
      },
      job: function() {
        // These are simple placeholder collectors
        Imgur.getContent("dog");
        Flickr.getContent();
      }
    });
    SyncedCron.start();
  }

}
