import { Component, AfterViewInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    constructor(
        private electronService: ElectronService,
        private translate: TranslateService
    ) {
        this.translate.setDefaultLang('en');
        console.log('AppConfig', AppConfig);

        if (electronService.isElectron) {
            console.log(process.env);
            console.log('Run in electron');
            console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
            console.log('NodeJS childProcess', this.electronService.childProcess);
        } else {
            console.log('Run in browser');
        }
    }
    ngAfterViewInit(): void {
        // if (this.electronService.isElectron) {
        //     console.warn(this.electronService.remote);

        //     const win = this.electronService.remote.getCurrentWindow();
        //     // Make minimise/maximise/restore/close buttons work when they are clicked
        //     document.getElementById('min-button').addEventListener("click", event => {
        //         win.minimize();
        //     });

        //     // document.getElementById('max-button').addEventListener("click", event => {
        //     //     win.maximize();
        //     // });

        //     // document.getElementById('restore-button').addEventListener("click", event => {
        //     //     win.unmaximize();
        //     // });

        //     // document.getElementById('close-button').addEventListener("click", event => {
        //     //     win.close();
        //     // });

        //     // // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
        //     // this.toggleMaxRestoreButtons(win);
        //     // win.on('maximize', () => this.toggleMaxRestoreButtons(win));
        //     // win.on('unmaximize', () => this.toggleMaxRestoreButtons(win));           
        // } 
    }

    minimize(): boolean {
        const win = this.electronService.remote.getCurrentWindow();
        win.minimize();
        return false;
    }

    close(): boolean {
        const win = this.electronService.remote.getCurrentWindow();
        win.close();
        return false;
    }

    // toggleMaxRestoreButtons(win: any) {        
    //     if (win.isMaximized()) {
    //         document.body.classList.add('maximized');
    //     } else {
    //         document.body.classList.remove('maximized');
    //     }
    // }
}
