import { ReviewInvitation } from './../home/home.component';
import { CreateReviewService } from './../service/create--review.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { GoalsService } from '../service/goals.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { distinct } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../service/employees.service';

@Component({
  selector: 'app-fill-review',
  templateUrl: './fill-review.component.html',
  styleUrls: ['./fill-review.component.scss']
})
export class FillReviewComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  firstItem: any;
  name: any;
  surname: any;
  reviewName: any;
  employeesDetails: any;
  communicationElements: any;
  isLinear = false;
  data: any;
  reviewId!: 1;
  topItem = 1;

  sliderArray1: any = [];
  sliderArray2: any = [];
  sliderArray3: any = [];
  sliderArray4: any = [];

  newComArray: any = [];
  comUniqueByKey: any = [];

  newIntArray: any = [];
  intUniqueByKey: any = [];

  newPrbArray: any = [];
  prbUniqueByKey: any = [];

  newLshArray: any = [];
  lshUniqueByKey: any = [];
  intepersonalElements: any = [];
  problemSolvingElements: any = [];
  leadershipElements: any;
  categoriesOnReview: any = [];
  categories: any = [];
  newCategoriesOnReviewArray: any = [];
  comUniqueByKeyCategory: any = [];
  filterTitlesArray2: any;
  finalcategoriesOnReview: any;
  categoriesOnReviewIds: any = [];
  filterReviewQuestionsArray: [] = [];
  filterEmployeesArray: [] = [];

  skills: any;
  skillsQuestions: any;
  skillsQuestionsById: any;
  textLabel: any;
  filterTitlesArray: String[] = [];
  categoriesLabel: any;

  communication: any;
  interpersonal: any;
  problemSolving: any;
  leadership: any;

  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = [
    'value', 'definition'
  ];

  user_role: any;
  user_id: any;

  updateRatingValue1(data: any, index: any, reviewQuestionId: any, userId: any) {

    this.sliderArray1[index] = data.value

    this.communicationElements = {
      "answer": this.sliderArray1[index],
      "reviewQuestionId": reviewQuestionId,
      "employeeId": userId
    }

    this.newComArray.push(this.communicationElements)

    const key = 'reviewQuestionId'

    this.comUniqueByKey = [...new Map(this.newComArray.map((item: { [x: string]: any; }) =>
      [item[key], item])).values()];

  }

  updateRatingValue2(data: any, index: any, reviewQuestionId: any, userId: any) {

    this.sliderArray2[index] = data.value

    this.intepersonalElements = {
      "answer": this.sliderArray2[index],
      "reviewQuestionId": reviewQuestionId,
      "employeeId": userId
    }

    this.newIntArray.push(this.intepersonalElements)

    const key = 'reviewQuestionId'

    this.intUniqueByKey = [...new Map(this.newIntArray.map((item: { [x: string]: any; }) =>
      [item[key], item])).values()];

  }

  updateRatingValue3(data: any, index: any, reviewQuestionId: any, userId: any) {

    this.sliderArray3[index] = data.value

    this.problemSolvingElements = {
      "answer": this.sliderArray3[index],
      "reviewQuestionId": reviewQuestionId,
      "employeeId": userId
    }

    this.newPrbArray.push(this.problemSolvingElements)

    const key = 'reviewQuestionId'

    this.prbUniqueByKey = [...new Map(this.newPrbArray.map((item: { [x: string]: any; }) =>
      [item[key], item])).values()];

  }

  updateRatingValue4(data: any, index: any, reviewQuestionId: any, userId: any) {

    this.sliderArray4[index] = data.value

    this.leadershipElements = {
      "answer": this.sliderArray4[index],
      "reviewQuestionId": reviewQuestionId,
      "employeeId": userId
    }

    this.newLshArray.push(this.leadershipElements)

    const key = 'reviewQuestionId'

    this.lshUniqueByKey = [...new Map(this.newLshArray.map((item: { [x: string]: any; }) =>
      [item[key], item])).values()];

  }

  constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService, private goalsService: GoalsService, private createReviewService: CreateReviewService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
    this.user_role = localStorage.getItem("user_role")
    this.user_id = localStorage.getItem("user_id")
  }

  ngOnInit() : void {    
    this.reviewId = this.route.snapshot.params['reviewId'];
    let userId = this.route.snapshot.params['employeeId'];

    if (this.user_id === undefined || this.user_id != userId)
    {
      this.router.navigate(['login']);
    }
    else
    {
      this.router.navigate(['fillReview', this.reviewId, userId]);
    }
    this.getEmployeesData();
    this.getSkills();
    this.getCategoriesAndQuestions();
    this.getRatingsReviewValues();
    this.getCategoriesBasedOnReview();
  }

  getRatingsReviewValues() {
    this.goalsService.getRatingsReviewValues()
      .subscribe(res => {
        this.dataSource.data = res;
      })
  }

  getSkills() {
    this.goalsService.getCategories()
      .subscribe(res => {
        this.skills = res;
      })
  }

  getCategoriesAndQuestions() {
    this.goalsService.getCategoriesAndQuestions()
      .subscribe(res => {
        this.skillsQuestions = res;
      })
  }

  getEmployeesData() {
    this.reviewId = this.route.snapshot.params['reviewId'];
    this.createReviewService.getEmployeesDataforAnswersByReviewId(this.reviewId)
      .subscribe((res: any) => {

        this.employeesDetails = res;

        this.name = this.employeesDetails[0].name;
        this.surname = this.employeesDetails[0].surname;
        this.reviewName = this.employeesDetails[0].reviewName;

      })
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.reviewId = this.route.snapshot.params['reviewId'];
    this.textLabel = tabChangeEvent.tab.textLabel;
    this.createReviewService.getFillDataDetails(this.reviewId, this.textLabel)
      .subscribe((res: any) => {
        this.categoriesLabel = res;
        this.filterTitlesArray = res.map((obj: { categoryDescription: any; }) => obj.categoryDescription);
      })
    this.filterTitlesArray.includes("Communication")
    this.createReviewService.getFillDataDetails(this.reviewId, "Communication")
      .subscribe(res => {
        this.communication = res;
      })
    this.filterTitlesArray.includes("Interpersonal")
    this.createReviewService.getFillDataDetails(this.reviewId, "Interpersonal")
      .subscribe(res => {
        this.interpersonal = res;
      })
    this.filterTitlesArray.includes("Problem Solving")
    this.createReviewService.getFillDataDetails(this.reviewId, "Problem Solving")
      .subscribe(res => {
        this.problemSolving = res;
      })
    this.filterTitlesArray.includes("Leadership")
    this.createReviewService.getFillDataDetails(this.reviewId, "Leadership")
      .subscribe(res => {
        this.leadership = res;
      })
  }

  getCategoriesBasedOnReview() {
    this.reviewId = this.route.snapshot.params['reviewId'];
    this.createReviewService.getAllFillDataDetailsByReviewIdAndEmployeeId(this.reviewId,this.user_id)
      .subscribe(res => {
        res.map((element: any) => {
          let index = this.categories.indexOf(element.categoryDescription);
          if (index > -1) { }
          else {
            this.categories.push(element.categoryDescription)
          }
          this.categoriesOnReview = res;
          this.categoriesOnReview.forEach((element: any) => {
            this.categoriesOnReviewIds = element['reviewInvitationId']
          });
        });
      });
  }

  sendAnswer() {
    if (this.comUniqueByKey.length == 0 || this.intUniqueByKey.length == 0 || this.prbUniqueByKey.length == 0 || this.lshUniqueByKey.length == 0) {
      this._snackBar.open("Please give answers on all categories in order to complete this review", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, panelClass: ['red-snackbar'] })
    }
    else {
      this.comUniqueByKey.forEach((element: any, index: any) => {
        const allData = {
          "answer": element.answer,
          "reviewQuestionId": element.reviewQuestionId,
          "employeeId": element.employeeId
        }
        this.createReviewService.fillDataAnswers(allData).subscribe((res: any) => {
          this._snackBar.open("You have sucessfully completed this review. Thank you for taking your time.", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, panelClass: ['green-snackbar'] })
        });
      });

      this.intUniqueByKey.forEach((element: any, index: any) => {
        const allData = {
          "answer": element.answer,
          "reviewQuestionId": element.reviewQuestionId,
          "employeeId": element.employeeId
        }
        this.createReviewService.fillDataAnswers(allData).subscribe((res: any) => {
          this._snackBar.open("You have sucessfully completed this review. Thank you for taking your time.", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, panelClass: ['green-snackbar'] })
        });
      });

      this.prbUniqueByKey.forEach((element: any, index: any) => {
        const allData = {
          "answer": element.answer,
          "reviewQuestionId": element.reviewQuestionId,
          "employeeId": element.employeeId
        }
        this.createReviewService.fillDataAnswers(allData).subscribe((res: any) => {
          this._snackBar.open("You have sucessfully completed this review. Thank you for taking your time.", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, panelClass: ['green-snackbar'] })
        });
      });

      this.lshUniqueByKey.forEach((element: any, index: any) => {
        const allData = {
          "answer": element.answer,
          "reviewQuestionId": element.reviewQuestionId,
          "employeeId": element.employeeId
        }
        this.createReviewService.fillDataAnswers(allData).subscribe((res: any) => {
          this._snackBar.open("You have sucessfully completed this review. Thank you for taking your time.", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, panelClass: ['green-snackbar'] })
        });
      });

      let completedDate = new Date().toISOString().substring(0, 10);
      this.createReviewService.updateReviewInvitationStatusAndCompletedDate
        ("Close", completedDate, this.categoriesOnReviewIds)
        .subscribe((res: any) => {
        });
    }
  }

}
