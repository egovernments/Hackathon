import {
    Mongo
} from 'meteor/mongo';

export const Results = new Mongo.Collection('results');

Results.allow({
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
