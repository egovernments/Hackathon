import {
    Areas
} from '../../imports/api/areas';
import {
    Zones
} from '../../imports/api/zones';
import {
    Streets
} from '../../imports/api/streets';
import {
    Types
} from '../../imports/api/types';
import {
    Localities
} from '../../imports/api/localities';
import {
    Wards
} from '../../imports/api/wards';

Meteor.startup(function() {
    Areas._ensureIndex({
        name: 1
    }, {
        unique: 1
    });

    Zones._ensureIndex({
        name: 1
    }, {
        unique: 1
    });

    Types._ensureIndex({
        name: 1
    }, {
        unique: 1
    });

    Streets._ensureIndex({
        name: 1
    }, {
        unique: 1
    });

    Localities._ensureIndex({
        name: 1
    }, {
        unique: 1
    });

    Wards._ensureIndex({
        name: 1
    }, {
        unique: 1
    });
});
