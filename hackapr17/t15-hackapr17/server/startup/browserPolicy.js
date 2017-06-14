import {
    Meteor
} from 'meteor/meteor';

Meteor.startup(function() {
    BrowserPolicy.content.allowOriginForAll('*');
});
