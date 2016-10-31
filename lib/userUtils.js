UserUtils = function() {};

UserUtils.findFollowings = function(email) {
    var currentFollowings = Relationships.find({
        follower: email
    }).fetch().map(function(data) {
        return data.following;
    });
    currentFollowings.push(email);

    return currentFollowings;
};
