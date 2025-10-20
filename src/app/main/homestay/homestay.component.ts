import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homestay',
  standalone: false,
  templateUrl: './homestay.component.html',
  styleUrl: './homestay.component.scss'
})
export class Homestay {
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('Data nhận được:', params);
    })
  }

}
