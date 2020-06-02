//Width and height of map
var width = 960;
var height = 500;

var lowColor = '#f9f9f9'
var highColor = '#bc2a66'

// D3 Projection
var projection = d3.geoAlbersUsa()
  .translate([width / 2, height / 2]) // translate to center of screen
  .scale([1000]); // scale things down so see entire US

// Define path generator
var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
  .projection(projection); // tell path generator to use albersUsa projection

//Create SVG element and append map to the SVG
var svg = d3.select("map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Load in my states data!
d3.csv("Choro_colors.csv", function(data) {
	var dataArray = [];
	for (var d = 0; d < data.length; d++) {
		dataArray.push(parseFloat(data[d].value))
	}
	var minVal = d3.min(dataArray)
	var maxVal = d3.max(dataArray)
	var ramp = d3.scaleLinear().domain([minVal,maxVal]).range([lowColor,highColor])
	
  // Load GeoJSON data and merge with states data
  d3.json("us-states.json", function(json) {

    // Loop through each state data value in the .csv file
    for (var i = 0; i < data.length; i++) {

      // Grab State Name
      var dataState = data[i].state;

      // Grab data value 
      var dataValue = data[i].value;

      // Find the corresponding state inside the GeoJSON
      for (var j = 0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.name;

        if (dataState == jsonState) {

          // Copy the data value into the JSON
          json.features[j].properties.value = dataValue;

          // Stop looking through the JSON
          break;
        }
      }
    }

    // Bind the data to the SVG and create one path per GeoJSON feature
    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", "#fff")
      .style("stroke-width", "1")
    //   .style("fill", function(d) { return ramp(d.properties.value) });
    
      .style("fill", function(d) {
            // console.log(d);
            for (var i=0; i<data.length; i++)
            {
                if (data[i].State==d.properties.name)
                return data[i][2017];
            }
        console.log(data);
  });
		// add a legend
		var w = 140, h = 300;

		var key = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h)
			.attr("class", "legend");

  });
});
