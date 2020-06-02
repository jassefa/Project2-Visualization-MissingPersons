// console.log("here")

// d3.json("http://127.0.0.1:5000/api_output").then(function(genderData) {
// console.log(genderData)

// });

function buildPlot() {

  d3.csv("/static/Resources/missingGender.csv").then(function(genderData) {

    var missing_year = []

    var missing_total =[]

    var missing_male =[]

    var missing_female =[]

    // Print the genderData
    console.log(genderData);

    // Cast the hours value to a number for each piece of tvData
    genderData.forEach(function(data) {
      //  missing_year = data.Year ;
      missing_year.push(data.Year)
      console.log(missing_year);

      missing_total.push(data.Total)
      console.log(missing_total);

      missing_male.push(data.Males)
      console.log(missing_male);

      missing_female.push(data.Females)
      console.log(missing_female);
      
    });
  
    var trace1 = {
        type: "scatter",
        mode: "lines",
        name:"Total Missing",
        x:missing_year,
        y:missing_total
        
      };

    var trace2 = {
        type: "scatter",
        mode: "lines",
        name:"Male Missing",
        x:missing_year,
        y:missing_male
      };

    var trace3 = {
        type: "scatter",
        mode: "lines",
        name:"Female Missing",
        x:missing_year,
        y:missing_female
      };
  
      
    var data = [trace1,trace2,trace3];
  
    var layout = {
        title: `Missing Persons Comparison Total vs Gender`
 
      };

    
  
    Plotly.newPlot("plot", data, layout);
  
  });

}
  
  buildPlot()
