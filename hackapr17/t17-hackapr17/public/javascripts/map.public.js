
require("/javascripts/easy_button.js");
require("/javascripts/L.Control.Locate.min.js")
require('/javascripts/leaflet.markercluster.js')
require('/javascripts/leaflet.ajax.min.js')



function init(feature){
	feature = feature || undefined;

	var layer = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy;2012 Esri & Stamen, Data from OSM and Natural Earth',
		minZoom: 2,
		maxZoom: 18
	});

	var layer2 =  new L.GeoJSON.AJAX("/data/chennai_wards_geojson.geojson");

	var map = L.map("map", {
		maxZoom: 18
	});

	map.addLayer(layer);
	map.addLayer(layer2);

	map.data = {};
	map.layers = {};
	map.controls={};

	if (feature === undefined){
		var point = [13.0827, 80.2707];

		//init to bangalore
		map.setView(point, 12);


	}
	else{
		//if the map is initialized from a feature search

		var geoj = L.geoJson(feature, {
			style: function (feat) {
				return {color: '#00B7FF'};
			},
			pointToLayer: function(feat, latlng){
				return new L.CircleMarker(latlng, {
					radius: 10,
					fillColor: "#00B7FF",
					color: "#000",
					weight: 1,
					opacity: 1,
					fillOpacity: 0.4
				});
			},
			onEachFeature: function (feat, layer) {
				layer.bindPopup(feat.properties.name);
			}
		});
		geoj.addTo(map);

		map.fitBounds(geoj.getBounds()).setZoom(13);
	}


	return map
}

function onMapClick(e) {
	marker = new L.marker(e.latlng, {draggable:'true'});
	marker.on('dragend', function(event){
		var marker = event.target;
		var position = marker.getLatLng();
		marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
		map.location = marker.getLatLng();
		//alert("hello");
		map.panTo(new L.LatLng(position.lat, position.lng))
	});
	map.addLayer(marker);
};
function require(script) {
	$.ajax({
		url: script,
		dataType: "script",
		async: false,           // <-- This is the key
		success: function () {
			// all good...
		},
		error: function () {
			throw new Error("Could not load script " + script);
		}
	});
}


function locateUser() {
	this.map.locate({setView : true});
}

function reqFromDBinBounds(areaType, cb){
	//var bbox = map.getBounds().toBBoxString();
	$.ajax({
		type: 'GET',
		url: '/data/'+areaType//+'/bounds/'+bbox
	}).done(function(result) {
		cb(result);
	});
}

function reqCrimes(crimeType, cb){
	$.ajax({
		type: 'GET',
		url: '/data/crime/'+crimeType//+'/bounds/'+bbox
	}).done(function(result) {
		cb(result);
	});
}


function addFeatureLayer(layer){
	if (layer.length == 6){
		if(layer != 'Crime1' && map.hasLayer(map.layers['Crime1'])){
			map.removeLayer(map.layers['Crime1'])
		}
		if(layer != 'Crime2' && map.hasLayer(map.layers['Crime2'])){
			map.removeLayer(map.layers['Crime2'])
		}
		if(layer != 'Crime3' && map.hasLayer(map.layers['Crime3'])){
			map.removeLayer(map.layers['Crime3'])
		}
		if(layer != 'Crime4' && map.hasLayer(map.layers['Crime4'])){
			map.removeLayer(map.layers['Crime4'])
		}
		if(layer != 'Crime5' && map.hasLayer(map.layers['Crime5'])){
			map.removeLayer(map.layers['Crime5'])
		}
		if(layer != 'Crime6' && map.hasLayer(map.layers['Crime6'])){
			map.removeLayer(map.layers['Crime6'])
		}
	}
	if (Object.keys(map.layers).indexOf((layer)) == -1){
		layerButton(layer);
	}
	else{
		map.addLayer(map.layers[layer])
	}
}

