const {make_command} = require("./lib/shell");
const {addMessage, getMoment} = require("./lib/logger");
const fs = require("fs").promises;

//backup config constants
const BACKUP_DATABASES = [];
const BACKUP_FOLDER = "backups_data";

async function make_backup(){
    if(! (await is_folder_exists(BACKUP_FOLDER))  ) await fs.mkdir(BACKUP_FOLDER);
    for(let i=0; i < BACKUP_DATABASES.length; i++){
        const current_db_backup_folder = `${BACKUP_FOLDER}/${BACKUP_DATABASES[i]}`;
        if( ! (await is_folder_exists(current_db_backup_folder)) ) await fs.mkdir(current_db_backup_folder);
        const now_backup_folder = `${current_db_backup_folder}/${getMoment()}` // folder name with current date and time
        await make_command(`mongodump -d ${BACKUP_DATABASES[i]} -o "${now_backup_folder}"`);
    }
    await addMessage(`Data was backupped for follow databases: ${BACKUP_DATABASES}` );
}


async function is_folder_exists(folder_name){
    try{
        return await fs.stat(folder_name);
    }
    catch(err){
        
    }
}


if(require.main === module){
    make_backup();        
}
    

module.exports.make_backup = make_backup;