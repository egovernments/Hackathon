import {
    Mongo
} from 'meteor/mongo';

export const Masters = new Mongo.Collection('masters');

Masters.allow({
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
