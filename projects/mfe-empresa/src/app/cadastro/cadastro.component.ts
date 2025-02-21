import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  userInfo = {
    username: ''
  };

  cadastroForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    collaboratorsCount: new FormControl('', Validators.required)
  });

  constructor(
    private empresaService: EmpresaService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.getUserInfo();

    if (!this.userInfo) {
  
       window.location.href = '/'
    }
  }

  getUserInfo() {
    let userInfo = localStorage.getItem('userInfo');

    if (!userInfo) {
        userInfo = this.cookieService.get('userInfo');
    }

    return userInfo ? JSON.parse(userInfo) : null;
  }

  onSubmit() {
    const empresa = {
        createdAt: new Date().toISOString(),
        collaboratorsCount: this.cadastroForm.value.collaboratorsCount,
        name: this.cadastroForm.value.name,
        description: this.cadastroForm.value.description,
        repositoryGit: "https://github.com/example",
        urlDoc: "https://example.com",
        clients: [
            8666,
            19736,
            "iq6v{vL\"UZ",
            76526,
            "3-.Etp-mZ*",
            "=E!LvY|^c>",
            96416,
            2951,
            16949,
            "q2y\\lIL%oI"
        ],
        projects: [
            39066,
            67457,
            7091,
            10318,
            "cB>)[?M=k{",
            74368,
            "D&2o)HmR.U",
            66090,
            22372,
            62568
        ]
    };

    this.empresaService.cadastrar(empresa).subscribe((empresa: any) => {
      window.location.href = '/listagem-empresas';
      
    }, (err: any) => console.log(err)
    )
  }
}
