import {
    Meteor
} from 'meteor/meteor';

// Users can update themselves (Aman Gupta)
Meteor.users.allow({
    update() {
        return true;
    }
});
