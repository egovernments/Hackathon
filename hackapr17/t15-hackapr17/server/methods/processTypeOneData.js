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
    processTypeOneData: function() {

        Future = Npm.require('fibers/future');
        var future = new Future();

        async.series([
            function(callback) {
                Types.find().forEach(function(type) {
                    var guidanceArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

                    async.series([
                        function(callback) {
                            Masters.find({}, {
                                sort: {
                                    residentialValue: 1
                                }
                            }).fetch().forEach(function(master) {
                                if (master.typeId == type._id) {
                                    if (master.residentialValue <= 1 && master.residentialValue >= 0) {
                                        guidanceArray[0]++;
                                    } else if (master.residentialValue <= 2 && master.residentialValue >= 1) {
                                        guidanceArray[1]++;
                                    } else if (master.residentialValue <= 3 && master.residentialValue >= 2) {
                                        guidanceArray[2]++;
                                    } else if (master.residentialValue <= 4 && master.residentialValue >= 3) {
                                        guidanceArray[3]++;
                                    } else if (master.residentialValue <= 5 && master.residentialValue >= 4) {
                                        guidanceArray[4]++;
                                    } else if (master.residentialValue <= 6 && master.residentialValue >= 5) {
                                        guidanceArray[5]++;
                                    } else if (master.residentialValue <= 7 && master.residentialValue >= 6) {
                                        guidanceArray[6]++;
                                    } else if (master.residentialValue <= 8 && master.residentialValue >= 7) {
                                        guidanceArray[7]++;
                                    } else if (master.residentialValue <= 9 && master.residentialValue >= 8) {
                                        guidanceArray[8]++;
                                    }
                                }
                            });
                            callback(null, 'one');
                        },
                        function(callback) {
                            Types.update({
                                _id: type._id,
                            }, {
                                $set: {
                                    guidanceArray: guidanceArray
                                }
                            });
                            callback(null, 'two');
                        }
                    ]);
                });
                callback(null, 'one');
            },
            function(callback) {
                future.return(true);
            }
        ]);

        return future.wait();
    }
})
