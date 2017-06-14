import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './home.html';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import chartjs from 'angular-chart.js'
import {
    Meteor
} from 'meteor/meteor';
import {
    name as Login
} from '../login/login';

class Home {
    constructor($scope, $reactive, $timeout, $state, $rootScope) {
        'ngInject';
        $reactive(this).attach($scope);

        document.title = "Home | Hackathon";

        $rootScope.currentState = $state.current.name;
        this.scope = $scope;
        this.state = $state;

        Session.set("isDataUploading", false);
        Session.set("isDataProcessing", false);

        this.helpers({
            isDataUploading() {
                return Session.get("isDataUploading");
            },
            isDataProcessing() {
                return Session.get("isDataProcessing");
            }
        });
    }

    uploadData(complaintCSVPath, guidanceCSVPath) {
        $state = this.state;

        Session.set("isDataUploading", true);

        Meteor.call("loadCSVData", complaintCSVPath.trim(), guidanceCSVPath.trim(), function(error, response) {
            if (error) {
                console.log("Data Uploading Failed");
            } else {
                console.log(response);
                console.log("Data Uploading Completed");

                if (response) {
                    Meteor.call("processTypeOneData");
                }

                Session.set("isDataUploading", false);
            }
        });
    }

    processData() {
        $state = this.state;

        Session.set("isDataProcessing", true);

        Meteor.call("createMaster", function(error, response) {
            if (error) {
                console.log("Data Processing Failed");
            } else {
                console.log("Data Processing Completed");

                if (response) {
                    Session.set("isDataProcessing", false);
                }
            }
        })
    }

    processTypeOne() {
        $state = this.state;

        Session.set("isDataProcessing", true);

        Meteor.call("processTypeOneData", function(error, response) {
            if (error) {
                console.log("Data Processing Failed");
            } else {
                console.log("Data Processing Completed");

                if (response) {
                    Session.set("isDataProcessing", false);
                }
            }
        })
    }

    processTypeTwo() {
        $state = this.state;

        Session.set("isDataProcessing", true);

        Meteor.call("processTypeTwoData", function(error, response) {
            if (error) {
                console.log("Data Processing Failed");
            } else {
                console.log("Data Processing Completed");

                if (response) {
                    Session.set("isDataProcessing", false);
                }
            }
        })
    }
}

const name = 'home';

// Module Creation (Aman Gupta)
export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    ngSanitize,
    uiRouter,
    chartjs
]).component(name, {
    template,
    controllerAs: name,
    controller: Home
}).config(config);

// Module Configuration (Aman Gupta)
function config($stateProvider) {
    'ngInject';
    $stateProvider.state('march.home', {
        url: '/home',
        views: {
            'menuContent': {
                template: '<home></home>'
            }
        }
    });
}
