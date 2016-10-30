Meteor.methods({
    toggleLike: function(tweet_id) {
        if (Meteor.user()) {
            var liked = Tweets.findOne({ _id: tweet_id, likes: Meteor.userId() });
            if (liked == null) {
                Tweets.update({ _id: tweet_id }, { $push: { likes: Meteor.userId() } });
            } else {
                Tweets.update({ _id: tweet_id }, { $pull: { likes: Meteor.userId() } });
            }
        }
    }
});
