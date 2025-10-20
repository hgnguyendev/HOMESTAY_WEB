import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomestayService } from '../../../../_services/homestay.service';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
})
export class Search {
  listSearchHomestay: any = [];
  dataSubmit: any

  constructor(
    private route: ActivatedRoute,
    private _homestayService: HomestayService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const q = params['q'];
      if (q) {
        try {
          this.dataSubmit = JSON.parse(decodeURIComponent(q));
          // const searchHomestay = this._homestayService.searchHomestay(data);
          // console.log("searchhomestay", searchHomestay.data.data);
          // this.listSearchHomestay = searchHomestay;
          this.getAllSearch();
        } catch (err) {
          console.error('❌ Lỗi parse JSON:', err, q);
        }
      } else {
        console.log('⚠️ Không có tham số q trong URL.');
      }
    });
  }

  async getAllSearch() {
    try {
      const response = await this._homestayService.searchHomestay(this.dataSubmit);
      this.listSearchHomestay = response.data;
      console.log("list search homestay", this.listSearchHomestay);
    } catch (error: any) {

    }
  }


}
