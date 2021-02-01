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
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(location: Location, private element: ElementRef, private router: Router) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.sidebarTitles = SIDEBARROUTES.filter(title => title); // filter out nulls
        this.layoutTitles = LAYOUTROUTES.filter(title => title); // filter out nulls
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            const $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };

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
