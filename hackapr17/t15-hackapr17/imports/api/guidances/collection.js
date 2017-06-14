import {
    Mongo
} from 'meteor/mongo';

export const Guidances = new Mongo.Collection('guidances');

Guidances.allow({
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
