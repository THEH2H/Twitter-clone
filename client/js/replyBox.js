Template.replyBox.events({
    'submit form': function(event, template) {
        event.preventDefault();
        var tweet_id = Template.parentData()._id;
        var message = event.target.message.value;
        event.target.message.value = '';
        if (Meteor.user()) {
            Meteor.call('insertReply', message, tweet_id);
        }
    }
})
