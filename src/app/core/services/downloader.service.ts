import { Injectable } from '@angular/core';
import { ElectronService } from './electron/electron.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DownloaderService {

    public fileDownloaded = new BehaviorSubject<FileDownloadInfo>(null);
    public fileDownloadedUpdated = new BehaviorSubject<string>(null);

    constructor(private electronService: ElectronService) { 
        this.electronService.ipcRenderer.on('download-success', (event, arg) => {
            console.warn('SUCCESS');
            console.warn(arg);
            if(arg){
                this.fileDownloaded.next(arg);
            }
        });

        this.electronService.ipcRenderer.on("download progress", (event, progress) => {
            console.log(progress);        
        });
    }

    download(packageId: string, assetDownloadUrl: string, tempDir: string){
        var info = new FileDownloadInfo();
        info.packageId = packageId;
        info.url = assetDownloadUrl;
        info.properties = { directory: tempDir, filename: 'asset.zip'};

        this.electronService.ipcRenderer.send('download-item', info);
    }
}

export class FileDownloadInfo {
    packageId: string;
    url: string;
    properties: any;
}