Template.followUsers.onCreated(function() {

    var template = this;
    template.foundUser = new ReactiveVar();


    if (Meteor.user()) {
        this.subscribe('users', Meteor.user().emails[0].address)
        this.subscribe('followings', Meteor.user().emails[0].address);
        this.subscribe('followers', Meteor.user().emails[0].address);
        this.subscribe('tweets', Meteor.user().emails[0].address);
    }
});



Template.followUsers.helpers({
    'foundUser': function() {
        return Template.instance().foundUser.get();
    },
    'recommendedUsers': function() {
        if (Meteor.user()) {
            var currentFollowings = UserUtils.findFollowings(Meteor.user().emails[0].address);
            var recUsers = Meteor.users.find({
                'emails.address': {
                    $nin: currentFollowings
                }
            }, {
                fields: { 'emails.address': 1 },
                limit: 5
            }).fetch();


            return recUsers;
        }
    }
});

Template.followUsers.events({
    'submit form': function(event, template) {
        var searchUser = event.target.searchUser.value;
        var foundUser = Meteor.call('findUser', searchUser, function(err, res) {
            // console.log(res);
            if (res) template.foundUser.set(res);
        });
        return false;
    },
    'click #follow': function(event, template) {
        // console.log(template.foundUser.get().emails[0].address);
        Meteor.call('followUser', template.foundUser.get().emails[0].address);
    },
    'click #followRec': function(event) {
        Meteor.call('followUser', this.emails[0].address);
    }
});
