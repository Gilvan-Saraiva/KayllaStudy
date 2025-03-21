import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recupera-troca-senha',
  templateUrl: './redefinir.component.html',
  styleUrls: ['./redefinir.component.css'],
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule]
})
export class RedefinirComponent {
  recuperaForm: FormGroup;
  trocaForm: FormGroup;
  mensagem: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.recuperaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.trocaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      tokenReset: ['', [Validators.required]]
    });
  }

  recuperarSenha() {
    if (this.recuperaForm.invalid) return;

    const email = this.recuperaForm.value.email;

    this.authService.recuperaSenha(email).subscribe({
      next: (res) => {
        this.mensagem = res.message;
        // Navega para a tela de redefinição de senha após a requisição
        this.router.navigate(['/redefinir-senha']);
      },
      error: (err) => {
        this.mensagem = err.error || 'Erro ao solicitar recuperação de senha';
      }
    });
    setTimeout(() => {
      this.router.navigate(['/redefinir-senha']); // substitua '/pagina-destino' pela rota desejada
    }, 1500);
  }

  trocarSenha() {
    if (this.trocaForm.invalid) return;

    const data = {
      email: this.trocaForm.value.email,
      tokenReset: this.trocaForm.value.tokenReset,
      novaSenha: this.trocaForm.value.novaSenha
    };

    this.authService.trocaSenha(data).subscribe({
      next: (res) => {
        this.mensagem = 'Senha alterada com sucesso';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.mensagem = err.error || 'Erro ao trocar senha';
      }
    });
  }
}
