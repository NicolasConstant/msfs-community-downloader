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
    ) {
        this.electronService.ipcRenderer.on('extract-success', (event, arg) => {
            // const info = this.downloadCache[arg];
            if (arg) {
                this.fileExtracted.next(arg);
                // delete this.downloadCache[arg];
            }
        });
    }

    extract(packageId: string, filePath: string): void {
        const info = new FileExtractedInfo();
        info.packageId = packageId;
        info.filePath = filePath;
        info.extractFolder = `${filePath.replace('\\asset.zip', '')}\\extracted`;

        this.electronService.ipcRenderer.send('extract-item', info);
    }
}

export class FileExtractedInfo {
    packageId: string;
    filePath: string;
    extractFolder: string;
}