import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../components/header/header.component';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authReady$.pipe(
      filter(Boolean),
      take(1)
    ).subscribe(() => {
      if (this.authService.isLoggedIn()) {
        this.authService.navigateToCurrentUserDashboard();
      }
    });
  }

  login() {
    this.authService.login();
  }
}
