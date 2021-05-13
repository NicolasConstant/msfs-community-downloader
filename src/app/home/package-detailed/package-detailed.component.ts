import { Component, OnInit, Input } from '@angular/core';
import { Package } from '../../core/services/packages.service';
import { DomainService } from '../../core/services/domain.service';

@Component({
    selector: 'app-package-detailed',
    templateUrl: './package-detailed.component.html',
    styleUrls: ['./package-detailed.component.scss']
})
export class PackageDetailedComponent implements OnInit {
    @Input() package: Package;

    constructor(
        private domainService: DomainService
    ) { }

    ngOnInit(): void {
    }

    install():boolean {
        this.domainService.install(this.package);
        return false;
    }

    remove():boolean {
        this.domainService.remove(this.package);
        return false;
    }

    update():boolean {
        this.domainService.update(this.package);
        return false;
    }
}
