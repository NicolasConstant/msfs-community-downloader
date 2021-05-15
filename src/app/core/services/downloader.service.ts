import { Injectable } from '@angular/core';
import { ElectronService } from './electron/electron.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DownloaderService {

    public fileDownloaded = new BehaviorSubject<FileDownloadInfo>(null);
    public fileDownloadedUpdated = new Subject<FileDownloadUpdate>();

    private downloadCache: { [id: string]: FileDownloadInfo; } = {};
    
    constructor(private electronService: ElectronService) { 
        this.electronService.ipcRenderer.on('download-success', (event, arg) => {
            const info = this.downloadCache[arg];
            if(info){
                this.fileDownloaded.next(info);
                delete this.downloadCache[arg];
            }
        });

        this.electronService.ipcRenderer.on("download-progress", (event, progress) => {
            const update = new FileDownloadUpdate();
            update.packageId = progress.packageId;
            update.downloadedData = Math.round(progress.status.transferredBytes / (1024*1024));

            this.fileDownloadedUpdated.next(update);
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

export class FileDownloadUpdate {
    packageId: string;
    downloadedData: number;
}