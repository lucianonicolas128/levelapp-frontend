import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  company;
  lm = 'gFACRjjCvBdi4oSAPWs6hvuhu5I3';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    private router: Router,
  ) {
    this.company = auth.getUID();
  }

  // ngOnInit(): void {
  //   // this.auth.hasUser().pipe(
  //   //   map(user => user === null ? this.router.navigate(['/login']) : true)
  //   // );
  //   if (this.auth.getUID() == null) { this.router.navigate(['/login']); }
  // }

  logout() {
    this.auth.logOut()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }

}
