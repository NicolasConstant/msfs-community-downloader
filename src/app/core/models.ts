export class FilePackageInfo {
    packageId: string;
}

export class FileExtractedInfo extends FilePackageInfo {
    filePath: string;
    extractFolder: string;
}

export class FileDownloadInfo extends FilePackageInfo {
    url: string;
    properties: any;
    filePath: string;
}

export class FileDownloadUpdate extends FilePackageInfo  {
    downloadedData: number;
}