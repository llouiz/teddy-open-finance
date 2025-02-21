import { Component, OnInit } from '@angular/core';
import { PaginationService } from './pagination.service';
import { ParceiroService } from '../parceiro.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  data: any[] = []; // Your array of objects
  paginatedData: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;

  constructor(
    private parceiroService: ParceiroService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    // Assuming you fetch data from an API or it's already available
    this.parceiroService.buscaParceiros().subscribe((parceiros) => {
      this.data = parceiros;

      this.totalPages = Math.ceil(this.data.length / this.pageSize);
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.paginatedData = this.paginationService.paginate(this.data, this.currentPage, this.pageSize);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
}
