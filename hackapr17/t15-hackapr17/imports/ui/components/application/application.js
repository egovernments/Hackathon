import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import webTemplate from './application.html';
import {
    Meteor
} from 'meteor/meteor';
import {
    name as March
} from '../march/march';

class Application {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'application';
const template = webTemplate;

// Module Creation (Aman Gupta)
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    March
]).component(name, {
    template,
    controllerAs: name,
    controller: Application
});
