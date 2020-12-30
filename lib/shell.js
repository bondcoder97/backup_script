const { exec } = require('child_process');
const Logger = require("./logger");

async function make_command(command, success_message){
    if(!command) throw new Error("Wrong params!");
    return new Promise( (resolve, reject)=>{
        exec( command , (error, stdout, stderr) => {
            if (error) {
              reject(error.message);
              return;
            }
          
            if (stderr) {
              reject(stderr);
              return;
            }
            

            resolve(stdout);
          });
    }) //promise end
    .catch( async(err_message)=>{
        await Logger.addMessage(err_message);
    });

}


module.exports.make_command = make_command;
