import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './caseThree.html';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import chartjs from 'angular-chart.js';
import {
    Meteor
} from 'meteor/meteor';

class CaseThree {
    constructor($scope, $rootScope, $reactive, $timeout, $q) {
        'ngInject';
        $reactive(this).attach($scope);

        this.timeout = $timeout;
        this.rootScope = $rootScope;
        this.q = $q;
        this.scope = $scope;

        $timeout(function() {
            $scope.labels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            $scope.series = ['Series A'];
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40, 100, 20, 200]
            ];
        });

        this.helpers({});
    }
}

const name = 'caseThree';

// Module Creation
export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    ngSanitize,
    uiRouter,
    chartjs
]).component(name, {
    template,
    controllerAs: name,
    controller: CaseThree
}).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider.state('march.caseThree', {
        url: '/analytics/caseThree',
        views: {
            'menuContent': {
                template: '<case-three></case-three>'
            }
        }
    });
}
