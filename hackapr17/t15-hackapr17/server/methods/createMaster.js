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

Meteor.methods({
    createMaster: function() {

        console.log("Creating Master...");

        Future = Npm.require('fibers/future');
        var future = new Future();

        Complaints.aggregate([{
            $lookup: {
                from: "guidances",
                localField: "masterId",
                foreignField: "masterId",
                as: "masterColumn"
            }
        }]).forEach(function(object, index, array) {
            console.log("Processing Row Number: " + index);

            if (object.masterColumn.length == 2) {
                Masters.insert({
                    "_id": object._id,
                    "number": object.number,
                    "typeId": object.typeId,
                    "areaId": object.areaId,
                    "localityId": object.localityId,
                    "streetId": object.streetId,
                    "zoneId": object.zoneId,
                    "wardId": object.wardId,
                    "startDate": object.startDate,
                    "completionDate": object.completionDate,
                    "time": object.time,
                    "isRedressed": object.isRedressed,
                    "masterId": object.masterId,
                    'residentialValue': object.masterColumn[0].value,
                    'nonResidentialValue': object.masterColumn[1].value
                })
            }

            if (index == array.length - 1) {
                console.log("Index Limit Reached");
                future.return(true);
            }
        });

        return future.wait();
    }
});
