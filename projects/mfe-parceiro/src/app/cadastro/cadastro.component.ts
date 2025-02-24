import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ParceiroService } from '../parceiro.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
    description: new FormControl('', Validators.required)
  });

  constructor(
    private parceiroService: ParceiroService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.getUserInfo();

    if (!this.userInfo) {

        this.router.navigateByUrl('/');
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
    const parceiro = {
        createdAt: new Date().toISOString(),
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

    this.parceiroService.cadastrar(parceiro).subscribe((parceiro) => {

      this.router.navigateByUrl('/listagem-parceiros');
      
    }, err => console.log(err)
    )
  }
}
