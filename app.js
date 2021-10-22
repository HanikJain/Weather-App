require('dotenv').config()
const express = require('express');
const https = require ("https");
const bodyParser = require("body-parser");
const changeIcon = require("./public/js/app.js");
const {updateJSON, weatherSummary} = require("./scripts/updateJSON.js");
const { day_n,  date_n} = require("./scripts/date.js")
const {spawn} = require('child_process');


const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get("/", function (req, res){
    res.render('index', { City: 'City', Day: day_n, Date: date_n, Temp: 'Temperature', Pressure: 'Pressure', Humidity: 'Humidity', Visibility: 'Visibility', Icon: '../images/default_image.png', Summary : ""})
})

app.get("/contact", function (req, res){
    res.sendFile(__dirname + "/contact.html");
})


app.post("/", function(req,res){
    const place = req.body.city;
    const apiKey= process.env.API_KEY;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid="  + apiKey + "&units=" + unit;
   
    try {
        https.get(url,  function(response){
            if(response.statusCode === 200){
            
            response.on("data", function(data){
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp;
                const place = weatherData.name;
                const pressure = weatherData.main.pressure;
                const humidity = weatherData.main.humidity;
                const visibility = weatherData.visibility;
                const deg = weatherData.wind.deg

                
                updateJSON(temp, pressure, humidity, visibility, deg) ;

                const process = spawn('python', ['./model/main.py']);
                // collect data from script
                process.stdout.on('data', function (data) {
                 console.log('Pipe data from python script ...');
                 summary = data.toString();
               
                 icon = (summary.trim()).toLowerCase() ;
                 icon = icon.concat('.svg');
                

                 res.render( 'index',{
                    City : place,
                    Temp : temp,
                    Pressure : "Pressure : " + pressure,
                    Humidity : "Humidity : " + humidity,
                    Visibility : "Visibility : " + visibility,
                    Date : date_n,
                    Day : day_n, 
                    Icon : "../images/icons/" + icon ,
                    Summary :  summary
                    
                    });

                });
               


                // weatherSummary(function foo(x){
                //     console.log(x);
                // })
               
       
                   });
            }
            else{
                res.status(response.statusCode).send(response.message);
            }
        });
        
    } catch (error) {
        res.send(error);
    }
   
    

});

const PORT = process.env.PORT || 3000;

app.listen(PORT , function(){
    console.log("Server is running at port", PORT);
});
