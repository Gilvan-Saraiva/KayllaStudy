import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true
})
export class RegisterComponent {
 constructor(private router: Router, private userService: UserService) {}

 
    onSubmit(form: any) {
      if (form.valid) {
        const formData = { ...form.value, role: '' }; // Adicionando o campo role com valor vazio
        this.userService.registerUser(formData).subscribe(
          response => {
            console.log('Resposta da API:', response);
            if (response && response.message) {
              console.log('Usuário cadastrado com sucesso');
              this.router.navigateByUrl('/login'); // Redirecionar para login após sucesso
            }
          },
          error => {
            console.error('Erro ao cadastrar usuário', error);
          }
        );
      }
    }
}
