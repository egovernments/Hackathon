import angular from 'angular';
import {
    Meteor
} from 'meteor/meteor';
import {
    name as Application
} from '../imports/ui/components/application/application';

function onReady() {
    angular.bootstrap(document, [
        Application
    ], {
        strictDi: true
    });
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}
