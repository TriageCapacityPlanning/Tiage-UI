import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES as SIDEBARROUTES } from '../sidebar/sidebar.component';
import { BaseRoutes as BASEROUTES } from '../../app.routing'
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
        this.layoutTitles = BASEROUTES.filter(title => title); // filter out nulls
        const navbar: HTMLElement = this.element.nativeElement;
    }


    getTitle() {
        let title = this.location.prepareExternalUrl(this.location.path());

        for (let item = 0; item < this.sidebarTitles.length; item++) {
            if (this.sidebarTitles[item].path === title) {
                return this.sidebarTitles[item].title;
            }
        }

        for (let item = 0; item < BASEROUTES.length; item++) {
            if (BASEROUTES[item].path === title.substr(1)) {
                return BASEROUTES[item].title;
            }
        }
        return '';
    }
}
