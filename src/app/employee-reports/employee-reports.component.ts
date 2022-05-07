import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { EmployeeService } from '../service/employees.service';
import { GoalsService } from '../service/goals.service';
import { ReportsService } from '../service/reports.service';
import { ReviewService } from '../service/review.service';

@Component({
  selector: 'app-employee-reports',
  templateUrl: './employee-reports.component.html',
  styleUrls: ['./employee-reports.component.scss']
})
export class EmployeeReportsComponent implements OnInit {

  user_id: any;
  user_role: any;
  user: any;
  countReviews: any;
  countReviewsTo: any;
  countReviewsBy: any;
  averageRatingsBy: any;
  averageRatingsTo: any;
  overAllaverageRatingTo: any;
  overAllaverageRatingBy: any;
  numberOfRespondentsByEmployee: any;
  numberOfRespondentsToEmployee: any;
  overallNumberOfRespondentsToEmployee: any;
  overallNumberOfRespondentsByEmployee: any;
  reviewsNumberOfRespondsByEmployee: any;
  reviewsNumberOfRespondentsToEmployee: any;
  averageReviewsRatingsToEmployee: any;
  averageReviewsRatingsByEmployee: any;

 

  constructor(private employeeService: EmployeeService, private reviewService: ReviewService, private reportsService: ReportsService) {
    this.user_role = localStorage.getItem("user_role")
    this.user_id = localStorage.getItem("user_id")
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.countAllReviewsByEmployee();
    this.countAllReviewsForEmployee();
    this.countAllReviewsToEmployee();
    this.getOverallAverageRatingToEmployee();
    this.getOverallAverageRatingByEmployee();
    this.getAverageRatingsToEmployee();
    this.getAverageRatingsByEmployee();
    this.getNumberOfRespondentsByEmployee();
    this.getNumberOfRespondentsToEmployee();
    this.getOverallNumberOfRespondentsByEmployee();
    this.getOverallNumberOfRespondentsToEmployee();
    this.getReviewsNumberOfRespondsByEmployee();
    this.getReviewsNumberOfRespondentsToEmployee();
    this.getReviewsAverageRatingsToEmployee();
    this.getReviewsAverageRatingsByEmployee();
  }

  lineChartData1 = [
    { data: [], label: 'Average Rating' },
  ];

  lineChartLabels1: Label[] = [];

  lineChartData2 = [
    { data: [], label: 'Average Rating' },
  ];

  lineChartLabels2: Label[] = [];

  lineChartData3 = [
    { data: [], label: 'Average Rating' },
  ];

  lineChartLabels3: Label[] = [];

  lineChartData4 = [
    { data: [], label: 'Average Rating' },
  ];

  lineChartLabels4: Label[] = [];

