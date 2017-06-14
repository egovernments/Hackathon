import {
    Mongo
} from 'meteor/mongo';

export const Complaints = new Mongo.Collection('complaints');

Complaints.allow({
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
