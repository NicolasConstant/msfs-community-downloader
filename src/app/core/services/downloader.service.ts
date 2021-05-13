import { Injectable } from '@angular/core';
import { ElectronService } from './electron/electron.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DownloaderService {

    public fileDownloaded = new BehaviorSubject<FileDownloadInfo>(null);
    public fileDownloadedUpdated = new BehaviorSubject<string>(null);

    private downloadCache: { [id: string]: FileDownloadInfo; } = {};
    
    constructor(private electronService: ElectronService) { 
        this.electronService.ipcRenderer.on('download-success', (event, arg) => {
            console.warn("on('download-success')");
            console.warn(arg);

            const info = this.downloadCache[arg];
            if(info){
                this.fileDownloaded.next(info);
                delete this.downloadCache[arg];
            }
        });

        this.electronService.ipcRenderer.on("download progress", (event, progress) => {
            console.log(progress);
        });
    }

    download(packageId: string, assetDownloadUrl: string, tempDir: string): void {
        const path = `${tempDir}\\${'asset.zip'}`;
        
        const info = new FileDownloadInfo();
        info.packageId = packageId;
        info.url = assetDownloadUrl;
        info.properties = { directory: tempDir, filename: 'asset.zip'};
        info.filePath = path;
        
        this.downloadCache[path] = info;
        this.electronService.ipcRenderer.send('download-item', info);
    }
}

export class FileDownloadInfo {
    packageId: string;
    url: string;
    properties: any;
    filePath: string;
}