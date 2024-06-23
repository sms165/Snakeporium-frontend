import { ApplicationRef, Component } from '@angular/core';
import { UserStorageService } from './services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Snakeporium';

  isCustomerLoggedIn : boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();

  constructor (private router: Router,
    private appRef: ApplicationRef
  ){}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    })
    this.appRef.isStable.subscribe((isStable: boolean) => {
      if (isStable) {
        console.log('Application is stable');
        // Perform actions once the application is stable
      } else {
        console.log('Application is not yet stable');
      }
    });

  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl("login");
  }

}
