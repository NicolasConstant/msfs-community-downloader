import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsService } from '../services/settings.service';

@Injectable({
    providedIn: 'root'
})
export class CommunityfolderGuard implements CanActivate {
    constructor(
        private router: Router,
        private settingsService: SettingsService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        console.log('can activate');
        const communityFolder = this.settingsService.getSettings().communityPath;
        console.log(communityFolder);
        if (!communityFolder || !communityFolder.toLowerCase().endsWith('community')) {
            this.router.navigateByUrl('/settings');
        }
        return true;
    }

}
