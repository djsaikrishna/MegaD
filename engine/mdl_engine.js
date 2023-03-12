const { File, Storage } = require('megajs'); // Mega.nz API wrapper
const fs = require('fs'); // File input/output library
var method = mdl_engine.prototype;

// Engine class constructor
function mdl_engine(){

}

method.mdl_downloadFile = function(path){
    ;(async function () {
        const folder = File.fromURL(path);
        await folder.loadAttributes();
        const file = folder.children.find(file => file.name === 'snapwins.net-Mary Perry-(03).mov');
        //const file = folder.children.at(1).find(file => file.name === 'By-@prmhub [Telegram]_1.jpeg');//.find(file => file.name === 'By-@prmhub [Telegram]_1.jpeg')
        //console.log(file);
        const data = await file.downloadBuffer()

        fs.writeFileSync('testa.mov', data);

    }()).catch(error => {
        console.error(error)
        process.exit(1)
    })
}

method.mdl_downloadFolder = function(){

}

method.mdl_download = function(path){
    /*
        This function checks provided link and recognizes if it's folder or single file.
        Then it runs proper function.
     */

}

module.exports = mdl_engine;