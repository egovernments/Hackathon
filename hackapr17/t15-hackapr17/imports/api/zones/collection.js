import {
    Mongo
} from 'meteor/mongo';

export const Zones = new Mongo.Collection('zones');

Zones.allow({
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
