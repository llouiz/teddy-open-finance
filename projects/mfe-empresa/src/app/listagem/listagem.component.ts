import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import  {MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationService } from '../pagination.service';
import { CookieService } from 'ngx-cookie-service';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {
  userInfo = {
    username: ''
  };

  displayedColumns: string[] = ['name', 'description', 'collaboratorsCount', 'action'];

  empresas: any[] = [];

  dataSource = new MatTableDataSource(this.empresas);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  editForm!: FormGroup;

  paginatedData: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;

  constructor(
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute,
    private paginationService: PaginationService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.getUserInfo();

    if (!this.userInfo) {
      this.router.navigateByUrl('');
    }

    this.buscaEmpresas();
  }

  getUserInfo() {
    let userInfo = localStorage.getItem('userInfo');

    if (!userInfo) {
        userInfo = this.cookieService.get('userInfo');
    }

    return userInfo ? JSON.parse(userInfo) : null;
  }

  buscaEmpresas() {
    this.empresaService.buscaEmpresas().subscribe((empresas: any) =>
    {
      const editForm = (e: any) => new FormGroup({
        name: new FormControl(e.name,Validators.required),
        description: new FormControl(e.description,Validators.required),
        collaboratorsCount: new FormControl(e.collaboratorsCount, Validators.required)
      });

      this.empresas = [];
      
      empresas.forEach((empresa: any) => {
        this.empresas.push({...empresa, editable: false, validator: editForm(empresa)})
      });

      this.paginatedData = this.empresas;

      this.totalPages = Math.ceil(this.paginatedData.length / this.pageSize);

      this.route.queryParams.subscribe(params => {
        const page = Number(params['page']) || 1;
        this.currentPage = Math.min(Math.max(page, 1), this.totalPages);

        this.updatePagination();

        if (page !== this.currentPage) {
            this.router.navigate([], {
              queryParams: { page: this.currentPage },
              queryParamsHandling: 'merge'
            });
        }
      });

      this.dataSource = new MatTableDataSource(this.empresas);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;

      this.updatePagination();
    }

    this.router.navigate([], {
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge'
    });
  }

  updatePagination(): void {
    this.empresas = this.paginationService.paginate(this.paginatedData, this.currentPage, this.pageSize);

    this.dataSource = new MatTableDataSource(this.empresas);
  }

  editar(empresa: any) {
    empresa.editable = true;
  }

  confirmarEdicao(empresa: any) {
    empresa.editable = false;

    const dataToBeUpdated = {
      id: empresa.id,
      name: empresa.validator.controls.name.value,
      description: empresa.validator.controls.description.value,
      collaboratorsCount: empresa.validator.controls.collaboratorsCount.value
    };

    this.empresaService.atualizar(empresa.id, dataToBeUpdated).subscribe((empresaAtualizado: any) => {

      this.buscaEmpresas();

      this.empresas = [];
    }, (error: any) => console.log(error)
    );
  }

  cancelarDeletar(empresa: any, i: number) {
    if (empresa.editable) {
      empresa.editable = false;
      // Reseta formulário
      Object.keys(empresa.validator.controls).forEach(item => {
        empresa.validator.controls[item].patchValue(empresa[item]);
      });
    } else {
      this.remove(empresa);
    }
  }

  remove(empresa: any) {
    const { id } = empresa;

    this.empresaService.removerEmpresa(id as number).subscribe(() => {
      // Busca lista atualizada
      this.buscaEmpresas();
    }, (error: any) => console.log(error));
  }
}