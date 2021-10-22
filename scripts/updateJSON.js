const fs = require('fs');


module.exports = {
    updateJSON:  function(temp, pressure, humidity, visibility, deg) {

        try {
           let data = fs.readFileSync('./json/weatherData.json' , {encoding:'utf8', flag:'r'});
           let Data = JSON.parse(data);
    
           Data.weatherData.temp = temp
           Data.weatherData.pressure = pressure
           Data.weatherData.humidity = humidity/100
           Data.weatherData.visibility = visibility/1000
           Data.weatherData.deg = deg
           Data.output = ""

           try {
               fs.writeFileSync('./json/weatherData.json', JSON.stringify(Data, null, 2) );
               console.log("File successfully written");
           } catch (error) {
               console.log(error, "Error in writing data");
           }

        } catch (error) {
            console.log(error);
        }

    
    },

    weatherSummary :  (foo) => { 
        try {
            let data = fs.readFileSync('.json//weatherData.json' , {encoding:'utf8', flag:'r'});
            try {
                const weatherData = JSON.parse(data);
                foo(weatherData.output);
            } catch (error) {
                console.log("Error parsing JSON", error);
            }
        } catch (error) {
            console.log(error);
        }
       
      
    }
}