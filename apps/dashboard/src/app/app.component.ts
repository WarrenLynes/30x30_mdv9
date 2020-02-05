import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppFacade } from '@mdv9/core-state';
import { AuthFacade } from '@mdv9/core-state';

@Component({
  selector: 'mdv9-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  initialized$;
  title = 'dashboard';

  links = [
    {path: '', title: 'home', icon: 'home'}
  ];

  get authenticated() {
    return this.authFacade.authenticated$;
  }

  get loading$() {
    return this.authFacade.loading$
  }

  constructor(
    private facade: AppFacade,
    private authFacade: AuthFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initialized$ = this.facade.initialized$;
    this.facade.initialize();
  }

  onLogout() {
    this.authFacade.logout();
  }

  onCreate() {

    this.router.navigateByUrl('kicks/create');
  }

}
