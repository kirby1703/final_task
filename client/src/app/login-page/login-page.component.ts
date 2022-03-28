import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/layouts/classes/material.service';
import { AuthService } from '../shared/layouts/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  aSub!: Subscription

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
    
   }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()         
    }
   }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']){
        // Registration Successeful. User can log in to created account
        MaterialService.toast('Регистрация завершена. Используйте данные для входа в аккаунт')
      } else if (params['accessDenied']) {
        // Authorization required
        MaterialService.toast('Вы не авторизованы в системе')
      } else if (params['sessionFailed']){
        MaterialService.toast('Сессия истекла. Авторизуйтесь заново')
      }
    }) 
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

}
