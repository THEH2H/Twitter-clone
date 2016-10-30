// var replies = [{
//     message: 'this is a first test reply',
//     user: '1',
//     createdAt: new Date()
// }, {
//     message: 'this is a second test reply',
//     user: '2',
//     createdAt: new Date()
// }, {
//     message: 'this is a third test reply',
//     user: '3',
//     createdAt: new Date()
// }];

Template.tweetReplies.onCreated(function() {
    if (Meteor.user()) {
        this.subscribe('replies', Template.parentData()._id);
    }
});

Template.tweetReplies.helpers({
    'tweetReply': function() {
        return Replies.find({ tweet_id: Template.parentData()._id });
    }
})
