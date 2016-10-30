Template.replyBox.onCreated(function() {
    this.showBox = new ReactiveVar(false);
})

Template.replyBox.helpers({
    'showBox': function() {
        return Template.instance().showBox.get();
    }
})

Template.replyBox.events({
    'submit form': function(event, template) {
        event.preventDefault();
        var tweet_id = Template.parentData()._id;
        var message = event.target.message.value;
        event.target.message.value = '';
        if (Meteor.user()) {
            Meteor.call('insertReply', message, tweet_id);
        }
    },
    'click .show-box': function(event, template) {
        template.showBox.set(!template.showBox.get());
    }
})
