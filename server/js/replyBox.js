Meteor.methods({
    insertReply: function(message, tweet_id) {
        if (Meteor.user()) {
            Tweets.insert({
                message: message,
                parent_id: tweet_id,
                user: Meteor.user().username,
                timestamp: new Date()
            });
            this.unblock();
            var username = Tweets.findOne({ _id: tweet_id }).user;
            if (username !== Meteor.user().username) {
                Email.send({
                    to: username,
                    from: 'notifications@twitterclone.com',
                    subject: Meteor.user().profile.fullname + ' replied to something you tweeted.',
                    text: message
                });
            }
        }
    }
});
