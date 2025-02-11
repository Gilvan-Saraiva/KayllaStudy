import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
      // throw new Error('Method not implemented.');
  }

  onSubmit(form:any){
      console.log(form.value)
  }

  openLoginPage(){
      this.router.navigateByUrl("");
  }
}
