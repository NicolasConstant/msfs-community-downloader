import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-import-package',
    templateUrl: './import-package.component.html',
    styleUrls: ['./import-package.component.scss']
})
export class ImportPackageComponent implements OnInit, OnDestroy {
    faTimes = faTimes;
    
    isJsonImport = false;
    sub: Subscription;

    json: string;

    constructor(
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.sub = this.activatedRoute.params.subscribe(params => {
            const type = params['type'];
            if (!type || type === 'json') {
                this.isJsonImport = true;
            }
        });
    }

    ngOnDestroy(): void {
        if (this.sub) this.sub.unsubscribe();
    }

    importJson(): boolean {

        return false;
    }
}
