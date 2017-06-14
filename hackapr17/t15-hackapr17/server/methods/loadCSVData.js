import csvToJson from 'csvtojson';
import {
    Meteor
} from 'meteor/meteor';
import {
    Complaints
} from '../../imports/api/complaints';
import {
    Guidances
} from '../../imports/api/guidances';
import {
    Masters
} from '../../imports/api/masters';
import {
    Areas
} from '../../imports/api/areas';
import {
    Localities
} from '../../imports/api/localities';
import {
    Streets
} from '../../imports/api/streets';
import {
    Zones
} from '../../imports/api/zones';
import {
    Wards
} from '../../imports/api/wards';
import {
    Types
} from '../../imports/api/types';
import async from 'async';
import series from 'async/series';

Meteor.methods({
    loadCSVData: function(complaintCSVPath, guidanceCSVPath) {

        Future = Npm.require('fibers/future');
        var future = new Future();

        // console.log("Removing Old Data...");
        // Areas.remove({});
        // Localities.remove({});
        // Streets.remove({});
        // Zones.remove({});
        // Wards.remove({});
        // Types.remove({});
        // Complaints.remove({});
        // Guidances.remove({});
        // Masters.remove({});
        // console.log("Old Data Removed");

        console.log("Start CSV Loading...");

        const csv = require("csvtojson");

        csv()
            .fromFile(complaintCSVPath)
            .on('json', Meteor.bindEnvironment(function(row, index) {
                console.log("Processing Row Number: " + index);
                Areas.insert({
                    name: row.area
                }, function(error) {

                });

                Zones.insert({
                    name: row.zone
                }, function(error) {

                });

                Localities.insert({
                    name: row.locality
                }, function(error) {

                });

                Streets.insert({
                    name: row.street
                }, function(error) {

                });

                Wards.insert({
                    name: row.ward
                }, function(error) {

                });

                Types.insert({
                    name: row.type
                }, function(error) {

                });

            }))
            .on('done', Meteor.bindEnvironment(function(error) {

                console.log("Complaint CSV File Read: Area, Locality, Street, Zone, Ward, Type");

                csv()
                    .fromFile(complaintCSVPath)
                    .on('json', Meteor.bindEnvironment(function(row, index) {
                        console.log("Processing Row Number: " + index);

                        const area = Areas.findOne({
                            name: row.area
                        });

                        const locality = Localities.findOne({
                            name: row.locality
                        });

                        const street = Streets.findOne({
                            name: row.street
                        });

                        const zone = Zones.findOne({
                            name: row.zone
                        });

                        const ward = Wards.findOne({
                            name: row.ward
                        });

                        const type = Types.findOne({
                            name: row.type
                        });

                        Complaints.insert({
                            number: row.number,
                            typeId: type._id,
                            areaId: area._id,
                            localityId: locality._id,
                            streetId: street._id,
                            zoneId: zone._id,
                            wardId: ward._id,
                            startDate: row.startDate,
                            completionDate: row.completionDate,
                            time: row.time,
                            isRedressed: row.isRedressed,
                            masterId: area._id + "-" + locality._id + "-" + street._id + "-" + zone._id + "-" + ward._id
                        })
                    })).on('done', Meteor.bindEnvironment(function(error) {
                        console.log("Complaint CSV File Read: Complaint");

                        csv()
                            .fromFile(guidanceCSVPath)
                            .on('json', Meteor.bindEnvironment(function(row, index) {
                                console.log("Processing Row Number: " + index);

                                const area = Areas.findOne({
                                    name: row.area
                                });

                                const locality = Localities.findOne({
                                    name: row.locality
                                });

                                const street = Streets.findOne({
                                    name: row.street
                                });

                                const zone = Zones.findOne({
                                    name: row.zone
                                });

                                const ward = Wards.findOne({
                                    name: row.ward
                                });

                                Guidances.insert({
                                    areaId: area == undefined ? "" : area._id,
                                    localityId: locality == undefined ? "" : locality._id,
                                    streetId: street == undefined ? "" : street._id,
                                    zoneId: zone == undefined ? "" : zone._id,
                                    wardId: ward == undefined ? "" : ward._id,
                                    usage: row.usage,
                                    value: row.value,
                                    masterId: area._id + "-" + locality._id + "-" + street._id + "-" + zone._id + "-" + ward._id
                                })
                            })).on('done', Meteor.bindEnvironment(function(error) {

                                console.log("Guidance CSV File Read: Guidance");

                                future.return(true);
                            }));
                    }));
            }));

        return future.wait();
    }
});
