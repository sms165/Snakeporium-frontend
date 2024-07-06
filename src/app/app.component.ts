import { ApplicationRef, Component, HostListener } from '@angular/core';
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

  isSmallScreen: boolean;

  constructor (private router: Router,
    private appRef: ApplicationRef
  ){}

  ngOnInit(): void {
    this.checkScreenSize();
    this.router.events.subscribe(event => {
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    })


  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768; // Adjust the width as needed
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl("login");
  }



}
