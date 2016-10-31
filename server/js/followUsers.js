Meteor.methods({
    'findUser': function(email) {
        return Meteor.users.findOne({
            'emails.address': email
        }, {
            fields: { 'emails.address': 1 }
        });
    },
    'followUser': function(email) {
         Relationships.insert({
            follower: Meteor.user().emails[0].address,
            following: email
        });
        
    }
});
