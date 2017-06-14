import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './login.html';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import {
    Meteor
} from 'meteor/meteor';
import {
    Session
} from 'meteor/session'
import {
    check
} from 'meteor/check'

class Login {
    constructor($scope, $reactive, $state, $rootScope, $timeout) {
        'ngInject';
        $reactive(this).attach($scope);

        this.state = $state;
        this.rootScope = $rootScope;

        $rootScope.currentState = $state.current.name;
        $rootScope.Spinner = true;

        // Session.set('loadingOn', false)

        this.helpers({});
    }
}

const name = 'login';

// Module Creation
export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    ngSanitize,
    uiRouter
]).component(name, {
    template,
    controllerAs: name,
    controller: Login
}).config(config);


function config($stateProvider) {
    'ngInject';
    $stateProvider.state('march.login', {
        url: '/login',
        views: {
            'menuContent': {
                template: '<login></login>'
            }
        }
    });
}
