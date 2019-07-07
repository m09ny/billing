import { Component } from '@angular/core';
import { Router, Event, ResolveStart, ResolveEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading = true;

  constructor(private router: Router) {
    this.router.events.subscribe(routerEvent => {
      this.checkRouterEvent(routerEvent);
    });
  }

  /* not NavigationStart because there is no reason to show the spinner
  if the user is still blocked by the guards. He first needs to pass the
  GuardsCheckEnd event and then he gets to the ResolveStart event */
  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof ResolveStart) {
      this.loading = true;
    }

    if (routerEvent instanceof ResolveEnd) {
      this.loading = false;
    }
  }
}