function removeFeatureLayer(layer){

	if (Object.keys(map.layers).indexOf((layer)) != -1){
		map.removeLayer(map.layers[layer])
	}

}
function crimeLoad(buttonName, callback) {
	reqCrimes(buttonName, function (feature) {
		map.layers[buttonName] = new L.markerClusterGroup({
			disableClusteringAtZoom: 14,
			spiderfyOnMaxZoom: true,
			showCoverageOnHover: false,
			zoomToBoundsOnClick: true,
			iconCreateFunction: function (cluster) {
				return new L.DivIcon({
					html: '<div class="uk-badge uk-badge-notification" style="position:absolute; background-color: darkmagenta">' + cluster.getChildCount() + '</div>',
					className: 'crimeIcon'
				});
			}
		});

		feature.features = feature.features.map(function (x) {
			var y = x;
			y.geometry = JSON.parse(y.geometry);
			return y
		});

		map.data[buttonName] = feature;

		L.geoJson(feature, {
			style: function (feat) {
				return {
					color: '#303030',
					weight: 1
				}
			},
			pointToLayer: function (feat, latlng) {
				//return new L.marker(latlng, {icon: L.divIcon({className: 'aptIcon'}) } );
				if (buttonName.length == 6) {
					return new L.marker(latlng, {icon: crimeIcon});
				}

			},

			onEachFeature: function (feat, layer) {
				layer.properties = feat.properties || layer.properties;
			}
		}).addTo(map.layers[buttonName]);
		callback(map.layers[buttonName]);

	});
}
function layerLoad(buttonName, callback){
	reqFromDBinBounds(buttonName, function(feature) {

		if (buttonName.length == 4){
			//checks if name length is shorter, eg sro/ward/dro
			map.layers[buttonName] = new L.featureGroup();
		}else{
			map.layers[buttonName] = new L.markerClusterGroup({ disableClusteringAtZoom: 14, spiderfyOnMaxZoom: true, showCoverageOnHover: false, zoomToBoundsOnClick: true, iconCreateFunction: function(cluster) { return new L.DivIcon({ html: '<div class="uk-badge uk-badge-notification" style="position:absolute; background-color: darkpurple">' + cluster.getChildCount() + '</div>', className: 'aptIcon'}); } });
		}

		//amenities: add custom icon for amenities, add popup with name
		feature.features = feature.features.map(function(x){var y = x; y.geometry = JSON.parse(y.geometry); return y });

		map.data[buttonName] = feature;

		L.geoJson(feature, {
			style: function (feat) {
				return {
					color: '#303030',
					weight: 1
				}
			},
			pointToLayer: function(feat, latlng){
				//return new L.marker(latlng, {icon: L.divIcon({className: 'aptIcon'}) } );
				if(buttonName.length == 6){
					return new L.marker(latlng, {icon: crimeIcon});
				}

			},

			onEachFeature: function (feat, layer) {

				layer.properties = feat.properties || layer.properties;

				if (buttonName.length == 4 ){
					//only add these listeners for polygon layers
					if (buttonName.length == 4){
						layer.on({
							mouseover: highlightFeature,
							mouseout: resetHighlight,
						});
					}

					//bind vals
					layer.bindPopup(createPopup(feat.properties.name,true),customOptions);
					//layer.bindPopup(layer.properties.name);

				}
			}
		}).addTo(map.layers[buttonName]);

		choroplethAll({
			c1: 'c1',
			c2: 'c2',
			c3: 'c3',
			c4: 'c4',
			c5: 'c5',
			c6: 'c6',
			c1f: 'c1f',
			c2f: 'c2f',
			c3f: 'c3f',
			c4f: 'c4f',
			c5f: 'c5f',
			c6f: 'c6f',

		}[$(':checked.check_box').attr('id')]);


		callback(map.layers[buttonName]);
	} );



}

function layerButton(buttonName){
	if(buttonName.length == 4) {
		layerLoad(buttonName, function (layer) {
			layer.addTo(map);
			map.fitBounds(layer.getBounds());
		});
	}
	else
	{
		crimeLoad(buttonName, function (layer) {
			layer.addTo(map);
			map.fitBounds(layer.getBounds());

		});
	}

}



function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		fillOpacity: 1
	});
}

function resetHighlight(e) {
	var layer = e.target;

	layer.setStyle({
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}


}

function resetHighlightNull(e) {
	var layer = e.target;

	layer.setStyle({
		fillOpacity: 0.2
	});

	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}
}

function maxMin(array, value) {
	var max = Math.max.apply(Math, array.features.map(function (o) {
		return o.properties[value];
	}));
	var min = Math.min.apply(Math, array.features.map(function (o) {
		return o.properties[value];
	}));

	return {min: min, max: max};


}

function choroplethAll(value){
	//use choropleth for all polygon layers if one is selected
	//pass empty value parameter to reset

	Object.keys(map.data).forEach(
		function(a){
			if (a.length < 5){
				choropleth(a, value);
			}
		}
	)
}