  lineChartOptions2 = {
    responsive: true,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          max: 5
        }
      }
      ]
    }
  };

  lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          max: 5
        }
      }
      ],
      xAxes: [
        {
          ticks: {
            display: false
          }
        }
      ]
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';
  
  public colors = [
    { backgroundColor: "#264B74" },
  ];

  public colors2 = [
    { backgroundColor: "#74264b" },
  ];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          max: 20
        }
      }
      ]
    }
  };

  barChartOptions2: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          max: 20
        }
      }
      ],
      xAxes: [
        {
          ticks: {
            display: false
          }
        }
      ]
    }
  };

  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartLabels1: Label[] = [];

  barChartData1 = [
    { data: [], label: 'Number of responds' }
  ];

  barChartLabels2: Label[] = [];

  barChartData2 = [
    { data: [], label: 'Number of respondents' }
  ];


  barChartLabels3: Label[] = [];

  barChartData3 = [
    { data: [], label: 'Number of responds' }
  ];

  barChartLabels4: Label[] = [];

  barChartData4 = [
    { data: [], label: 'Number of respondents' }
  ];

  getUserDetails() {
    this.employeeService.getUserById(this.user_id)
      .subscribe(res => {
        this.user = res;
      })
  }

  countAllReviewsForEmployee() {
    this.reviewService.countAllReviewsForEmployee(this.user_id).subscribe((res) => {
      this.countReviews = res;
    })
  }

  countAllReviewsToEmployee() {
    this.reviewService.countAllReviewsToEmployee(this.user_id).subscribe((res) => {
      this.countReviewsTo = res;
    })
  }

  countAllReviewsByEmployee() {
    this.reviewService.countAllReviewsByEmployee(this.user_id).subscribe((res) => {
      this.countReviewsBy = res;
    })
  }

  getAverageRatingsByEmployee() {
    this.reportsService.getAverageRatingsByEmployee(this.user_id).
      subscribe((res) => {
        this.averageRatingsBy = res;
        this.averageRatingsBy.map((element: never, index: any) => {
          this.lineChartData1[0].data.push(element['answer']);
          this.lineChartLabels1.push(element['reviewName']);
        })
      })
  }

  getAverageRatingsToEmployee() {
    this.reportsService.getAverageRatingsToEmployee(this.user_id).
      subscribe((res) => {
        this.averageRatingsTo = res;
        this.averageRatingsTo.map((element: never, index: any) => {
          this.lineChartData2[0].data.push(element['answer']);
          this.lineChartLabels2.push(element['reviewName']);
        })
      })
  }

  getOverallAverageRatingToEmployee() {
    this.reportsService.getOverallAverageRatingToEmployee(this.user_id).subscribe((res) => {
      this.overAllaverageRatingTo = res;
    })
  }

  getOverallAverageRatingByEmployee() {
    this.reportsService.getOverallAverageRatingByEmployee(this.user_id).subscribe((res) => {
      this.overAllaverageRatingBy = res;
    })
  }

  getNumberOfRespondentsByEmployee() {
    this.reportsService.getNumberOfRespondentsByEmployee(this.user_id).subscribe((res) => {
      this.numberOfRespondentsByEmployee = res;
      this.numberOfRespondentsByEmployee.map((element: never, index: any) => {
        this.barChartData1[0].data.push(element['reviewInvitationId']);
        this.barChartLabels1.push(element['reviewName']);
      })
    })
  }

  getNumberOfRespondentsToEmployee() {
    this.reportsService.getNumberOfRespondentsToEmployee(this.user_id).subscribe((res) => {
      this.numberOfRespondentsToEmployee = res;
      this.numberOfRespondentsToEmployee.map((element: never, index: any) => {
        this.barChartData2[0].data.push(element['reviewInvitationId']);
        this.barChartLabels2.push(element['reviewName']);
      })
    })
  }

  getOverallNumberOfRespondentsToEmployee() {
    this.reportsService.getOverallNumberOfRespondentsToEmployee(this.user_id).subscribe((res) => {
      this.overallNumberOfRespondentsToEmployee = res;
    })
  }

  getOverallNumberOfRespondentsByEmployee() {
    this.reportsService.getOverallNumberOfRespondentsByEmployee(this.user_id).subscribe((res) => {
      this.overallNumberOfRespondentsByEmployee = res;
    })
  }

  getReviewsNumberOfRespondsByEmployee() {
    this.reportsService.getReviewsNumberOfRespondsByEmployee(this.user_id).subscribe((res) => {
      this.reviewsNumberOfRespondsByEmployee = res;
      this.reviewsNumberOfRespondsByEmployee.map((element: never, index: any) => {
        this.barChartData3[0].data.push(element['reviewInvitationId']);
        this.barChartLabels3.push('Review Period ' + (index + 1));
      })
    })
  }

  getReviewsNumberOfRespondentsToEmployee() {
    this.reportsService.getReviewsNumberOfRespondentsToEmployee(this.user_id).
      subscribe((res) => {
        this.reviewsNumberOfRespondentsToEmployee = res;
        this.reviewsNumberOfRespondentsToEmployee.map((element: never, index: any) => {
          this.barChartData4[0].data.push(element['reviewInvitationId']);
          this.barChartLabels4.push('Review Period ' + (index + 1));
        })
      })
  }

  getReviewsAverageRatingsToEmployee() {
    this.reportsService.getReviewsAverageRatingsToEmployee(this.user_id).
      subscribe((res) => {
        this.averageReviewsRatingsToEmployee = res;
        this.averageReviewsRatingsToEmployee.map((element: never, index: any) => {
          this.lineChartData4[0].data.push(element['answer']);
          this.lineChartLabels4.push('Review Period ' + (index + 1));
        })
      })
  }

  getReviewsAverageRatingsByEmployee() {
    this.reportsService.getReviewsAverageRatingsByEmployee(this.user_id).
      subscribe((res) => {
        this.averageReviewsRatingsByEmployee = res;
        this.averageReviewsRatingsByEmployee.map((element: never, index: any) => {
          this.lineChartData3[0].data.push(element['answer']);
          this.lineChartLabels3.push('Review Period ' + (index + 1));
        })
      })
  }

}
