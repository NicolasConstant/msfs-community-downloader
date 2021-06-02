import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { version } from '../../../package.json';

import { SettingsService } from '../core/services/settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    faTimes = faTimes;
    version = version;

    communityPath: string;
    isCommunity = true;

    constructor(
        private router: Router,
        private settingsService: SettingsService
    ) { }

    ngOnInit(): void {
        this.communityPath = this.settingsService.getSettings().communityPath;
    }

    findCommunityPath(): boolean {
        this.settingsService.findAndSelectCommunityPath()
            .then(res => {
                this.communityPath = res;

                this.isCommunity = this.communityPath.toLowerCase().endsWith('community');
            })
            .catch(err => {
                console.error(err);
            });

        return false;
    }

    resetSettings(): boolean {
        localStorage.clear();
        this.router.navigate(['/']);
        return false;
    }
}
