import { Component, OnInit, Input } from '@angular/core';
import { Package } from '../../core/services/packages.service';
import { UpdaterService } from '../../core/services/updater.service';

@Component({
    selector: 'app-package-detailed',
    templateUrl: './package-detailed.component.html',
    styleUrls: ['./package-detailed.component.scss']
})
export class PackageDetailedComponent implements OnInit {
    @Input() package: Package;

    constructor(
        private updaterService: UpdaterService
    ) { }

    ngOnInit(): void {
    }

    install():boolean {
        this.updaterService.install(this.package);
        return false;
    }

    remove():boolean {
        this.updaterService.remove(this.package);
        return false;
    }

    update():boolean {
        this.updaterService.update(this.package);
        return false;
    }
}
