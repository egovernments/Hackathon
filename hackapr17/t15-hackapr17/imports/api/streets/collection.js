import {
    Mongo
} from 'meteor/mongo';

export const Streets = new Mongo.Collection('streets');

Streets.allow({
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
