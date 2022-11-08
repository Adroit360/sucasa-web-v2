import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading$: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.isLoading$ = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAsTouched();
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        this.tokenService.setToken(res.token);
        localStorage.setItem('user', res.user);
        this.router.navigate(['/dashboard']);
        this.isLoading$ = false;
      },
      (err) => {
        this.isLoading$ = false;
        this.snackbar.open('Error Logging in, Please try again', 'Retry', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    );
  }
}
