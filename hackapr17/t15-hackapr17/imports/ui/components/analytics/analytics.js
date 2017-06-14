import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import chartjs from 'angular-chart.js';
import template from './analytics.html';
import {
    Meteor
} from 'meteor/meteor';
import {
    name as CaseOne
} from './caseOne/caseOne';
import {
    name as CaseTwo
} from './caseTwo/caseTwo';
import {
    name as CaseThree
} from './caseThree/caseThree';
import {
    Areas
} from '../../../api/areas';
import {
    Localities
} from '../../../api/localities';
import {
    Streets
} from '../../../api/streets';
import {
    Zones
} from '../../../api/zones';
import {
    Wards
} from '../../../api/wards';
import {
    Types
} from '../../../api/types';

class Analytics {
    constructor($scope, $rootScope, $reactive, $timeout, $q) {
        'ngInject';
        $reactive(this).attach($scope);

        this.timeout = $timeout;
        this.rootScope = $rootScope;
        this.q = $q;
        this.scope = $scope;

        $rootScope.selectedLocation = {
            "area": "",
            "locality": "",
            "street": "",
            "zone": "",
            "ward": ""
        }

        // Session.set('loadingOn', true)

        window.scrollTo(0, 0);

        document.title = "Analytics | Hackathon";

        $scope.areas = []
        $scope.localities = [];
        $scope.streets = [];
        $scope.zones = [];
        $scope.wards = [];

        this.helpers({
            areas() {
                $scope.areas = Areas.find().fetch()
                return $scope.areas
            },
            localities() {
                $scope.localities = Localities.find().fetch()
                return $scope.localities
            },
            streets() {
                $scope.streets = Streets.find().fetch()
                return $scope.streets
            },
            zones() {
                $scope.zones = Zones.find().fetch()
                return $scope.zones
            },
            wards() {
                $scope.wards = Wards.find().fetch()
                return $scope.wards
            }

        });

        $scope.setValue = function(object) {
            Session.set("selectedValue", object)
        }

        $scope.tabsReady = function() {
            $timeout(function() {
                $('ul.tabs').tabs();
            });
        };
    }
}

const name = 'analytics';

// Module Creation
export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    ngSanitize,
    uiRouter,
    chartjs,
    CaseOne,
    CaseTwo,
    CaseThree
]).component(name, {
    template,
    controllerAs: name,
    controller: Analytics
}).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider.state('march.analytics', {
        url: '/analytics',
        views: {
            'menuContent': {
                template: '<analytics></analytics>'
            }
        }
    });
}
