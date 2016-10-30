import { Meteor } from 'meteor/meteor';



Meteor.startup(() => {
    // code to run on server at startup
    Relationships._ensureIndex({ follower: 1, following: 1 }, { unique: 1 });
});
