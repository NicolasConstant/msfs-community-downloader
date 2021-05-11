import { Injectable } from '@angular/core';
import { Package } from './packages.service';
import { SettingsService } from './settings.service';
import { ElectronService } from './electron/electron.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FilesystemService {

    constructor(
        private settingsService: SettingsService,
        private electronService: ElectronService,
        private http: HttpClient
    ) { }

    retrievePackageInfo(p: Package): LocalState {
        const communityPath = this.settingsService.getSettings().communityPath;
        if (!communityPath) return new LocalState(false, null);

        const path = `${communityPath}/${p.folderName}`;
        const folderFound = this.electronService.fs.existsSync(path);

        const versionPath = `${path}/msfs-downloader-updater.json`;
        const versionFound = this.electronService.fs.existsSync(versionPath);

        let version: string = null;
        if (versionFound) {
            version = this.electronService.fs.readFileSync(versionPath, 'utf-8');
        }

        return new LocalState(folderFound, version);
    }

    getTempDir(): string {
        let tempDir = this.electronService.fs.mkdtempSync("msfs-downloader___");
        tempDir = `${this.settingsService.getSettings().communityPath}/${tempDir}`;
        if (this.electronService.fs.existsSync(tempDir)) {
            this.electronService.fs.rmdirSync(tempDir, { recursive: true });
        }
        this.electronService.fs.mkdirSync(tempDir);
        console.warn(tempDir);
        return tempDir;
    }

    downloadFile(assetDownloadUrl: string, tempDir: string) {
        const fullPath = `${tempDir}/asset.zip`;
        // const file = this.electronService.fs.createWriteStream(fullPath);



        this.electronService.ipcRenderer.send('download-item', {url: assetDownloadUrl, properties: { directory: tempDir, filename: 'asset.zip'}});
        this.electronService.ipcRenderer.on('download-success', (event, arg) => {
            console.warn('SUCCESS');
            console.warn(arg);
        });

        // const resquest = this.http.get(assetDownloadUrl, (err, res) => {
        //     res.pipe(file)
        // });

        // fetch(assetDownloadUrl)
        //     .then(res => {
        //         res.arrayBuffer
        //     })

        // this.http.get(assetDownloadUrl, { responseType: 'blob', observe: 'response' })
        //     // .pipe(file)
        //     .subscribe((response) => {
        //         console.log(response); // this returns {size: 508079, type: "application/xlsx"}
        //         // here goes the code for writing content into file

        //         file.pipe(response);
        //         // response.pipe(file)
        //     });

        //         // const reader = new FileReader();
        //         // reader.readAsBinaryString(file);

        //         // reader.onload = (data) => {
        //         //     const csvData = reader.result;
        //         //     console.log(csvData); // here I get contect of file using file reader
        //         // });

        // this.http.get(assetDownloadUrl).toPromise()
        //     .then((res: Response) => {
        //         res.pipe(file)
        //     })

        // throw new Error("Method not implemented.");
    }
}

export class LocalState {
    constructor(
        public folderFound: boolean,
        public version: string) { }
}