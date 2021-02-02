import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES as SIDEBARROUTES, RouteInfo } from '../sidebar/sidebar.component';
import { BaseRoutes as BASEROUTES, ComponentRouteInfo } from '../../app.routing'
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private sidebarTitles: RouteInfo[];
    private layoutTitles: ComponentRouteInfo[];
    location: Location;

    constructor(location: Location, private element: ElementRef, private router: Router) {
        this.location = location;
    }

    ngOnInit(): void {
        this.sidebarTitles = SIDEBARROUTES.filter(title => title); // filter out nulls
        this.layoutTitles = BASEROUTES.filter(title => title); // filter out nulls
    }


    /**
     * Get the title that should correspond to the url
     */
    getTitle(): string {
        const title = this.location.prepareExternalUrl(this.location.path());

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
