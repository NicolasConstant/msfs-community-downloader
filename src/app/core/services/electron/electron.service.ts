import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame } from 'electron';
import * as remote from '@electron/remote';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable({
    providedIn: 'root'
})
export class ElectronService {
    ipcRenderer: typeof ipcRenderer;
    webFrame: typeof webFrame;
    remote: typeof remote;
    childProcess: typeof childProcess;
    fs: typeof fs;

    get isElectron(): boolean {
        return !!(window && window.process && window.process.type);
    }

    constructor() {
        // Conditional imports
        if (this.isElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
            this.webFrame = window.require('electron').webFrame;

            // If you want to use remote object in renderer process, please set enableRemoteModule to true in main.ts
            this.remote = window.require('@electron/remote');

            this.childProcess = window.require('child_process');
            this.fs = window.require('fs');
        }
    }

    openWindSailorWindow() {
        const BrowserWindow = this.remote.BrowserWindow;
        const win = new BrowserWindow({
            height: 500,
            width: 700,
            alwaysOnTop: true,
            maximizable: false,
        });

        win.webContents.setWindowOpenHandler(({ url }) => {
            window.require('electron').shell.openExternal(url);
            return { action: 'deny' };
        });

        win.menuBarVisible = false;
        win.resizable = false;
        win.loadURL('http://127.0.0.1:8080/windsailor.html');
        win.focus();
    }
}
