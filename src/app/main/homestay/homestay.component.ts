import { ParticlesGroups } from './../../../../node_modules/@tsparticles/engine/types/Types/ParticlesGroups.d';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomestayService } from '../../_services/homestay.service';
import { IHomeStay } from '../../interface/Ihomestay.interface';

@Component({
  selector: 'app-homestay',
  standalone: false,
  templateUrl: './homestay.component.html',
  styleUrl: './homestay.component.scss'
})
export class Homestay {
  homestays: IHomeStay[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  page: number = 1
  homestayDetails!: IHomeStay;
  search = {
    address: '',
    startDate: '',
    endDate: '',
    minPrice: '',
    maxPrice: ''
  };

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    const end = this.currentPage * this.itemsPerPage;
    return end > this.totalItems ? this.totalItems : end;
  }

  getVisiblePages(): number[] {
    const pages = [];
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  showEllipsis(): boolean {
    return this.totalPages > 5 && this.currentPage + 2 < this.totalPages;
  }

  getPaginationButtonClasses(isDisabled: boolean): string {
    const baseClasses = 'flex items-center px-3 py-2 rounded-lg border text-sm font-medium transition-colors';
    if (isDisabled) {
      return `${baseClasses} bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed`;
    }
    return `${baseClasses} bg-white text-slate-700 border-slate-300 hover:bg-slate-50`;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllHomestay();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllHomestay();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadData();
  }

  onItemsPerPageChange(event: any): void {
    this.itemsPerPage = parseInt(event.target.value);
    this.currentPage = 1;
    this.getAllHomestay();
  }

  loadData(): void {
    this.getAllHomestay();
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }


  getStatusClasses(status: string): string {
    const baseClasses = "px-4 py-2 rounded-full text-sm font-semibold shadow-sm transition-all duration-300";
    if (status === 'booked') {
      return `${baseClasses} bg-green-50 text-green-700 border border-green-200`;
    } else {
      return `${baseClasses} bg-red-50 text-red-700 border border-red-200`;
    }
  }

  getStatusDotClasses(status: string): string {
    if (status === 'booked') {
      return "bg-green-500";
    } else {
      return "bg-red-500";
    }
  }

  constructor(
    private _homestayService: HomestayService
  ) { }

  ngOnInit() {
    this.getAllHomestay();
  }

  async getAllHomestay() {
    try {
      const params = {
        page: this.currentPage,
        limit: this.itemsPerPage,
        address: this.search.address || '',
        minPrice: this.search.minPrice || '',
        maxPrice: this.search.maxPrice || '',
        startDate: this.search.startDate || '',
        endDate: this.search.endDate || '',
      };

      const response: any = await this._homestayService.getAllHomestay(params);

      this.homestays = response.data || [];
      this.totalItems = response.total || 0;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    } catch (error: any) {
      console.error(error);
    }
  }

  onSearch() {
    if (this.search.startDate && this.search.endDate && this.search.startDate > this.search.endDate) {
      alert('Ngày bắt đầu không thể lớn hơn ngày kết thúc!');
      return;
    }

    this.currentPage = 1;
    this.getAllHomestay();
  }


  viewDetail(item: IHomeStay) {
    this.homestayDetails = item
  }

  handleCloseDetails(item: any) {
    this.homestayDetails = item;
  }
}
