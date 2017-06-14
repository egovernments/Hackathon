import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './march.html';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import {
    Meteor
} from 'meteor/meteor';
import {
    Tracker
} from 'meteor/tracker'
import {
    name as Home
} from '../home/home';
import {
    name as Login
} from '../login/login';
import {
    name as Analytics
} from '../analytics/analytics';


class March {
    constructor($scope, $reactive, $rootScope, $timeout, $state, $interval) {

        'ngInject';
        $rootScope.isStateChanging = false;
        $reactive(this).attach($scope);

        $scope.activeMenu = $state.current.name;
        $rootScope.currentState = $state.current.name;

        this.state = $state;
        this.timeout = $timeout;
        this.scope = $scope;
        this.rootScope = $rootScope;

        $scope.isActive = function(menu) {
            if ($scope.activeMenu == menu) {
                return true;
            } else {
                return false;
            }
        };

        $scope.setActive = function(menu) {
            $scope.activeMenu = menu;
        };

        $scope.isNavBar = function() {
            if ($rootScope.currentState == 'march.login') {
                return false;
            } else {
                return true;
            }
        };

        // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        //     console.log('Log: Changing State');
        //     $rootScope.isStateChanging = true;
        //     Session.set('loadingOn', true)
        // });
        //
        // $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        //     console.log('Log: State Changed');
        //     $rootScope.isStateChanging = false;
        //     console.log('Log: Current State: ' + toState.name + 'xxxxxxxxxxxx' + fromState.name);
        //     $rootScope.currentState = toState.name;
        //     $scope.activeMenu = toState.name;
        // });

        this.helpers({
            // loading() {
            //     return Session.get('loadingOn')
            // }
        });

        $scope.commonReady = function() {
            $(".button-collapse").off("click").sideNav({
                menuWidth: 240, // Default is 240
                edge: 'left', // Choose the horizontal origin
                closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                draggable: true
            });
        };

        $timeout(function() {
            $scope.commonReady();
        }, 200);
    }

    goToState(state) {
        $state = this.state;
        $timeout = this.timeout;
        $scope = this.scope;
        $rootScope = this.rootScope;

        if (state != 'info') {
            $scope.setActive(state);
        }

        if (!(state == $rootScope.currentState)) {
            Session.set('loadingOn', true);
        }

        $timeout(function() {
            $state.go(state);
        }, 300);
    }
}

const name = 'march';

// Module Creation
export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    ngSanitize,
    uiRouter,
    Home,
    Login,
    Analytics
]).component(name, {
    template,
    controllerAs: name,
    controller: March
}).config(config);

function config($locationProvider, $urlRouterProvider, $stateProvider) {
    'ngInject';
    $stateProvider.state('march', {
        abstract: true,
        template: '<march></march>'
    });
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/login');
}
