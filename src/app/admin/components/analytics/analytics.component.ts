import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  data: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchAnalytics();
  }

  private fetchAnalytics(): void {
    this.adminService.getAnalytics().subscribe(
      (res: any) => {
        console.log(res);
        this.data = res;
      },
      (error: any) => {
        console.error('Error fetching analytics:', error);
        // Handle error as needed
      }
    );
  }
}
