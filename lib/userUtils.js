UserUtils = function() {};

UserUtils.findFollowings = function(username) {
    var currentFollowings = Relationships.find({
        follower: username
    }).fetch().map(function(data) {
        return data.following;
    });
    currentFollowings.push(username);

    return currentFollowings;
};
