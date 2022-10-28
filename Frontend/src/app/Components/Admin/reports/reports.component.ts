import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(
    private reportsService: ReportsService
  ) { }

  ngOnInit(): void {
  }

  downloadPointsReport = (): void => {
    this.reportsService.getPointsReport()
      .subscribe(response => {
        console.log(response)
      })
  }

  downloadPayrollReport = (): void => {
    this.reportsService.getPayrollReport()
      .subscribe(response => {
        console.log(response)
      })
  }
}
