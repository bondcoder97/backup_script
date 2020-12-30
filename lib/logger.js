const fs = require("fs");
const {promisify} = require("util");

const append = promisify(fs.appendFile);

async function addMessage(message, filename="logs.txt"){
  try{
    let date = getMoment();
    let dateMessage = `${date} :::: ${message}\n`;
    // console.log(dateMessage);
     await append(filename, dateMessage, {encoding:"utf8"});
  }
  catch(err){
    console.log(err);
  }
}


function getMoment(){
    let date = new Date();
    let month = prettyTime( date.getMonth() + 1);
    let year = date.getFullYear();
    let day = prettyTime( date.getDate() );
    let hour = prettyTime( date.getHours());
    let minutes = prettyTime( date.getMinutes());

    return `${day}.${month}.${year}, ${hour}:${minutes}`;
}


//transform date
function prettyTime(n){
    if(n<10)
     return "0" + n;
    return n;
   }

module.exports.addMessage = addMessage;
module.exports.getMoment = getMoment;