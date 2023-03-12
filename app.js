/*

          __  __                  _____  _
         |  \/  |                |  __ \| |
         | \  / | ___  __ _  __ _| |  | | |
         | |\/| |/ _ \/ _` |/ _` | |  | | |
         | |  | |  __/ (_| | (_| | |__| | |____
         |_|  |_|\___|\__, |\__,_|_____/|______|
                       __/ |
                      |___/

 */
const { app, BrowserWindow, ipcMain } = require('electron'); // Electron for creating and handling window
const mdl_engine = require("./engine/mdl_engine.js"); // MegaDL engine for handling Mega.nz API
const path = require('path'); // Path for some URL operations

// Engine object for handling Mega API operations
var engine;

// Function for creating Electron window
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800, // Width of window
        height: 600, // Height of window
        resizable: false, // Allow window resize
        titleBarStyle: 'hidden', // Hide bar style to make window look more modern
        webPreferences: {
            preload: path.join(__dirname, 'engine/mdl_preload.js'), // Load our preload.js
            nodeIntegration: true, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false // turn off remote        }
        }
    })

    //win.openDevTools();

    // Load HTML page
    win.loadFile('index.html')
};

// Init function for whole application
function initialize(){
    // Create window
    createWindow();

    // Create engine object
    engine = new mdl_engine();

    // MacOS windows fix
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
}

// Handle when Electron is ready to run
app.whenReady().then(() => {initialize();})

// Kill process if window is closed
app.on('window-all-closed', () => {if (process.platform !== 'darwin') app.quit()})

ipcMain.on("engine", (event, pkg) => {
    /*
        FUNCTION FOR HANDLING ALL REQUESTS FROM RENDERER TO API

        Because some functions need 2 or more arguments (but function takes only one)
        we are using packages. It's just array of different variables packed in one var.
        First we are checking if it's an array to make sure what operations our handler
        needs to expect.
     */
    if(pkg[0].length > 1) { // If it's array (more than one arg)
        switch (pkg[0]) {
            // Add new file/folder to downloads
            case "newDownload":
                // TODO: Start downloading using engine function
                console.log("start downloading file "+pkg[1]);
                break;
        }
    }
    else{ // Simple operations (1 argument only)
        switch(pkg){
            // Close button handler
            case "exitApp":
                // Exit electron and end process
                app.quit();
                break;
        }
    }
});