import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import  {MatPaginator } from '@angular/material/paginator';
import { ParceiroService } from '../parceiro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationService } from '../pagination.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {
  userInfo = {
    username: ''
  };

  displayedColumns: string[] = ['name', 'description', 'action'];

  parceiros: any[] = [];

  dataSource = new MatTableDataSource(this.parceiros);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  editForm!: FormGroup;

  paginatedData: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;

  constructor(
    private parceiroService: ParceiroService,
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

    this.buscaParceiros();
  }

  getUserInfo() {
    let userInfo = localStorage.getItem('userInfo');

    if (!userInfo) {
        userInfo = this.cookieService.get('userInfo');
    }

    return userInfo ? JSON.parse(userInfo) : null;
  }

  buscaParceiros() {
    this.parceiroService.buscaParceiros().subscribe((parceiros) =>
    {
      const editForm = (e: any) => new FormGroup({
        name: new FormControl(e.name,Validators.required),
        description: new FormControl(e.description,Validators.required),
      });
      console.log('parceiros', parceiros);
      
      parceiros.forEach(parceiro => {
        this.parceiros.push({...parceiro, editable: false, validator: editForm(parceiro)})
      });

      this.paginatedData = this.parceiros;

      this.totalPages = Math.ceil(this.paginatedData.length / this.pageSize);

      this.route.queryParams.subscribe(params => {
        const page = Number(params['page']) || 1;
        this.currentPage = Math.min(Math.max(page, 1), this.totalPages);

        this.updatePagination();
      });

      this.dataSource = new MatTableDataSource(this.parceiros);
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

    // Update URL with new page query param
    this.router.navigate([], {
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge' // Keeps existing query parameters while updating 'page'
    });
  }

  updatePagination(): void {
    this.parceiros = this.paginationService.paginate(this.paginatedData, this.currentPage, this.pageSize);

    this.dataSource = new MatTableDataSource(this.parceiros);
  }

  editar(parceiro: any) {
    parceiro.editable = true;
  }

  confirmarEdicao(parceiro: any) {
    parceiro.editable = false;

    const dataToBeUpdated = {
      id: parceiro.id,
      name: parceiro.validator.controls.name.value,
      description: parceiro.validator.controls.description.value
    };

    this.parceiroService.atualizar(dataToBeUpdated).subscribe((parceiroAtualizado) => {
      window.location.href = '/listagem-parceiros';

      this.parceiros = [];
    }, error => console.log(error)
    );
  }

  cancelarDeletar(parceiro: any, i: number) {
    if (parceiro.editable) {
      parceiro.editable = false;
      // Reseta formulário
      Object.keys(parceiro.validator.controls).forEach(item => {
        parceiro.validator.controls[item].patchValue(parceiro[item]);
      });
    } else {
      this.remove(parceiro);
    }
  }

  remove(parceiro: any) {
    const { id } = parceiro;

    this.parceiroService.removerParceiro(id as number).subscribe(() => {
      window.location.href = '/listagem-parceiros';

      this.parceiros = [];
    }, error => console.log(error));
  }
}