

Template.navBar.helpers({
    'tweets': function() {
        if (Meteor.user()) {
            return Tweets.find({ user: Meteor.user().emails[0].address, parent_id: { $exists: false } }).count();
        }
    },

    'following': function() {
        if (Meteor.user()) {
            return Relationships.find({ follower: Meteor.user().emails[0].address }).count();
        }
    },

    'followers': function() {
        if (Meteor.user()) {
            return Relationships.find({ following: Meteor.user().emails[0].address }).count();
        }
    }
});

Template.navBar.events({
    'click .logout': function() {
        Meteor.logout();
    }
})

Template.userManagement.events({
    'click #signup': function(event) {
        event.preventDefault();
        var user = {
            email: $('#signup-email').val(),
            password: $('#signup-password').val(),
            profile: {
                fullname: $('#signup-fullname').val()
            }
        };

        if (/^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
            Accounts.createUser(user, function(error) {
                if (error) alert(error);
            });
        } else {
            alert('Please provide a valid email');
        }
    },
    'click #login': function() {
        event.preventDefault();
        var email = $('#login-email').val();
        var password = $('#login-password').val();

        Meteor.loginWithPassword(email, password, function(error) {
            if (error) alert(error);
        });
    }

});
