import { Component, Input } from '@angular/core';
import { eachDayOfInterval, format } from 'date-fns';

@Component({
  selector: 'app-emty-room',
  standalone: false,
  templateUrl: './emty-room.component.html',
  styleUrl: './emty-room.component.scss'
})
export class EmtyRoom {
  @Input() bookedList: any[] = [];
  daysInMonth: Date[] = [];
  bookedDates: string[] = [];

  ngOnChanges() {
    this.generateCalendar();
    this.expandBookedDates();
  }

  // tạo ngày trong tháng hiện tại
  generateCalendar() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    let arr: Date[] = [];

    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      arr.push(new Date(d));
    }

    this.daysInMonth = arr;
  }

  expandBookedDates() {
    const result: string[] = [];

    this.bookedList.forEach(item => {
      const range = eachDayOfInterval({
        start: new Date(item.check_in_date),
        end: new Date(item.check_out_date)
      });

      range.forEach((day: any) => {
        result.push(format(day, 'yyyy-MM-dd'));
      });
    });

    this.bookedDates = result;
  }

  isBooked(day: Date): boolean {
    return this.bookedDates.includes(format(day, 'yyyy-MM-dd'));
  }
}
