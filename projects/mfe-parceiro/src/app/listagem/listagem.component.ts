import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import  {MatPaginator } from '@angular/material/paginator';
import { ParceiroService } from '../parceiro.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'action'];

  parceiros: any[] = [];

  dataSource = new MatTableDataSource(this.parceiros);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  editForm!: FormGroup;

  constructor(
    private parceiroService: ParceiroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscaParceiros();
  }

  buscaParceiros() {
    this.parceiroService.buscaParceiros().subscribe((parceiros) => 
    {
      const editForm = (e: any) => new FormGroup({
        name: new FormControl(e.name,Validators.required),
        description: new FormControl(e.description,Validators.required),
      });

      parceiros.forEach(parceiro => {
        this.parceiros.push({...parceiro, editable: false, validator: editForm(parceiro)})
      });

      this.dataSource = new MatTableDataSource(this.parceiros);

      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
      this.router.navigate(['/listagem-parceiros']);

      this.buscaParceiros();
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
      const { id } = parceiro;
      this.remove(id);
    }
  }

  remove(parceiro: any) {
    const { id } = parceiro;

    this.parceiroService.removerParceiro(id as number).subscribe(() => {
      this.router.navigate(['/listagem-parceiros']);

      this.buscaParceiros();
    }, error => console.log(error));
  }
}