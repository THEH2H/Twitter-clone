Meteor.methods({
    insertReply: function(message, tweet_id) {
        if (Meteor.user()) {
            Tweets.insert({
                message: message,
                parent_id: tweet_id,
                user: Meteor.user().username,
                timestamp: new Date()
            });
        }
    }
});