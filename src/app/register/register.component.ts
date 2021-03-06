import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Register } from 'src/app/models/register';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signUpForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;

  errors: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
        firstname:['',[Validators.required]],
        lastname:['',[Validators.required]],
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        passwords: this.formBuilder.group({
          password: ['', [Validators.required]],
          confirmedPassword: ['', [Validators.required]],
        }, {validator: this.passwordConfirming}),
    });
  }

  get form() { return this.signUpForm.controls; }
  get passwords(): any { return this.signUpForm.controls.passwords; }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmedPassword').value) {
        return {invalid: true};
    }
  }

  arePasswordsEqual(): boolean {
    return this.passwords.controls.password.value !== this.passwords.controls.confirmedPassword.value && this.passwords.controls.password.touched && this.passwords.controls.confirmedPassword.touched;
  }
  

  onSubmit() {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      return;
    }


    this.loading = true;
    let user: Register = {
      firstName: this.form.firstname.value,
      lastName: this.form.lastname.value,
      username: this.form.username.value,
      password: this.passwords.controls.password.value,
      email: this.form.email.value,
    };
     this.authService.register(user)
      .subscribe(
        u => {
          this.toastr.success('Account created successfully!', '', {
            positionClass: 'toast-bottom-center',
          });
        },
        error => {

          this.errors = [error];
          this.loading = false;
        });
       this.router.navigate(['/login'])
       
  }
}
