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
        // console.log(response)
        let fileName = response.headers.get('Content-Disposition')
        ?.split(';')[1].split('=')[1]
        let blob:Blob = response.body as Blob
        let a = document.createElement('a')
        a.href = window.URL.createObjectURL(blob)
        a.click()
      })
  }

  downloadPayrollReport = (): void => {
    this.reportsService.getPayrollReport()
      .subscribe(response => {
        // console.log(response)
        let fileName = response.headers.get('Content-Disposition')
        ?.split(';')[1].split('=')[1]
        let blob:Blob = response.body as Blob
        let a = document.createElement('a')
        a.href = window.URL.createObjectURL(blob)
        a.click()
      })
  }
}
