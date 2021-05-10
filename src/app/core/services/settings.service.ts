import { Injectable } from '@angular/core';
import { ElectronService } from './electron/electron.service';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    constructor(private electronService: ElectronService) {
    }

    getSettings(): SettingsData {
        return this.getSavedSettings();
    }

    findAndSelectCommunityPath(): Promise<string> {
        return this.electronService.remote.dialog.showOpenDialog({ properties: ['openDirectory'] })
            .then(re => {
                if (!re.canceled && re.filePaths.length > 0) {
                    const settings = this.getSavedSettings();
                    settings.communityPath = re.filePaths[0];
                    this.saveSettings(settings);

                    return settings.communityPath;
                }
                return null;
            });
    }

    private getSavedSettings(): SettingsData {
        const json = localStorage.getItem('settings');
        if (json) {
            return JSON.parse(json);
        } else {
            return new SettingsData();
        }
    }

    private saveSettings(settings: SettingsData) {
        const json = JSON.stringify(settings);
        localStorage.setItem('settings', json);
    }   
}

class SettingsData {
    communityPath: string;
}