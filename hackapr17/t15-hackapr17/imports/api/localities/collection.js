import {
    Mongo
} from 'meteor/mongo';

export const Localities = new Mongo.Collection('localities');

Localities.allow({
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
