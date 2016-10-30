Template.tweetBox.onCreated(function() {
    this.numChars = new ReactiveVar(0);
})

Template.tweetBox.helpers({
    charCount() {
        return 200 - Template.instance().numChars.get();
    },
    charClass() {
        if (Template.instance().numChars.get() > 200) {
            return 'errCharCount'; //css class name
        } else {
            return 'charCount'; //css class name
        }
    },
    disableButton: function() {
        if (Template.instance().numChars.get() <= 0 ||
            Template.instance().numChars.get() > 200 ||
            !Meteor.user()) {
            return 'disabled';
        }
    }
})
Template.tweetBox.events({
    'input #tweetText' (event, template) {
        template.numChars.set($('#tweetText').val().length);
    },
    'click button' (event, template) {
        var tweet = $('#tweetText').val();
        $('#tweetText').val('');
        template.numChars.set(0);
        if (Meteor.user()) {
            Meteor.call('insertTweet', tweet);
        }
    }
})
