import {
    Mongo
} from 'meteor/mongo';

export const Wards = new Mongo.Collection('wards');

Wards.allow({
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
