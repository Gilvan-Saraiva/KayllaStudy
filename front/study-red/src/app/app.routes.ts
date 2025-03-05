import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { PostarComponent } from './postar/postar.component';
import { RegisterComponent } from './register/register.component';
import { ClassComponent } from './class/class.component';
import { ControlContainer } from '@angular/forms';
import { ControleComponent } from './controle/controle.component';
import { FaqComponent } from './faq/faq.component';


export const routes: Routes = [
  {path: 'home', component:HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'postar', component:PostarComponent},
  {path: 'class', component:ClassComponent},
  {path: 'controle', component:ControleComponent },
  {path: 'faq', component:FaqComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
