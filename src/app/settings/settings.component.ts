import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../core/services/settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

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

            });
        
        return false;
    }

}
