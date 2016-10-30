Template.followUsers.onCreated(function() {
    if (Meteor.user()) {
        this.subscribe('followings', Meteor.user().username);
        this.subscribe('followers', Meteor.user().username);
        this.subscribe('tweets', Meteor.user().username);
    }
});

Template.userManagement.helpers({
    'tweets': function() {
        if (Meteor.user()) {
            return Tweets.find({ user: Meteor.user().username, parent_id: { $exists: false } }).count();
        }
    },

    'following': function() {
        if (Meteor.user()) {
            return Relationships.find({ follower: Meteor.user().username }).count();
        }
    },

    'followers': function() {
        if (Meteor.user()) {
            return Relationships.find({ following: Meteor.user().username }).count();
        }
    }
});



Template.userManagement.events({
    'click #signup': function(event) {
        event.preventDefault();
        var user = {
            username: $('#signup-username').val(),
            password: $('#signup-password').val(),
            profile: {
                fullname: $('#signup-fullname').val()
            }
        };

        if (/^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.username)) {
            Accounts.createUser(user, function(error) {
                if (error) alert(error);
            });
        } else {
            alert('Please provide a valid email');
        }
    },
    'click #login': function() {
        event.preventDefault();
        var username = $('#login-username').val();
        var password = $('#login-password').val();

        Meteor.loginWithPassword({ username: username }, password, function(error) {
            if (error) alert(error);
        });
    },
    'click #logout': function() {
        Meteor.logout();
    }
});
