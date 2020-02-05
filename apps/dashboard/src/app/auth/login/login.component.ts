import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@mdv9/core-data';
import { Router } from '@angular/router';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { CustomValidators } from '../../custom-validators';
import { AuthFacade } from '@mdv9/core-state';
import { Subject } from 'rxjs';

@Component({
  selector: 'mdv9-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  loginForm: FormGroup;

  constructor(private facade: AuthFacade, private router: Router) {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

  submit() {
    this.facade.authenticate(this.loginForm.value);
  }

  buildForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      name: new FormControl('', Validators.compose([
        Validators.minLength(3),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ]))
    });
  }
}
