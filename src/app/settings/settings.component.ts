import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { SettingsService } from '../core/services/settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    faTimes = faTimes;

    communityPath: string;

    constructor(private settingsService: SettingsService) { }

    ngOnInit(): void { 
        this.communityPath = this.settingsService.getSettings().communityPath;
    }

    findCommunityPath(): boolean {
        this.settingsService.findAndSelectCommunityPath()
            .then(res => {
                this.communityPath = res;
            })
            .catch(err => {
                console.error(err);
            });
        
        return false;
    }

}
