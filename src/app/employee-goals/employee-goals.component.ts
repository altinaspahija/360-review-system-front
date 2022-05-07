import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../service/employees.service';
import { GoalsService } from '../service/goals.service';

@Component({
  selector: 'app-employee-goals',
  templateUrl: './employee-goals.component.html',
  styleUrls: ['./employee-goals.component.scss']
})
export class EmployeeGoalsComponent implements OnInit {

  dataSource4 = new MatTableDataSource<any>();
  categories: any;
  filterDeptTitlesArray: String[] = [];
  filterDeptTitlesArray2: String[] = [];
  communicationSkills: any;
  previouStatusCom: any;
  nrOfItemsSlice = 1;
  nrOfItemsSlice2 = 2;
  interpersonalSkills: any;
  previouStatusInt: any;
  problemsolvingSkills: any;
  previouStatusPb: any;
  leadershipSkills: any;
  previouStatusLe: any;
  communicationSkills2: any;
  recentStatusCom: any;
  interpersonalSkills2: any;
  recentStatusInt: any;
  problemsolvingSkills2: any;
  recentStatusPb: any;
  leadershipSkills2: any;
  recentStatusLe: any;
  communicationSkillsTotal: any;
  totalRange: any;
  comAverageGoalRating: any;
  comGoalStatus: any;
  comProgress: any;
  interpesronalSkillsTotal: any;
  intAverageGoalRating: any;
  intGoalStatus: any;
  intProgress: any;
  problemSolvingSkillsTotal: any;
  pbAverageGoalRating: any;
  pbGoalStatus: any;
  pbProgress: any;
  leadershipSkillsTotal: any;
  leAverageGoalRating: any;
  leGoalStatus: any;
  leProgress: any;

  user_role: any;
  user_id: any;

  displayedColumns4: string[] = [
    'range', 'definition', 'description'
  ];

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

  constructor(private goalsService: GoalsService, private employeeService: EmployeeService) { 
    this.user_role = localStorage.getItem("user_role")
    this.user_id = localStorage.getItem("user_id")
  }

  ngOnInit(): void {
    this.getRecentCategoriesAndRatings();
    this.getPreviousCategoriesAndRatings();
    this.getAverageGoalRatings();
    this.getRatingcScales();
  }

  getRatingcScales() {
    this.goalsService.getRatingcScales()
      .subscribe((res: any) => {
        this.dataSource4.data = res;
      })
  }

  getPreviousCategoriesAndRatings() {
    this.goalsService.getCategories().
      subscribe((res: any) => {
        this.categories = res;
        this.filterDeptTitlesArray = res.map((obj: { categoriesDescription: any; }) => obj.categoriesDescription);
      })
    this.filterDeptTitlesArray.includes("Communication")
    this.goalsService.getRatingsByEmployeeAndCategory(this.user_id, "Communication")
      .subscribe((res: any) => {
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
    this.goalsService.getRatingsByEmployeeAndCategory(this.user_id, "Interpersonal")
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
    this.goalsService.getRatingsByEmployeeAndCategory(this.user_id, "Problem Solving")
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
    this.goalsService.getRatingsByEmployeeAndCategory(this.user_id, "Leadership")
      .subscribe((res) => {
        const slicedArray = res.slice(0, this.nrOfItemsSlice)
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
    this.goalsService.getCategories().
      subscribe((res) => {
        this.categories = res;
        this.filterDeptTitlesArray2 = res.map((obj: { categoriesDescription: any; }) => obj.categoriesDescription);
      })
    this.filterDeptTitlesArray2.includes("Communication")
    this.goalsService.getRatingsByEmployeeAndCategory(this.user_id, "Communication")
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
    this.goalsService.getRatingsByEmployeeAndCategory(this.user_id, "Interpersonal")
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
    this.goalsService.getRatingsByEmployeeAndCategory(this.user_id, "Problem Solving")
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
    this.goalsService.getRatingsByEmployeeAndCategory(this.user_id, "Leadership")
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
    this.goalsService.getCategories().
      subscribe((res) => {
        this.categories = res;
        this.filterDeptTitlesArray = res.map((obj: { categoriesDescription: any; }) => obj.categoriesDescription);
      })
    this.filterDeptTitlesArray.includes("Communication")
    this.goalsService.getRatingsByEmployeeAndCategory(this.user_id, "Communication")
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
        if (this.comAverageGoalRating >= secondValue) {
          this.comGoalStatus = "Achieved"
        }
        else if (this.comAverageGoalRating < secondValue) {
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
    this.goalsService.getRatingsByEmployeeAndCategory(this.user_id, "Interpersonal")
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
        if (this.intAverageGoalRating >= secondValue) {
          this.intGoalStatus = "Achieved"
        }
        else if (this.intAverageGoalRating < secondValue) {
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
    this.goalsService.getRatingsByEmployeeAndCategory(this.user_id, "Problem Solving")
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
        if (this.pbAverageGoalRating >= secondValue) {
          this.pbGoalStatus = "Achieved"
        }
        else if (this.pbAverageGoalRating < secondValue) {
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
    this.goalsService.getRatingsByEmployeeAndCategory(this.user_id, "Leadership")
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
        if (this.leAverageGoalRating >= secondValue) {
          this.leGoalStatus = "Achieved"
        }
        else if (this.leAverageGoalRating < secondValue) {
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

}
