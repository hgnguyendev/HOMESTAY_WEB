import { Component } from '@angular/core';
import { HomestayService } from '../../../../_services/homestay.service';

@Component({
  selector: 'homestay-outstanding',
  standalone: false,
  templateUrl: './homestay-outstanding.component.html',
})
export class HomestayOutstanding {

  homeStayFeatured: any;
  detail: any;

  constructor(
    private _homestayService: HomestayService
  ) { }

  ngOnInit() {
    this.getAllHomestayFeatured()
  }

  async getAllHomestayFeatured() {
    try {
      const response = await this._homestayService.getHomestayFeatured();
      this.homeStayFeatured = response;
      console.log("homesaty features", this.homeStayFeatured)
    } catch (error: any) {

    }
  }

  handleDetail(item: any) {
    this.detail = item;
  }

  handleCloseDetails(event: any) {
    this.detail = event;
  }

}
