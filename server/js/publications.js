Meteor.publishComposite('tweets', function(email) {
    return {
        find: function() {
            // Find the current user's following users
            return Relationships.find({ follower: email });
        },
        children: [{
            find: function(relationship) {
                // Find tweets from followed users
                return Tweets.find({ user: relationship.following });
            }
        }]
    }
});

Meteor.publish('ownTweets', function(email) {
    return Tweets.find({ user: email });
});

// List of all emails
Meteor.publish('users', function(email) {
    return Meteor.users.find({}, {
        fields: { 'emails.address': 1 },
        limit: 100
    });
});

// List of emails the current user is following
Meteor.publish('followings', function(email) {
    return Relationships.find({ follower: email });
});

Meteor.publish('followers', function(email) {
    return Relationships.find({ following: email });
});

Meteor.publish('replies', function(tweet_id) {
    return Tweets.find({ parent_id: tweet_id });
});
