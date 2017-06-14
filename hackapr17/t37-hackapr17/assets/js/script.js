$(document).ready(function() {
    $('select').material_select();
});

var data;

$.getJSON("assets/json/problems.json", function(json) {
    popProblems(json);
});

$.getJSON("assets/json/zones.json", function(json) {
    popZones(json);
});

$.getJSON("assets/json/zones.json", function(json) {
    data = json;
});

function popProblems(json) {
    for(var x in json) {
        $('#problems').append("<option value=" + json[x]["no"] + ">" + json[x]["complaint"] + "</option>");
    }
    $('select').material_select();
}

function popZones(json) {
    for(var x in json) {
        $('#wardzones').append("<optgroup label=" + json[x]["ZoneName"] + ">");
        for(var y in json[x]["wards"]) {
            $('#wardzones').append("<option value=" + json[x]["wards"][y] + ">" + json[x]["wards"][y] + "</option>");
        }
        $('#wardzones').append("</optgroup>");
    }
    $('select').material_select();
}

