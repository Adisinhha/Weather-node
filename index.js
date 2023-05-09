
    const http = require('http');
    const fs = require('fs');
    var requests = require("requests");
    let PORT = 8000;


    const homeFile = fs.readFileSync('index.html' , 'utf-8');
 const replaceval  =  (tempVal , orgVal)=>{
  let temprature = tempVal.replace("{%tempval%}", orgVal.current.temp_c);
     temprature = temprature.replace("{%tempmax%}", orgVal.location.lat);
     temprature = temprature.replace("{%tempmin%}", orgVal.location.lon);
     temprature = temprature.replace("{%location%}", orgVal.location.name);
     temprature = temprature.replace("{%country%}", orgVal.location.country);
     temprature = temprature.replace("{%windspeed%}", orgVal.current.wind_kph);
     temprature = temprature.replace("{%tempstauts%}", orgVal.current.condition.text);
    
return temprature ;
 };
    const server =  http.createServer((req, res)=>{
        if (req.url =="/") {
           requests("http://api.weatherapi.com/v1/current.json?key=48bb1035da59431ebf581306233004&q=Chas&aqi=yes")
            // requests("https://api.openweathermap.org/data/2.5/weather?q=Chas&appid=22abd7e697961bdddc397d0e16d02c5e")
            .on('data',(chunk)=>{
                const objdata = JSON.parse(chunk);
                const arrdata = [objdata]
                const realtimedata = arrdata.map((val)=> replaceval (homeFile, val)).join("");
                 res.write(realtimedata);
                //  console.log(realtimedata)
                    
                
                // console.log(chunk)
                // console.log(objdata)
                // console.log(arrdata)
            })
            .on('end',(err)=>{
                if(err)return console.log('Connection Closed Due To Errors');
                res.end();
            });
          
        }

    });
    server.listen(8081, "127.0.0.1")
    console.log(`server listening at port no ${PORT}`)
      
   