function choropleth(area,value){
	(map.scale) ? map.scale = map.scale : map.scale = new chroma.scale(['white', '#9900cc']);
	//pass empty 'value' parameter to reset
	value = value || undefined;

	var m = maxMin(map.data[area], value);

	if (!map.legend){
		if (value) map.legend = new L.control({position: 'bottomleft'})
	}
	else{
		if (value){
			if (map.legend){
				//old div and Lcontrol object removed by removeControl
				map.removeControl(map.legend);
				map.legend = new L.control({position: 'bottomleft'})
			}
			else{
				map.legend = new L.control({position: 'bottomleft'})
			}
		}
		else{
			map.removeControl(map.legend);
		}
	}

	map.layers[area].eachLayer(function(d){

		if (value !== undefined){

			d.eachLayer(function(f){

				if (f.properties[value] != null){
					f.setStyle({fillColor: map.scale( (1-0)*(f.properties[value] - m.min)/(m.max-m.min) ),
						fillOpacity:0.6});
					f.on({
						mouseover: highlightFeature,
						mouseout: resetHighlight,
					});
				}

				else{
					f.setStyle({ fillColor: 'grey', fillOpacity:0.2});
					f.on({
						mouseover: highlightFeature,
						mouseout: resetHighlightNull
					});
				}

			});

			//add new map legend
			if (map.legend !== undefined){

				map.legend.onAdd = function (map) {

					var div = L.DomUtil.create('div', 'info legend choro'),
						grades = [0.1, 0.3, 0.5, 0.7, 0.9],
						labels = {
							0.1: m.min,
							0.3: m.max*0.3,
							0.5: m.max *0.5,
							0.7: m.max*0.7,
							0.9: m.max*0.9};

					// loop through & generate a label with a colored square for each interval
					for (var i = 0; i < grades.length; i++) {
						div.innerHTML +=
							'<i style="background:' + map.scale(grades[i]) + '"></i> ' +
							Math.ceil(labels[grades[i]]/1)*1 + (Math.ceil(labels[grades[i + 1]]/1)*1 ? '&ndash;' + Math.ceil(labels[grades[i + 1]]/1)*1 + '<br>' : '+');
					}

					return div;
				};

				map.legend.onRemove = function(map){
					map.legend = undefined;
				};

				map.legend.addTo(map);

			}


		}else{
			d.eachLayer(function(f){

				f.setStyle({
					fillColor: 'gray',
					fillOpacity:0.2
				});
				f.on({
					mouseover: highlightFeature,
					mouseout: resetHighlightNull
				});
			});
		}

	});


}

var crimeIcon = L.icon({
	iconUrl: '/images/POINT_2.png',
	iconSize: [60,60], // size of the icon
	popupAnchor: [0,-15]
});

// create popup contents
var createPopup = function(name, disablePopOut){
	var args = Array.prototype.slice.call(arguments);
	var customPopup = [
		'<p style="color:purple"> '+name+' </p>',
	];

	if (disablePopOut){
		customPopup[4] = '';
		customPopup[5] = '';
		customPopup[6] = '';
	}

	return customPopup.join('');
};

// specify popup options
var customOptions =
{
	'maxWidth': '500',
	'className' : 'custom'
};

function filter(crimeName) {

	if (map.layers[crimeName]){
		var valuePeriod = $( "#timeperiod" ).val();
		var valueDay = $( "#timeofday" ).val();
		var filtered = new L.LayerGroup([map.layers[crimeName]]);

		var timeper = function (value) {
			return ({
				"Today": 1,
				"Last Week": 7,
				"Last Month": 30,
				"Last Year": 365,
				"All Time": 36500000000000000
			}[value]);
		}
		var timeofday = function (value) {
			return ({
				"Morning" : 1,
				"Afternoon" : 2,
				"Night" : 3,
				"Evening" : 4,
				"All Day" : 5
			}[value]);
		};
		var current_date = new Date($.now());
		filtered = {type: "FeatureCollection", features: []};
		var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		map.data[crimeName].features.forEach(function(a){
			var f_date = a.properties["time_of_crime"];
			var str = f_date.split("T");
			var fdate = str[0];
			var ftime =  str[1].substring(0, str[1].length - 1);
			var tempdate = fdate + "T" + ftime;
			var feature_date = new Date(tempdate);
			var diffDays = Math.round(Math.abs((current_date.getTime() - feature_date.getTime())/(oneDay)));
			if (diffDays < timeper(valuePeriod)) {
				if (timeofday(valueDay) == 1) {
					if (feature_date.getHours() > 7 && feature_date.getHours() < 12)
						filtered.features.push(a);

				}
				else if (timeofday(valueDay) == 2) {
					if (feature_date.getHours() > 12 && feature_date.getHours() < 16)
						filtered.features.push(a);

				}
				else if (timeofday(valueDay) == 3) {
					if (feature_date.getHours() > 21 || feature_date.getHours() < 7)
						filtered.features.push(a);

				}
				else if (timeofday(valueDay) == 4) {
					if (feature_date.getHours()  > 18 && feature_date.getHours() < 21)
						filtered.features.push(a);

				}
				else
				{
					filtered.features.push(a);
				}

			}
		});
		map.layers[crimeName].clearLayers();

		L.geoJson(filtered, {
			style: function (feat) {
				return {
					color: '#303030',
					weight: 1
				}
			},
			pointToLayer: function (feat, latlng) {
				//return new L.marker(latlng, {icon: L.divIcon({className: 'aptIcon'}) } );
				return new L.marker(latlng, {icon: crimeIcon});
			},
			onEachFeature: function (feat, layer) {
				layer.properties = feat.properties || layer.properties;

			}
		}).addTo(map.layers[crimeName]);
	}

}



