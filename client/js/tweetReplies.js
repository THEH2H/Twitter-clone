Template.tweetReplies.onCreated(function() {
    if (Meteor.user()) {
        this.subscribe('replies', Template.parentData()._id);
    }
});

Template.tweetReplies.helpers({
    'tweetReply': function() {
        return Tweets.find({ parent_id: Template.parentData()._id });
    }
})
