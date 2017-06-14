import {
    Mongo
} from 'meteor/mongo';

export const Types = new Mongo.Collection('types');

Types.allow({
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
