import { Component} from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor( public location: Location, private router: Router) {}

  ngOnInit(): void {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

      this.location.subscribe((ev: PopStateEvent) => {
          this.lastPoppedUrl = ev.url;
      });
       this.router.events.subscribe((event) => {
          if (event instanceof NavigationStart) {
             if (event.url !== this.lastPoppedUrl) {
                 this.yScrollStack.push(window.scrollY);
             }
         } else if (event instanceof NavigationEnd) {
             if (event.url === this.lastPoppedUrl) {
                 this.lastPoppedUrl = undefined;
                 window.scrollTo(0, this.yScrollStack.pop());
             } else {
                 window.scrollTo(0, 0);
             }
         }
      });
      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe(() => {
           elemMainPanel.scrollTop = 0;
           elemSidebar.scrollTop = 0;
      });

  }
  ngAfterViewInit(): void {
      this.runOnRouteChange();
  }
  isMaps(path: string): boolean {
      let titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if (path === titlee) {
          return false;
      } else {
          return true;
      }
  }
  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }
  isMac(): boolean {
      let bool = false;
      if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
          bool = true;
      }
      return bool;
  }

}
