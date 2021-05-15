import { app, BrowserWindow, ipcMain, shell } from 'electron'; //screen
import * as path from 'path';
import * as url from 'url';
import { download } from 'electron-dl';
import * as AdmZip from 'adm-zip';
import * as fse from 'fs-extra';

// Initialize remote module
require('@electron/remote/main').initialize();

let win: BrowserWindow = null;
const args = process.argv.slice(1),
    serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

    // const electronScreen = screen;
    // const size = electronScreen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    win = new BrowserWindow({
        x: 0,
        y: 0,
        width: 1000,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: (serve) ? true : false,
            contextIsolation: false,  // false if you want to run 2e2 test with Spectron
            enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
        },
    });
    win.webContents.setWindowOpenHandler(({ url }) => {
        // config.fileProtocol is my custom file protocol
        // if (url.startsWith(config.fileProtocol)) {
        //     return { action: 'allow' };
        // }
        // open url in a browser and prevent default
        shell.openExternal(url);
        return { action: 'deny' };
    });

    if (serve) {

        win.webContents.openDevTools();

        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`)
        });
        win.loadURL('http://localhost:4200');

    } else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    return win;
}

try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
    app.on('ready', () => {
        setTimeout(createWindow, 400);

        ipcMain.on('download-item', (event, info) => {
            (async () => {
                info.properties.onProgress = status => event.sender.send("download-progress", { packageId: info.packageId, status: status});

                const win = BrowserWindow.getFocusedWindow();
                await download(win, info.url, info.properties)
                    .then(dl => event.sender.send('download-success', dl.getSavePath()));
            })();
        });

        ipcMain.on('extract-item', (event, info) => {
            (async () => {
                const pro = new Promise((resolve, reject) => {
                    const zip = new AdmZip(info.filePath);
                    zip.extractAllToAsync(info.extractFolder, true, (err) => {
                        if (err) reject();
                        resolve();
                    });
                });
                await pro;
                event.sender.send('extract-success', info);
            })();
        });

        ipcMain.on('copy-folder', (event, info) => {
            (async () => {
                const pro = new Promise((resolve, reject) => {
                    fse.copy(info.source, info.target, { overwrite: true }, (err) => {
                        if (err) reject(err);
                        resolve();
                    });
                });
                await pro;
                event.sender.send('copy-folder-success', info);
            })();
        });
    });

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });

} catch (e) {
    // Catch Error
    // throw e;
}
