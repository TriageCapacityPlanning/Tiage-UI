import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES as SIDEBARROUTES } from '../sidebar/sidebar.component';
import { LayoutRoutes as LAYOUTROUTES } from '../../layouts/admin-layout/admin-layout.routing'
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { fromPromise } from 'rxjs/internal-compatibility';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private sidebarTitles: any[];
    private layoutTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;

    constructor(location: Location, private element: ElementRef, private router: Router) {
        this.location = location;
    }

    ngOnInit() {
        this.sidebarTitles = SIDEBARROUTES.filter(title => title); // filter out nulls
        this.layoutTitles = LAYOUTROUTES.filter(title => title); // filter out nulls
        const navbar: HTMLElement = this.element.nativeElement;
    }


    getTitle() {
        let title = this.location.prepareExternalUrl(this.location.path());
        if (title.charAt(0) === '#') {
            title = title.slice(1);
        }

        for (let item = 0; item < this.sidebarTitles.length; item++) {
            if (this.sidebarTitles[item].path === title) {
                return this.sidebarTitles[item].title;
            }
        }

        for (let item = 0; item < LAYOUTROUTES.length; item++) {
            if (LAYOUTROUTES[item].path === title.substr(1)) {
                return LAYOUTROUTES[item].title;
            }
        }
        return '';
    }
}
