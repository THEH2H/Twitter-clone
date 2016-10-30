Template.followUsers.onCreated(function() {

    var template = this;
    template.foundUser = new ReactiveVar();


    if (Meteor.user()) {
        this.subscribe('users', Meteor.user().username)
        this.subscribe('followings', Meteor.user().username);
    }
});

Template.followUsers.helpers({
    'foundUser': function() {
        return Template.instance().foundUser.get();
    },
    'recommendedUsers': function() {
        if (Meteor.user()) {
            var currentFollowings = UserUtils.findFollowings(Meteor.user().username);
            var recUsers = Meteor.users.find({
                username: {
                    $nin: currentFollowings
                }
            }, {
                fields: { 'username': 1 },
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
            if (res) template.foundUser.set(res);
        });
        return false;
    },
    'click #follow': function(event, template) {
        console.log(template.foundUser.get().username);
        Meteor.call('followUser', template.foundUser.get().username);
    },
    'click #followRec': function(event) {
        Meteor.call('followUser', this.username);
    }
});
