const http = require("http");
const fs = require("fs");
const os = require("os");
const ip = require('ip');

const SECONDS_IN_DAY = 60*60*24;
const SECONDS_IN_HOUR = 60*60;
const SECONDS_IN_MINUTE = 60;
let uptime = 0;
let days = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;

function calcUptimeDays(){
  let calcUptime = uptime;
  while(calcUptime >= SECONDS_IN_DAY){
   days+=1;
   calcUptime-=SECONDS_IN_DAY;
  }  
}

function calcUptimeHours(){
  let calcUptime = uptime - days*SECONDS_IN_DAY;
  while(calcUptime >= SECONDS_IN_HOUR){
   hours+=1;
   calcUptime-=SECONDS_IN_HOUR;
  }   
}

function calcUptimeMinutes(){
  let calcUptime = uptime - days*SECONDS_IN_DAY - hours*SECONDS_IN_HOUR;
  while(calcUptime >= SECONDS_IN_MINUTE){
   minutes +=1;
   calcUptime-=SECONDS_IN_MINUTE;
  }
}

function calcUptimeSeconds(){
  seconds = uptime - days*SECONDS_IN_DAY - hours*SECONDS_IN_HOUR  - minutes*SECONDS_IN_MINUTE;
}

http.createServer((req, res) => {
  if (req.url === "/") {
      fs.readFile("./public/index.html", "UTF-8", (err, body) => {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(body);
    });
  } else if(req.url.match("/sysinfo")) {
    myHostName=os.hostname();
    uptime=os.uptime();
    // assigning 0 is usefull for when reloading page
    days=0;
    hours=0;
    minutes=0;
    seconds=0;
    calcUptimeDays();
    calcUptimeHours();
    calcUptimeMinutes();
    calcUptimeSeconds();
    html=`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Node JS Response</title>
      </head>
      <body>
        <p>Hostname: ${myHostName}</p>
        <p>IP: ${ip.address()}</p>
        <p>Server Uptime: Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}</p>
        <p>Total Memory: ${(os.totalmem()/1000000).toFixed(2)} MB</p>
        <p>Free Memory: ${(os.freemem()/1000000).toFixed(2)} MB</p>
        <p>Number of CPUs: ${os.cpus().length}</p>
      </body>
    </html>`
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(html);
  } else {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.end(`404 File Not Found at ${req.url}`);
  }
}).listen(3000);

console.log("Server listening on port 3000");