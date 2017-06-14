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
import {
    Results
} from '../../imports/api/results';
import async from 'async';
import series from 'async/series';

Meteor.methods({
    processTypeTwoData: function() {

        Future = Npm.require('fibers/future');
        var future = new Future();

        async.series([
            function(callback) {

                var guidanceObjectArray = [{
                    total: 0,
                    count: 0
                }, {
                    total: 0,
                    count: 0
                }, {
                    total: 0,
                    count: 0
                }, {
                    total: 0,
                    count: 0
                }, {
                    total: 0,
                    count: 0
                }, {
                    total: 0,
                    count: 0
                }, {
                    total: 0,
                    count: 0
                }, {
                    total: 0,
                    count: 0
                }, {
                    total: 0,
                    count: 0
                }];

                async.series([
                    function(callback) {
                        Masters.find({}, {
                            sort: {
                                residentialValue: 1
                            }
                        }).fetch().forEach(function(master) {
                            if (master.isRedressed == "YES") {
                                if (master.residentialValue <= 1 && master.residentialValue >= 0) {
                                    guidanceObjectArray[0].total += parseInt(master.time);
                                    guidanceObjectArray[0].count++;
                                } else if (master.residentialValue <= 2 && master.residentialValue >= 1) {
                                    guidanceObjectArray[1].total += parseInt(master.time);
                                    guidanceObjectArray[1].count++;
                                } else if (master.residentialValue <= 3 && master.residentialValue >= 2) {
                                    guidanceObjectArray[2].total += parseInt(master.time);
                                    guidanceObjectArray[2].count++;
                                } else if (master.residentialValue <= 4 && master.residentialValue >= 3) {
                                    guidanceObjectArray[3].total += parseInt(master.time);
                                    guidanceObjectArray[3].count++;
                                } else if (master.residentialValue <= 5 && master.residentialValue >= 4) {
                                    guidanceObjectArray[4].total += parseInt(master.time);
                                    guidanceObjectArray[4].count++;
                                } else if (master.residentialValue <= 6 && master.residentialValue >= 5) {
                                    guidanceObjectArray[5].total += parseInt(master.time);
                                    guidanceObjectArray[5].count++;
                                } else if (master.residentialValue <= 7 && master.residentialValue >= 6) {
                                    guidanceObjectArray[6].total += parseInt(master.time);
                                    guidanceObjectArray[6].count++;
                                } else if (master.residentialValue <= 8 && master.residentialValue >= 7) {
                                    guidanceObjectArray[7].total += parseInt(master.time);
                                    guidanceObjectArray[7].count++;
                                } else if (master.residentialValue <= 9 && master.residentialValue >= 8) {
                                    guidanceObjectArray[8].total += parseInt(master.time);
                                    guidanceObjectArray[8].count++;
                                }
                            }
                        });
                        callback(null, 'one');
                    },
                    function(callback) {
                        console.log(guidanceObjectArray);

                        var guidanceArray = []
                        guidanceObjectArray.forEach(function(object) {
                            object.count = object.count == 0 ? 1 : object.count;
                            guidanceArray.push(object.total / object.count);
                        })

                        Results.insert({
                            guidanceArray: guidanceArray
                        });

                        callback(null, 'two');
                    }
                ]);
                callback(null, 'one');
            },
            function(callback) {
                future.return(true);
                callback(null, 'two');
            }
        ]);

        return future.wait();
    }
});
