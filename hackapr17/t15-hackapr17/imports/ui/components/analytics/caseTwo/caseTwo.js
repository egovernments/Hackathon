import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import chartjs from 'angular-chart.js';
import template from './caseTwo.html';
import {
    Meteor
} from 'meteor/meteor';
import {
    Results
} from '../../../../api/results';

class CaseTwo {
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
        });

        this.helpers({
            chartData() {
                const result = Results.find({}, {
                    limit: 1
                }).fetch();

                if (result[0]) {
                    console.log(result);
                    return result[0].guidanceArray;
                }
            }
        });
    }
}

const name = 'caseTwo';

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
    controller: CaseTwo
}).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider.state('march.caseTwo', {
        url: '/analytics/caseTwo',
        views: {
            'menuContent': {
                template: '<case-two></case-two>'
            }
        }
    });
}
