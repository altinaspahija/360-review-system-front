import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ChartDataSets, ChartOptions, ChartPoint, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ReportsService } from '../service/reports.service';

export interface ReviewsStatistics {
  reviewId: number;
  reviewName: String;
  name: String;
  surname: String;
  answer: number;
  createdDate: Date;
}

export interface ReviewsInvitation {
  createdDate: Date;
  reviewInvitationId: number;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  showChart = true;

  topAverageRatingReviews: ReviewsStatistics[] = [];
  topAverageRatingRecentReviews: ReviewsStatistics[] = [];
  averageReviewsRating: any;

  averageOverallRating: any;

  numberOfRespondentsOfRecentReview: ReviewsInvitation[] = [];
  numberOfInvitationsOfRecentReview: ReviewsInvitation[] = [];

  numberOfRespondents: ReviewsInvitation[] = [];
  numberOfInvitations: ReviewsInvitation[] = [];

  overallNumberOfRespondents: any;
  overallNumberOfInvitations: any;

  nrOfItems = 3;
  topItem = 1;
  data: any[] = [];
  newArray: any;

  showDiv = {
    current1: false,
    current2: false
  }

  user_role:any;
  user_id:any;

  constructor(private reportsService: ReportsService, private router: Router) {
    this.user_role = localStorage.getItem("user_role")
    this.user_id = localStorage.getItem("user_id")
  }

  public lineChartLabels: Label[] = [];

  public lineChartOptions = {
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

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartType: ChartType = 'line';

  public lineChartData = [
    { data: [], label: 'Average Review Rating' },
  ];

  public colors = [
    { backgroundColor: "#264B74" },
  ];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
        yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    max: 50
                }
            }
          ]
        }
  };

  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Number of respondents' }
  ];

  ngOnInit(): void {
    this.findTopAverageRatingReviews();
    this.findTopAverageRatingRecentReviews();
    this.findAverageOverallRating();
    this.findNumberOfRespondentsOfRecentReview();
    this.findNumberOfInivatiationsOfRecentReview();
    this.findOverallNumberOfRespondents();
    this.findOverallNumberOfInvitations();
    this.findAverageReviewsRating();
    this.findNumberOfRespondents();
    this.findNumberOfInivitations();
  }

  findTopAverageRatingReviews() {
    this.reportsService.getTopAverageRatingReviews()
      .subscribe((res) => {
        const slicedArray = res.slice(0, this.nrOfItems);
        this.topAverageRatingReviews = slicedArray;
      })
  }

  findTopAverageRatingRecentReviews() {
    this.reportsService.gettopAverageRatingRecentReviews()
      .subscribe((res) => {
        const slicedArray = res.slice(0, this.nrOfItems);
        this.topAverageRatingRecentReviews = slicedArray;
      })
  }

  findAverageOverallRating() {
    this.reportsService.getAverageOverallRating()
      .subscribe((res) => {
        this.averageOverallRating = res;
      })
  }

  findNumberOfRespondentsOfRecentReview() {
    this.reportsService.getNumberOfRespondentsOfRecentReview()
      .subscribe((res) => {
        const slicedArray = res.slice(0, this.topItem);
        this.numberOfRespondentsOfRecentReview = slicedArray;
      })
  }

  findNumberOfInivatiationsOfRecentReview() {
    this.reportsService.getNumberOfInivatiationsOfRecentReview()
      .subscribe((res) => {
        const slicedArray = res.slice(0, this.topItem);
        this.numberOfInvitationsOfRecentReview = slicedArray;
      })
  }

  findOverallNumberOfRespondents() {
    this.reportsService.getOverallNumberOfRespondents()
      .subscribe((res) => {
        this.overallNumberOfRespondents = res;
      })
  }

  findOverallNumberOfInvitations() {
    this.reportsService.getOverallNumberOfInvitations()
      .subscribe((res) => {
        this.overallNumberOfInvitations = res;
      })
  }

  findAverageReviewsRating() {
    this.reportsService.getAverageReviewsRating()
      .subscribe((res) => {
        this.averageReviewsRating = res;
        this.averageReviewsRating.map((element: never, index: any) => {
          this.lineChartData[0].data.push(element['answer']);
          this.lineChartLabels.push('Review Period ' + (index + 1));
        })
      })
  }

  findNumberOfRespondents() {
    this.reportsService.getNumberOfRespondents()
      .subscribe((res) => {
        this.numberOfRespondents = res;
        this.numberOfRespondents.map((element, index: any)=>{
          this.barChartData[0].data?.push(element['reviewInvitationId']);
          this.barChartLabels.push('Review Period ' + (index + 1));
        })
      })
  }

  findNumberOfInivitations() {
    this.reportsService.getNmberOfInivtations()
      .subscribe((res) => {
        this.numberOfInvitations = res;
      })
  }

  public chartClicked(e:any):void {
  }
 
  public chartHovered(e:any):void {
  }

}
