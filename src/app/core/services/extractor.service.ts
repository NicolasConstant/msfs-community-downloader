import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ElectronService } from './electron/electron.service';

@Injectable({
    providedIn: 'root'
})
export class ExtractorService {
    public fileExtracted = new BehaviorSubject<FileExtractedInfo>(null);
    
    constructor(
        private electronService: ElectronService
    ) { }

    extract(packageId: string, filePath: string){
        console.warn('Launch Extract');
        console.warn(packageId);
        console.warn(filePath);

        var info = new FileExtractedInfo();
        info.packageId = packageId;
        info.filePath = filePath;
        info.extractFolder = `${filePath.replace('\\asset.zip', '')}\\extracted`;

        console.warn(info);

        this.electronService.ipcRenderer.send('extract-item', info);
    }
}

export class FileExtractedInfo {
    packageId: string;
    filePath: string;
    extractFolder: string;
}