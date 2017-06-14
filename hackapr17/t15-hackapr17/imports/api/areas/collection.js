import {
    Mongo
} from 'meteor/mongo';

export const Areas = new Mongo.Collection('areas');

Areas.allow({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});
