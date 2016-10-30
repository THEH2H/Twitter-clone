Template.likes.helpers({
    NofLikes() {
        if ('likes' in Template.parentData()) {
            return Template.parentData().likes.length;
        } else {
            return '';
        }
    },
    liked() {
        return $.inArray(Meteor.userId(), Template.parentData().likes) > -1;
    }
})

Template.likes.events({
    'click .toggle-like': function(event, template) {
        if (Meteor.user()) {
            Meteor.call('toggleLike', Template.parentData()._id);
        }
    }
})
