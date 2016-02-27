import Share from '/server/libs/models/shares';
import Content from '/server/libs/models/content';
import UserData from '/server/libs/models/user_data';
import _ from 'lodash';

export default class FeedCurator {

  constructor(userId, itemLimit) {
    this.userId = userId;
    this.itemLimit = itemLimit;
  }
  getFeed() {

    let userData = UserData.findOne({
      userId: this.userId
    });
    if (!userData) {
      return;
    }

    const {
      shares,
      personalizedContent,
      nativeAds
    } = userData.nextFeed

    // If feed cache does not exist then create the feed, cache it, and send to user.
    // If feed is cached and user has not seen whole feed, send the cache.
    // If feed is cached and user has seen whole feed and it is time for new content to be shown, send the cache, else send cached data.
    let now = new Date();
    if (!shares || !personalizedContent || !nativeAds || (userData.nextFeedViewed && userData.nextFeedCreated > now.setHours(now.getHours() - 7))) {


      // Get user data to make decision on what to include in feed. (Only recent)
      // Get items recomended by friends for feed. (Include backlog)
      userData.nextFeed = {
        shares: this.getShares(),
        personalizedContent: this.getPersonalized(userData),
        nativeAds: this.getNativeAds()
      };


      // Update document with with only the fields that have changed.
      userData.save(() => {
        return
      }); //Added callback so that it will not block
    }
    return userData.nextFeed;
  };
  getNativeAds() {
    return [];
  }

  // Gets content base don user's interests. Currently uses only category information.
  // TODO:  Incorporate like history to make decision.
  getPersonalized(userData) {
    let items = [];
    const numberOfCategoriesSelected = userData.categories.length;
    if (numberOfCategoriesSelected === 0) {
      return [];
    }

    const numberOfItemsPerCategory = this.itemLimit /
      numberOfCategoriesSelected;
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get content that for each category that was created today.
    userData.categories.forEach((category) => {
      const content = Content.find({
        category: category,
        dateCreated: {
          $gte: today
        }
      }, {
        limit: numberOfItemsPerCategory
      }).fetch();
      items = items.concat(content);
    });
    //Need to account for cases where there should be more content added from one category
    return _.map(items, (item) => {
      return item.raw();
    });
  };

  // Gets the content that friends have shared with user.
  getShares() {
    let shares = Share.find({
      toUserId: this.userId,
      used: false
    }).fetch();

    shares = _.map(shares, (share) => {
      return share.raw();
    });

    // Mark shares included in feed as read so they will not be included in the feed again.
    Share.update({
      _id: {
        $in: _.map(shares, '_id')
      }
    }, {
      $set: {
        used: true
      }
    });
    return shares;
  };
}
