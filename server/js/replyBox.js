Meteor.methods({
    insertReply: function(message, tweet_id) {
        if (Meteor.user()) {
            Replies.insert({
                message: message,
                tweet_id: tweet_id,
                user: Meteor.user().username,
                timestamp: new Date()
            });
        }
    }
});
