Template.tweetFeed.onCreated(function() {
    if (Meteor.user()) {
        this.subscribe('tweets', Meteor.user().emails[0].address);
        this.subscribe('ownTweets', Meteor.user().emails[0].address);
    }
});

Template.tweetFeed.helpers({
    'tweetMessage': function() {
        return Tweets.find({ parent_id: { $exists: false } }, {
            sort: { timestamp: -1 },
            limit: 10
        });
    }
});

Template.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).fromNow();
});
