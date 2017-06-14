import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './caseOne.html';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import chartjs from 'angular-chart.js';
import {
    Meteor
} from 'meteor/meteor';
import {
    Types
} from '../../../../api/types';



class CaseOne {
    constructor($scope, $rootScope, $reactive, $timeout, $q) {
        'ngInject';
        $reactive(this).attach($scope);

        this.timeout = $timeout;
        this.rootScope = $rootScope;
        this.q = $q;
        this.scope = $scope;

        this.selectedType = "";

        $timeout(function() {
            $scope.labels = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
            $scope.series = ['Series A'];
            // $scope.data = [
            //     [65, 59, 80, 81, 56, 55, 40, 100, 20]
            // ];
        });

        Session.set("type", "");

        $scope.types = []

        this.helpers({
            getAllComplaintsType() {
                $scope.types = Types.find().fetch()
            },
            chartData() {
                var selectedType = Session.get("type");

                var type = Types.findOne({
                    name: selectedType
                });

                if (type) {
                    return type.guidanceArray;
                }
            }
        });

        $scope.setValue = function(object) {
            Session.set("type", object.name);
            console.log(object._id);
            console.log(object.name);
        }
    }
}

const name = 'caseOne';

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
    controller: CaseOne
}).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider.state('march.caseOne', {
        url: '/analytics/caseOne',
        views: {
            'menuContent': {
                template: '<case-one></case-one>'
            }
        }
    });
}
