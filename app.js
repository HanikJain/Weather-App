require('dotenv').config()
const express = require('express');
const https = require ("https");
const bodyParser = require("body-parser");;
const {updateJSON} = require("./scripts/updateJSON.js");
const { day_n,  date_n} = require("./scripts/date.js")



const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.use(express.static("public"));

let wd = [{src: '../images/wind-svg.svg', name : 'Pressure'}, {src: '../images/humidity-svg.svg', name : 'Humidity'}, {src: '../images/visibility-svg.svg', name : 'Visibility'}, {src: '../images/wind-deg-svg.svg', name : 'Degree'}]

let border = "border:0px "

app.get("/", function (req, res){
    res.render('index', { border: border, City: 'City', Day: day_n, Date: date_n, Temp: 'Temp', wd:wd, summary: ''})
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
                const deg = weatherData.wind.deg;
                const summary = weatherData.weather[0].main;

                
                updateJSON(temp, pressure, humidity, visibility, deg) ;
    

                wd[0].name = pressure;
                wd[1].name = humidity;
                wd[2].name = visibility;
                wd[3].name = deg;


                res.render('index', {
                     border:border,
                     City: place, 
                     Day: day_n, 
                     Date: date_n, 
                     Temp:  temp, 
                     wd:wd, 
                     summary: summary
                    });
            });
               
            }
            else{
                // res.status(response.statusCode).send(response.message);
                border = "border: 3px solid red; "
                res.render('index', { border: border, City: 'City', Day: day_n, Date: date_n, Temp: 'Temp', wd:wd, summary: ''})
            }
        });
        
    } catch (error) {
        res.send(error);
    }
   
    

});


app.get("/contact", function (req, res){
    res.sendFile(__dirname + "/public/contact.html");
})


const PORT = process.env.PORT || 3000;

app.listen(PORT , function(){
    console.log("Server is running at port", PORT);
});
