Meteor.methods({
    insertReply: function(message, tweet_id) {
        if (Meteor.user()) {
            Tweets.insert({
                message: message,
                parent_id: tweet_id,
                user: Meteor.user().emails[0].address,
                timestamp: new Date()
            });
            this.unblock();
            var email = Tweets.findOne({ _id: tweet_id }).user;
            if (email !== Meteor.user().emails[0].address) {
                Email.send({
                    to: email,
                    from: 'notifications@twitterclone.com',
                    subject: Meteor.user().profile.fullname + ' replied to something you tweeted.',
                    text: message
                });
            }
        }
    }
});
