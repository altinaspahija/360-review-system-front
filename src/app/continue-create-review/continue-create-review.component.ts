import { Department } from './../employees/employees.component';
import { Review } from './../home/home.component';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, Form } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CreateReviewService } from '../service/create--review.service';
import { EmployeeService } from '../service/employees.service';
import { GoalsService } from '../service/goals.service';




@Component({
  selector: 'app-continue-create-review',
  templateUrl: './continue-create-review.component.html',
  styleUrls: ['./continue-create-review.component.scss']
})
export class ContinueCreateReviewComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  selectedValue: boolean = false;

  Checked: boolean = false;

  submitted = false;
  hide: boolean = true;
  hide2: boolean = true;
  show: boolean = false;
  createQuestionForm!: FormGroup;
  addQuestionForm1!: FormGroup;
  addQuestionForm2!: FormGroup;
  addQuestionForm3!: FormGroup;
  addQuestionForm4!: FormGroup;
  getEmployeesForm!: FormGroup;
  templateReviews: any;
  questionsByTemplate: any;
  templateReview: any;
  textLabel: any;
  categories: any;
  categoriesLabel: any;
  filterTitlesArray: String[] = [];
  categorySelected: any;
  questions: any;
  categoryCommunicationOnTabChange: any = [];
  categoryInterpersonalOnTabChange: any = [];
  categoryLeadershipOnTabChange: any = [];
  categoryProblemSolvingOnTabChange: any = [];
  allQuestions: any;

  communication: any;
  interpersonal: any;
  problemSolving: any;
  leadership: any;

  @Input() inputFromParent: any;

  topItem = 1;
  reviewId: any;
  reviewQuestions = [];
  iteration: any;
  departmentArray: any;
  allEmployees: any;
  employeeByDepartament: any;
  employeeId: any = [];
  employeeEmail: any = [];
  department: any;
  slicedArray: any;
  data: any;
  data2: any;
  listOfQuestions: any = [];
  user_role: any;
  user_id: any;

  constructor(private employeeService: EmployeeService, private goalsService: GoalsService, private createReviewService: CreateReviewService, private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) {
    this.getLastReviewId();
    this.user_role = localStorage.getItem("user_role")
    this.user_id = localStorage.getItem("user_id")
  }

  ngOnInit(): void {
    this.getCategories();
    this.getAllDepartments();

    this.createQuestionForm = this.fb.group({
      categoryId: new FormControl("", Validators.required),
      question: new FormControl("", Validators.required),
    }),
      this.addQuestionForm1 = this.fb.group({
        reviewId: new FormControl("", Validators.required),
        questionId: new FormControl("", Validators.required)
      });
    this.addQuestionForm2 = this.fb.group({
      reviewId: new FormControl("", Validators.required),
      questionId: new FormControl("", Validators.required)
    });
    this.addQuestionForm3 = this.fb.group({
      reviewId: new FormControl("", Validators.required),
      questionId: new FormControl("", Validators.required)
    });
    this.addQuestionForm4 = this.fb.group({
      reviewId: new FormControl("", Validators.required),
      questionId: new FormControl("", Validators.required)
    });
    this.getEmployeesForm = this.fb.group({
      reviewId: new FormControl("", Validators.required),
      department: new FormControl(""),
      employeeId: new FormControl("", Validators.required)
    })
  }

  getLastReviewId() {
    this.createReviewService.getReviewsIds()
      .subscribe((res) => {
        this.slicedArray = res.slice(0, this.topItem);
        this.reviewId = this.slicedArray;
      })
    return this.reviewId;
  }

  onChange1(isChecked: boolean, questionId: number) {
    this.getLastReviewId();
    if (isChecked) {
      this.addQuestionForm1.controls['reviewId'].setValue(this.reviewId[0]);
      this.addQuestionForm1.controls['questionId'].setValue(questionId);
      this.listOfQuestions.push(questionId)
      this.createReviewService.postReviewQuestionDetails(this.addQuestionForm1.value)
        .subscribe((res) => {
          this.data = res;
        })
    }
    else {
      const index = this.listOfQuestions.indexOf(questionId);
      if (index > -1) {
        this.listOfQuestions.splice(index, 1);
      }
      const id = this.data.reviewQuestionId
      this.createReviewService.deleteReviewQuestionDetails(id)
        .subscribe
        ((res) => { })
    }
    this.addQuestionForm1.controls['questionId'].setValue(this.listOfQuestions);
  }

  onChange2(isChecked: boolean, questionId: number) {
    this.getLastReviewId();
    if (isChecked) {
      this.addQuestionForm2.controls['reviewId'].setValue(this.reviewId[0]);
      this.addQuestionForm2.controls['questionId'].setValue(questionId);
      this.listOfQuestions.push(questionId)
      this.createReviewService.postReviewQuestionDetails(this.addQuestionForm2.value)
        .subscribe((res) => {
          this.data = res;
        })

    }
    else {
      const index = this.listOfQuestions.indexOf(questionId);
      if (index > -1) {
        this.listOfQuestions.splice(index, 1);
      }
      const id = this.data.reviewQuestionId
      this.createReviewService.deleteReviewQuestionDetails(id)
        .subscribe
        ((res) => {
        })
    }
    this.addQuestionForm2.controls['questionId'].setValue(this.listOfQuestions);
  }

  onChange3(isChecked: boolean, questionId: number) {
    this.getLastReviewId();
    if (isChecked) {
      this.addQuestionForm3.controls['reviewId'].setValue(this.reviewId[0]);
      this.addQuestionForm3.controls['questionId'].setValue(questionId);
      this.listOfQuestions.push(questionId)
      this.createReviewService.postReviewQuestionDetails(this.addQuestionForm3.value)
        .subscribe((res) => {
          this.data = res;
        })

    }
    else {
      const index = this.listOfQuestions.indexOf(questionId);
      if (index > -1) {
        this.listOfQuestions.splice(index, 1);
      }
      const id = this.data.reviewQuestionId
      this.createReviewService.deleteReviewQuestionDetails(id)
        .subscribe
        ((res) => {
        })
    }
    this.addQuestionForm3.controls['questionId'].setValue(this.listOfQuestions);
  }

  onChange4(isChecked: boolean, questionId: number) {
    this.getLastReviewId();
    if (isChecked) {
      this.addQuestionForm4.controls['reviewId'].setValue(this.reviewId[0]);
      this.addQuestionForm4.controls['questionId'].setValue(questionId);
      this.listOfQuestions.push(questionId)
      this.createReviewService.postReviewQuestionDetails(this.addQuestionForm4.value)
        .subscribe((res) => {
          this.data = res;
        })

    }
    else {
      const index = this.listOfQuestions.indexOf(questionId);
      if (index > -1) {
        this.listOfQuestions.splice(index, 1);
      }
      const id = this.data.reviewQuestionId
      this.createReviewService.deleteReviewQuestionDetails(id)
        .subscribe
        ((res) => {
        })
    }
    this.addQuestionForm4.controls['questionId'].setValue(this.listOfQuestions);
  }

  createQuestion() {
    this.submitted = true;
    if (this.createQuestionForm.valid) {
      this.createReviewService.createQuestionByCategory(this.createQuestionForm.value).pipe(take(1))
        .subscribe((res) => {
          this._snackBar.open("Question is added successfully", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, panelClass: ['green-snackbar'] })
        }
        );
      this.createQuestionForm.reset();
    }
    else if (!this.createQuestionForm.valid) {
      this._snackBar.open("Please fill data to add question", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, panelClass: ['red-snackbar'] })
    }
  }

  continueReview() {
    if (this.addQuestionForm1.valid || this.addQuestionForm2.valid || this.addQuestionForm3.valid || this.addQuestionForm4.valid) {
      this._snackBar.open("Questions selected successfully", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, panelClass: ['green-snackbar'] })
      this.hide = false;
      this.show = true;
      this.hide2 = false;
    }
    else {
      this._snackBar.open("Please select questions to add in review", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, panelClass: ['red-snackbar'] })
      this.hide = true;
      this.show = false;
      this.hide2 = true;
    }
  }


  getCategories() {
    this.goalsService.getAllCategoriesData()
      .subscribe((res: any) => {
        this.categories = res;
      })
  }


  tabChanged(tabChangeEvent: MatTabChangeEvent, indexOfTab:number): void {
    if(indexOfTab==2){
      this.categorySelected = tabChangeEvent.tab.textLabel;
    }
    switch (this.categorySelected) {
      case 'Communication':
        if (this.categoryCommunicationOnTabChange.length == 0) {
          this.createReviewService.getAllQuestionsByCategoryTitle(this.categorySelected)
            .subscribe((res: any) => {
              this.categoryCommunicationOnTabChange = res;
              this.categoryCommunicationOnTabChange.map(function (element: any) {
                element["isChecked"] = false
              })
            })
        }
        else {
          this.createReviewService.getAllQuestionsByCategoryTitle(this.categorySelected)
          .subscribe((res: any) => {
            this.categoryCommunicationOnTabChange = res;
         })
        }
        break;
      case 'Interpersonal':
        if (this.categoryInterpersonalOnTabChange.length == 0) {
          this.createReviewService.getAllQuestionsByCategoryTitle(this.categorySelected)
            .subscribe((res: any) => {
              this.categoryInterpersonalOnTabChange = res;
              this.categoryInterpersonalOnTabChange.map(function (element: any) {
                element["isChecked"] = false
              })
            })
        }
        else {
          this.createReviewService.getAllQuestionsByCategoryTitle(this.categorySelected)
          .subscribe((res: any) => {
            this.categoryInterpersonalOnTabChange = res;
         })
         }
        break;
      case 'Leadership':
        if (this.categoryLeadershipOnTabChange.length == 0) {
          this.createReviewService.getAllQuestionsByCategoryTitle(this.categorySelected)
            .subscribe((res: any) => {
              this.categoryLeadershipOnTabChange = res;
              this.categoryLeadershipOnTabChange.map(function (element: any) {
                element["isChecked"] = false
              })
            })
        }
        else {
          this.createReviewService.getAllQuestionsByCategoryTitle(this.categorySelected)
          .subscribe((res: any) => {
            this.categoryLeadershipOnTabChange = res;
         })
         }
        break;
      case 'Problem Solving':
        if (this.categoryProblemSolvingOnTabChange.length == 0) {
          this.createReviewService.getAllQuestionsByCategoryTitle(this.categorySelected)
            .subscribe((res: any) => {
              this.categoryProblemSolvingOnTabChange = res;
              this.categoryProblemSolvingOnTabChange.map(function (element: any) {
                element["isChecked"] = false
              })
            })
        }
        else { 
          this.createReviewService.getAllQuestionsByCategoryTitle(this.categorySelected)
          .subscribe((res: any) => {
            this.categoryProblemSolvingOnTabChange = res;
         })
        }
        break;
      default:
    }
    this.goalsService.getQuestionCategoriesByCategory(this.categorySelected)
      .subscribe(res => {
        this.questions = res
      })
  }

  getSelected(value: any) {
    let categoryId = value.value;
  }

  getAllDepartments() {
    this.employeeService.getDepartments()
      .subscribe((res: any) => {
        this.departmentArray = res;
      })
  }

  getAllEmployees() {
    this.allEmployees = []
    this.employeeService.getEmployeesForReview()
      .subscribe((res: any) => {
        this.allEmployees = res;
      })
  }

  getSelected2(value: any) {
    let department = value.value.departmentTitle

    if (department === 'Software Development')
      this.employeeService.getEmployeesByDepForReview("Software Development")
        .subscribe((res: any) => {
          this.employeeByDepartament = res;
        })
    else if (department === 'IT')
      this.employeeService.getEmployeesByDepForReview("IT")
        .subscribe((res: any) => {
          this.employeeByDepartament = res;
        })
    else if (department === 'Cloud')
      this.employeeService.getEmployeesByDepForReview("Cloud")
        .subscribe((res: any) => {
          this.employeeByDepartament = res;
        })
    else if (department === 'Engineering')
      this.employeeService.getEmployeesByDepForReview("Engineering")
        .subscribe((res: any) => {
          this.employeeByDepartament = res;
        })
  }

  sendEmailForReview() {
    this.employeeId.forEach((element: any) => {
      const sendReview = {
        "subject": "Revision Period - Fill the review",
        "message": "Dear employee," + '\n' + "It is the period of employees revision. Press the following button to fill the review.",
        "employeeId": element,
        "reviewId": this.reviewId[0],
        "status": "Open"
      }
      this.createReviewService.postReviewInvitation(sendReview)
        .subscribe((res: any) => {
        });
      this.employeeEmail.forEach((email: any) => {
        this.createReviewService.sendInvitation(sendReview, email)
          .subscribe((res: any) => {
          });
      })
      this._snackBar.open("Review inivitation was created and send via email successfully", "Close", { duration: 2000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, panelClass: ['green-snackbar'] })
    })
    this.createQuestionForm.reset();
    this.getEmployeesForm.reset();
    this.addQuestionForm1.reset();
    this.addQuestionForm2.reset();
    this.addQuestionForm3.reset();
    this.addQuestionForm4.reset();
    this.createReviewService.sendMessagetoReset(true);
    this.categoryCommunicationOnTabChange.map(function (element: any) {
      element["isChecked"] = false
    })
    this.categoryInterpersonalOnTabChange.map(function (element: any) {
      element["isChecked"] = false
    })
    this.categoryProblemSolvingOnTabChange.map(function (element: any) {
      element["isChecked"] = false
    })
    this.categoryLeadershipOnTabChange.map(function (element: any) {
      element["isChecked"] = false
    })

  }

  click(value: any, selected: boolean) {
    if (selected == true) {
      let index1 = this.employeeId.indexOf(value.userId);
      if (index1 > -1) {
      }
      else {
        this.employeeId.push(value.userId)
        this.employeeEmail.push(value.email)
      }
    }
    else {
      let index1 = this.employeeId.indexOf(value.userId);
      if (index1 > -1) {
        this.employeeId.splice(index1, 1);
        this.employeeEmail.splice(index1, 1);
      }
    }
    this.getEmployeesForm.controls['employeeId'].setValue(this.employeeId);
  }

  clearSearch() {
    this.getEmployeesForm.get('department')!.reset()
    this.getEmployeesForm.get('employeeId')!.reset()
    this.selectedValue = false;
  }

}
