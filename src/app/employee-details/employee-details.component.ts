import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { EmployeeService } from '../service/employees.service';
import { ReviewService } from '../service/review.service';
import { ReportsService } from '../service/reports.service';
import { GoalsService } from '../service/goals.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';


export interface User {
  userId: number;
  name: String;
  surname: String;
  email: String;
  phoneNumber: String;
  start_date: Date;
  profileImage: String;
  positionId: Number;
  roleId: Number;
  positionTitle: String;
  departmentTitle: String;
}

export interface EmployeesReview {
  userId: number;
  reviewName: String;
  createdDate: Date;
  expirationDate: Date;
  completedDate: Date;
  status: String;
  name: String;
  surname: String;
  createdTo: number;
  answer: number;
}

export interface Goals {
  categoryDescription: String,
  lastAverageRating: Number,
  averageGoal: Number,
  nowAverageRating: Number,
  goalStatus: String
}

export interface RatingDefinitiion {
  range: String;
  definition: String;
  description: String;
}

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit, AfterViewInit {

  id!: number;
  category: any;
  categories: any = [];
  filterDeptTitlesArray: String[] = [];
  communicationSkills: any;
  interpersonalSkills: any;
  problemsolvingSkills: any;
  leadershipSkills: any;
  communicationSkills2: any;
  interpersonalSkills2: any;
  problemsolvingSkills2: any;
  leadershipSkills2: any;
  filterDeptTitlesArray2: String[] = [];
  specificElement: any;
  user: any;
  countReviews: any;
  countReviewsTo: any;
  countReviewsBy: any;
  averageRatingsTo: any;
  overAllaverageRatingTo: any;
  averageRatingsBy: any;
  overAllaverageRatingBy: any;
  numberOfRespondentsToEmployee: any;
  numberOfRespondentsByEmployee: any;
  overallNumberOfRespondentsByEmployee: any;
  overallNumberOfRespondentsToEmployee: any;
  reviewsNumberOfRespondentsToEmployee: any;
  reviewsNumberOfRespondsByEmployee: any;
  averageReviewsRatingsToEmployee: any;
  averageReviewsRatingsByEmployee: any;
  nrOfItemsSlice = 1;
  nrOfItemsSlice2 = 2;

  previouStatusCom: any;
  previouStatusInt: any;
  previouStatusPb: any;
  previouStatusLe: any;

  recentStatusCom: any;
  recentStatusInt: any;
  recentStatusPb: any;
  recentStatusLe: any;

  communicationSkillsTotal: any;
  interpesronalSkillsTotal: any;
  problemSolvingSkillsTotal: any;
  leadershipSkillsTotal: any;

  totalRange: any;

  comAverageGoalRating: any;
  intAverageGoalRating: any;
  pbAverageGoalRating: any;
  leAverageGoalRating: any;

  comGoalStatus: any;
  intGoalStatus: any;
  pbGoalStatus: any;
  leGoalStatus: any;

  scale: any;

  data: any[] = [];

  comProgress: any;
  intProgress: any;
  pbProgress: any;
  leProgress: any;

  user_role: any;
  user_id: any;

  setColorForProgress(progressOption: string) {

    if (progressOption === "Increase") {
      return "#4b7426"
    }
    else if (progressOption === "Trying to increase") {
      return "#74264b"
    }
    else
      return "#264b74"
  }

  displayedColumns1: string[] = [
    'reviewName', 'createdDate', 'expirationDate'
  ];

  displayedColumns2: string[] = [
    'reviewName', 'createdDate', 'completedDate'
  ];

  displayedColumns3: string[] = [
    'reviewName', 'name', 'createdDate', 'completedDate'
  ];

  displayedColumns4: string[] = [
    'categoryDescription', 'previousRating', 'lastRating', 'ratingStatus', 'targetGoal', 'goalStatus'
  ];

  displayedColumns5: string[] = [
    'range', 'definition', 'description'
  ];

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

  dataSource1 = new MatTableDataSource<EmployeesReview>();
  dataSource2 = new MatTableDataSource<EmployeesReview>();
  dataSource3 = new MatTableDataSource<EmployeesReview>();
  dataSource4 = new MatTableDataSource<any>();

  @ViewChild('MatSort1')
  MatSort1!: MatSort;

  @ViewChild('MatPaginator1')
  MatPaginator1!: MatPaginator;

  @ViewChild('MatSort2')
  MatSort2!: MatSort;

  @ViewChild('MatPaginator2')
  MatPaginator2!: MatPaginator;

  @ViewChild('MatSort3')
  MatSort3!: MatSort;

  @ViewChild('MatPaginator3')
  MatPaginator3!: MatPaginator;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private reviewService: ReviewService, private reportsService: ReportsService, private goalsService: GoalsService, private router: Router) {
    this.user_role = localStorage.getItem("user_role")
    this.user_id = localStorage.getItem("user_id")
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.getUsersReviews();
    this.getReviewsByEmployee();
    this.getReviewsToEmployee();
    this.countAllReviewsForEmployee();
    this.countAllReviewsToEmployee();
    this.countAllReviewsByEmployee();
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
    this.getRecentCategoriesAndRatings();
    this.getPreviousCategoriesAndRatings();
    this.getAverageGoalRatings();
    this.getRatingcScales();
  }

  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
    this.dataSource1.sort = this.MatSort1;
    this.dataSource2.paginator = this.MatPaginator2;
    this.dataSource2.sort = this.MatSort2;
    this.dataSource3.paginator = this.MatPaginator3;
    this.dataSource3.sort = this.MatSort3;
  }

  getUserDetails() {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getUserById(this.id)
      .subscribe(res => {
        this.user = res;
      })
  }

  getUsersReviews() {
    this.id = this.route.snapshot.params['id'];
    this.reviewService.getReviewsForEmployee(this.id)
      .subscribe(res => {
        this.dataSource1.data = res;
      })
    this.dataSource1.data.length > 0;
  }

  getReviewsByEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reportsService.getReviewsByEmployee(this.id)
      .subscribe(res => {
        this.dataSource2.data = res;
      })
    this.dataSource2.data.length > 0;
  }

  getReviewsToEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reportsService.getReviewsToEmployee(this.id)
      .subscribe(res => {
        this.dataSource3.data = res;
      })
    this.dataSource3.data.length > 0;
  }

  countAllReviewsForEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reviewService.countAllReviewsForEmployee(this.id).subscribe((res) => {
      this.countReviews = res;
    })
  }

  countAllReviewsToEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reviewService.countAllReviewsToEmployee(this.id).subscribe((res) => {
      this.countReviewsTo = res;
    })
  }

  countAllReviewsByEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reviewService.countAllReviewsByEmployee(this.id).subscribe((res) => {
      this.countReviewsBy = res;
    })
  }

  getAverageRatingsByEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reportsService.getAverageRatingsByEmployee(this.id).
      subscribe((res) => {
        this.averageRatingsBy = res;
        this.averageRatingsBy.map((element: never, index: any) => {
          this.lineChartData1[0].data.push(element['answer']);
          this.lineChartLabels1.push(element['reviewName']);
        })
      })
  }

  getAverageRatingsToEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reportsService.getAverageRatingsToEmployee(this.id).
      subscribe((res) => {
        this.averageRatingsTo = res;
        this.averageRatingsTo.map((element: never, index: any) => {
          this.lineChartData2[0].data.push(element['answer']);
          this.lineChartLabels2.push(element['reviewName'] + ' by ' + element['name'] + ' ' + element['surname']);
        })
      })
  }

  getOverallAverageRatingToEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reportsService.getOverallAverageRatingToEmployee(this.id).subscribe((res) => {
      this.overAllaverageRatingTo = res;
    })
  }

  getOverallAverageRatingByEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reportsService.getOverallAverageRatingByEmployee(this.id).subscribe((res) => {
      this.overAllaverageRatingBy = res;
    })
  }

  getNumberOfRespondentsByEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reportsService.getNumberOfRespondentsByEmployee(this.id).subscribe((res) => {
      this.numberOfRespondentsByEmployee = res;
      this.numberOfRespondentsByEmployee.map((element: never, index: any) => {
        this.barChartData1[0].data.push(element['reviewInvitationId']);
        this.barChartLabels1.push(element['reviewName']);
      })
    })
  }

  getNumberOfRespondentsToEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reportsService.getNumberOfRespondentsToEmployee(this.id).subscribe((res) => {
      this.numberOfRespondentsToEmployee = res;
      this.numberOfRespondentsToEmployee.map((element: never, index: any) => {
        this.barChartData2[0].data.push(element['reviewInvitationId']);
        this.barChartLabels2.push(element['reviewName']);
      })
    })
  }

  getOverallNumberOfRespondentsToEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reportsService.getOverallNumberOfRespondentsToEmployee(this.id).subscribe((res) => {
      this.overallNumberOfRespondentsToEmployee = res;
    })
  }

  getOverallNumberOfRespondentsByEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reportsService.getOverallNumberOfRespondentsByEmployee(this.id).subscribe((res) => {
      this.overallNumberOfRespondentsByEmployee = res;
    })
  }

  getReviewsNumberOfRespondsByEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reportsService.getReviewsNumberOfRespondsByEmployee(this.id).subscribe((res) => {
      this.reviewsNumberOfRespondsByEmployee = res;
      this.reviewsNumberOfRespondsByEmployee.map((element: never, index: any) => {
        this.barChartData3[0].data.push(element['reviewInvitationId']);
        this.barChartLabels3.push('Review Period ' + (index + 1));
      })
    })
  }

  getReviewsNumberOfRespondentsToEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reportsService.getReviewsNumberOfRespondentsToEmployee(this.id).
      subscribe((res) => {
        this.reviewsNumberOfRespondentsToEmployee = res;
        this.reviewsNumberOfRespondentsToEmployee.map((element: never, index: any) => {
          this.barChartData4[0].data.push(element['reviewInvitationId']);
          this.barChartLabels4.push('Review Period ' + (index + 1));
        })
      })
  }

  getReviewsAverageRatingsToEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reportsService.getReviewsAverageRatingsToEmployee(this.id).
      subscribe((res) => {
        this.averageReviewsRatingsToEmployee = res;
        this.averageReviewsRatingsToEmployee.map((element: never, index: any) => {
          this.lineChartData4[0].data.push(element['answer']);
          this.lineChartLabels4.push('Review Period ' + (index + 1));
        })
      })
  }

  getReviewsAverageRatingsByEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.reportsService.getReviewsAverageRatingsByEmployee(this.id).
      subscribe((res) => {
        this.averageReviewsRatingsByEmployee = res;
        this.averageReviewsRatingsByEmployee.map((element: never, index: any) => {
          this.lineChartData3[0].data.push(element['answer']);
          this.lineChartLabels3.push('Review Period ' + (index + 1));
        })
      })
  }

  getPreviousCategoriesAndRatings() {
    this.id = this.route.snapshot.params['id'];
    this.goalsService.getCategories().
      subscribe((res) => {
        this.categories = res;
        this.filterDeptTitlesArray = res.map((obj: { categoriesDescription: any; }) => obj.categoriesDescription);
      })
    this.filterDeptTitlesArray.includes("Communication")
    this.goalsService.getRatingsByEmployeeAndCategory(this.id, "Communication")
      .subscribe((res) => {
        const slicedArray = res.slice(0, this.nrOfItemsSlice);
        this.communicationSkills = slicedArray;
        const com = this.communicationSkills[0]['answer'];
        switch (true) {
          case (com >= 1 && com <= 2):
            this.previouStatusCom = "Low Performer"
            break;
          case (com > 2 && com <= 3):
            this.previouStatusCom = "Inconsistent Performer"
            break;
          case (com > 3 && com <= 4):
            this.previouStatusCom = "Successful"
            break;
          case (com > 4 && com <= 5):
            this.previouStatusCom = "Outstanding"
            break;
          default:
            break;
        }
      })
    this.filterDeptTitlesArray.includes("Interpersonal")
    this.goalsService.getRatingsByEmployeeAndCategory(this.id, "Interpersonal")
      .subscribe((res) => {
        const slicedArray = res.slice(0, this.nrOfItemsSlice);
        this.interpersonalSkills = slicedArray;
        const int = this.interpersonalSkills[0]['answer'];
        switch (true) {
          case (int >= 1 && int <= 2):
            this.previouStatusInt = "Low Performer"
            break;
          case (int > 2 && int <= 3):
            this.previouStatusInt = "Inconsistent Performer"
            break;
          case (int > 3 && int <= 4):
            this.previouStatusInt = "Successful"
            break;
          case (int > 4 && int <= 5):
            this.previouStatusInt = "Outstanding"
            break;
          default:
            break;
        }
      })
    this.filterDeptTitlesArray.includes("Problem Solving")
    this.goalsService.getRatingsByEmployeeAndCategory(this.id, "Problem Solving")
      .subscribe((res) => {
        const slicedArray = res.slice(0, this.nrOfItemsSlice);
        this.problemsolvingSkills = slicedArray;
        const pb = this.problemsolvingSkills[0]['answer'];
        switch (true) {
          case (pb >= 1 && pb <= 2):
            this.previouStatusPb = "Low Performer"
            break;
          case (pb > 2 && pb <= 3):
            this.previouStatusPb = "Inconsistent Performer"
            break;
          case (pb > 3 && pb <= 4):
            this.previouStatusPb = "Successful"
            break;
          case (pb > 4 && pb <= 5):
            this.previouStatusPb = "Outstanding"
            break;
          default:
            break;
        }
      })
    this.filterDeptTitlesArray.includes("Leadership")
    this.goalsService.getRatingsByEmployeeAndCategory(this.id, "Leadership")
      .subscribe((res) => {
        const slicedArray = res.slice(0, this.nrOfItemsSlice);
        this.leadershipSkills = slicedArray;
        const le = this.leadershipSkills[0]['answer'];
        switch (true) {
          case (le >= 1 && le <= 2):
            this.previouStatusLe = "Low Performer"
            break;
          case (le > 2 && le <= 3):
            this.previouStatusLe = "Inconsistent Performer"
            break;
          case (le > 3 && le <= 4):
            this.previouStatusLe = "Successful"
            break;
          case (le > 4 && le <= 5):
            this.previouStatusLe = "Outstanding"
            break;
          default:
            break;
        }
      })
  }

  getRecentCategoriesAndRatings() {
    this.id = this.route.snapshot.params['id'];
    this.goalsService.getCategories().
      subscribe((res) => {
        this.categories = res;
        this.filterDeptTitlesArray2 = res.map((obj: { categoriesDescription: any; }) => obj.categoriesDescription);
      })
    this.filterDeptTitlesArray2.includes("Communication")
    this.goalsService.getRatingsByEmployeeAndCategory(this.id, "Communication")
      .subscribe((res) => {
        const slicedArray2 = res.slice(1, this.nrOfItemsSlice2);
        this.communicationSkills2 = slicedArray2;
        const com2 = this.communicationSkills2[0]['answer'];
        switch (true) {
          case (com2 >= 1 && com2 <= 2):
            this.recentStatusCom = "Low Performer"
            break;
          case (com2 > 2 && com2 <= 3):
            this.recentStatusCom = "Inconsistent Performer"
            break;
          case (com2 > 3 && com2 <= 4):
            this.recentStatusCom = "Successful"
            break;
          case (com2 > 4 && com2 <= 5):
            this.recentStatusCom = "Outstanding"
            break;
          default:
            break;
        }
      })
    this.filterDeptTitlesArray2.includes("Interpersonal")
    this.goalsService.getRatingsByEmployeeAndCategory(this.id, "Interpersonal")
      .subscribe((res) => {
        const slicedArray2 = res.slice(1, this.nrOfItemsSlice2);
        this.interpersonalSkills2 = slicedArray2;
        const int2 = this.interpersonalSkills2[0]['answer'];
        switch (true) {
          case (int2 >= 1 && int2 <= 2):
            this.recentStatusInt = "Low Performer"
            break;
          case (int2 > 2 && int2 <= 3):
            this.recentStatusInt = "Inconsistent Performer"
            break;
          case (int2 > 3 && int2 <= 4):
            this.recentStatusInt = "Successful"
            break;
          case (int2 > 4 && int2 <= 5):
            this.recentStatusInt = "Outstanding"
            break;
          default:
            break;
        }
      })
    this.filterDeptTitlesArray2.includes("Problem Solving")
    this.goalsService.getRatingsByEmployeeAndCategory(this.id, "Problem Solving")
      .subscribe((res) => {
        const slicedArray2 = res.slice(1, this.nrOfItemsSlice2);
        this.problemsolvingSkills2 = slicedArray2;
        const pb2 = this.problemsolvingSkills2[0]['answer'];
        switch (true) {
          case (pb2 >= 1 && pb2 <= 2):
            this.recentStatusPb = "Low Performer"
            break;
          case (pb2 > 2 && pb2 <= 3):
            this.recentStatusPb = "Inconsistent Performer"
            break;
          case (pb2 > 3 && pb2 <= 4):
            this.recentStatusPb = "Successful"
            break;
          case (pb2 > 4 && pb2 <= 5):
            this.recentStatusPb = "Outstanding"
            break;
          default:
            break;
        }
      })
    this.filterDeptTitlesArray2.includes("Leadership")
    this.goalsService.getRatingsByEmployeeAndCategory(this.id, "Leadership")
      .subscribe((res) => {
        const slicedArray2 = res.slice(1, this.nrOfItemsSlice2);
        this.leadershipSkills2 = slicedArray2;
        const le2 = this.leadershipSkills2[0]['answer'];
        switch (true) {
          case (le2 >= 1 && le2 <= 2):
            this.recentStatusLe = "Low Performer"
            break;
          case (le2 > 2 && le2 <= 3):
            this.recentStatusLe = "Inconsistent Performer"
            break;
          case (le2 > 3 && le2 <= 4):
            this.recentStatusLe = "Successful"
            break;
          case (le2 > 4 && le2 <= 5):
            this.recentStatusLe = "Outstanding"
            break;
          default:
            break;
        }
      })
  }

  getAverageGoalRatings() {
    this.id = this.route.snapshot.params['id'];
    this.goalsService.getCategories().
      subscribe((res) => {
        this.categories = res;
        this.filterDeptTitlesArray = res.map((obj: { categoriesDescription: any; }) => obj.categoriesDescription);
      })
    this.filterDeptTitlesArray.includes("Communication")
    this.goalsService.getRatingsByEmployeeAndCategory(this.id, "Communication")
      .subscribe((res) => {
        const totalArray = res.slice(0, this.nrOfItemsSlice2);
        this.communicationSkillsTotal = totalArray;
        const firstValue = parseFloat((this.communicationSkillsTotal[0]['answer']).toFixed(1));
        const secondValue = parseFloat((this.communicationSkillsTotal[1]['answer']).toFixed(1));
        const total = (firstValue + secondValue) / 2;
        switch (true) {
          case (total >= 1 && total <= 2):
            this.totalRange = 2.0
            break;
          case (total > 2 && total <= 3):
            this.totalRange = 1.5
            break;
          case (total > 3 && total <= 4):
            this.totalRange = 0.5
            break;
          case (total > 4 && total <= 5):
            this.totalRange = 0.1
            break;
          default:
            break;
        }
        this.comAverageGoalRating = parseFloat((total + this.totalRange).toFixed(1));
        if (this.comAverageGoalRating === secondValue) {
          this.comGoalStatus = "Achieved"
        }
        else if (this.comAverageGoalRating !== secondValue) {
          this.comGoalStatus = "On a way"
        }
        switch (true) {
          case (firstValue === secondValue):
            this.comProgress = "Consistent";
            break;
          case (firstValue > secondValue):
            this.comProgress = "Trying to increase";
            break;
          case (firstValue < secondValue):
            this.comProgress = "Increase";
            break;
          default:
            break;
        }
      })
    this.filterDeptTitlesArray.includes("Interpersonal")
    this.goalsService.getRatingsByEmployeeAndCategory(this.id, "Interpersonal")
      .subscribe((res) => {
        const totalArray = res.slice(0, this.nrOfItemsSlice2);
        this.interpesronalSkillsTotal = totalArray;
        const firstValue = parseFloat((this.interpesronalSkillsTotal[0]['answer']).toFixed(2));
        const secondValue = parseFloat((this.interpesronalSkillsTotal[1]['answer']).toFixed(2));
        const total = (firstValue + secondValue) / 2;
        switch (true) {
          case (total >= 1 && total <= 2):
            this.totalRange = 2.0
            break;
          case (total > 2 && total <= 3):
            this.totalRange = 1.5
            break;
          case (total > 3 && total <= 4):
            this.totalRange = 0.5
            break;
          case (total > 4 && total <= 5):
            this.totalRange = 0.1
            break;
          default:
            break;
        }
        this.intAverageGoalRating = parseFloat((total + this.totalRange).toFixed(1));
        if (this.intAverageGoalRating === secondValue) {
          this.intGoalStatus = "Achieved"
        }
        else if (this.intAverageGoalRating !== secondValue) {
          this.intGoalStatus = "On a way"
        }
        switch (true) {
          case (firstValue === secondValue):
            this.intProgress = "Consistent";
            break;
          case (firstValue > secondValue):
            this.intProgress = "Trying to increase";
            break;
          case (firstValue < secondValue):
            this.intProgress = "Increase";
            break;
          default:
            break;
        }
      })
    this.filterDeptTitlesArray.includes("Problem Solving")
    this.goalsService.getRatingsByEmployeeAndCategory(this.id, "Problem Solving")
      .subscribe((res) => {
        const totalArray = res.slice(0, this.nrOfItemsSlice2);
        this.problemSolvingSkillsTotal = totalArray;
        const firstValue = parseFloat((this.problemSolvingSkillsTotal[0]['answer']).toFixed(2));
        const secondValue = parseFloat((this.problemSolvingSkillsTotal[1]['answer']).toFixed(2));
        const total = (firstValue + secondValue) / 2;
        switch (true) {
          case (total >= 1 && total <= 2):
            this.totalRange = 2.0
            break;
          case (total > 2 && total <= 3):
            this.totalRange = 1.5
            break;
          case (total > 3 && total <= 4):
            this.totalRange = 0.5
            break;
          case (total > 4 && total <= 5):
            this.totalRange = 0.1
            break;
          default:
            break;
        }
        this.pbAverageGoalRating = parseFloat((total + this.totalRange).toFixed(1));
        if (this.pbAverageGoalRating === secondValue) {
          this.pbGoalStatus = "Achieved"
        }
        else if (this.pbAverageGoalRating !== secondValue) {
          this.pbGoalStatus = "On a way"
        }
        switch (true) {
          case (firstValue === secondValue):
            this.pbProgress = "Consistent";
            break;
          case (firstValue > secondValue):
            this.pbProgress = "Trying to increase";
            break;
          case (firstValue < secondValue):
            this.pbProgress = "Increase";
            break;
          default:
            break;
        }
      })
    this.filterDeptTitlesArray.includes("Leadership")
    this.goalsService.getRatingsByEmployeeAndCategory(this.id, "Leadership")
      .subscribe((res) => {
        const totalArray = res.slice(0, this.nrOfItemsSlice2);
        this.leadershipSkillsTotal = totalArray;
        const firstValue = parseFloat((this.leadershipSkillsTotal[0]['answer']).toFixed(2));
        const secondValue = parseFloat((this.leadershipSkillsTotal[1]['answer']).toFixed(2));
        const total = (firstValue + secondValue) / 2;
        switch (true) {
          case (total >= 1 && total <= 2):
            this.totalRange = 2.0
            break;
          case (total > 2 && total <= 3):
            this.totalRange = 1.5
            break;
          case (total > 3 && total <= 4):
            this.totalRange = 0.5
            break;
          case (total > 4 && total <= 5):
            this.totalRange = 0.1
            break;
          default:
            break;
        }
        this.leAverageGoalRating = parseFloat((total + this.totalRange).toFixed(1));
        if (this.leAverageGoalRating === secondValue) {
          this.leGoalStatus = "Achieved"
        }
        else if (this.leAverageGoalRating !== secondValue) {
          this.leGoalStatus = "On a way"
        }
        switch (true) {
          case (firstValue === secondValue):
            this.leProgress = "Consistent";
            break;
          case (firstValue > secondValue):
            this.leProgress = "Trying to increase";
            break;
          case (firstValue < secondValue):
            this.leProgress = "Increase";
            break;
          default:
            break;
        }
      })
  }

  getRatingcScales() {
    this.goalsService.getRatingcScales()
      .subscribe(res => {
        this.dataSource4.data = res;
      })
  }

}


