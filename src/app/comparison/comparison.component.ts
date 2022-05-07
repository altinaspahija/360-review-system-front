import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../service/employees.service';
import { GoalsService } from '../service/goals.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


export interface Skills {
  name: String;
  surname: String;
  categoryDescription: String,
  answer: Number,
}

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit, AfterViewInit {

  user_role: any;
  user_id: any;
  div1: boolean = false;
  div2: boolean = false;
  value: any;
  selected: any;
  employeeId: any;
  searchForm!: FormGroup;
  employeeName: any;
  id: any;
  skillsByEmployee: any;
  departmentArray: any;
  department: any;
  employees: any;
  filterDeptTitlesArray: String[] = [];
  employeeByDepartament: any;
  employee: any;

  displayedColumns: string[] = [
    'name', 'reviewName', 'createdDate', 'categoryDescription', 'answer'
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private route: ActivatedRoute, private goalsService: GoalsService, private employeeService: EmployeeService, private fb: FormBuilder) {
    this.user_role = localStorage.getItem("user_role")
    this.user_id = localStorage.getItem("user_id")
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      department: new FormControl(""),
      employeeByDep: new FormControl("", Validators.pattern('^[a-zA-Z ]+$')),
      employee: new FormControl("", Validators.pattern('^[a-zA-Z ]+$')),
    })

    this.getAllDepartments();
    this.getSkills();
    this.getSkillsByEmployee();
    this.getSkillsByEmployeeId();
  }

  getAllDepartments() {
    this.employeeService.getDepartments()
      .subscribe((res) => {
        this.departmentArray = res;
      })
  }

  getSelected(value: any) {
    let department = value.value.departmentTitle
    this.employeeByDepartament = []

    this.employeeService.getEmployeesByDepForReview(department)
      .subscribe((res) => {
        this.employeeByDepartament = res;
      })
  }

  getSelected2(value: any) {
    this.employeeId = value.value.userId
  }

  search() {
    if (this.div2 == true && this.div1 == false)
      this.getSkillsByEmployee();
    else if (this.div1 == true && this.div2 == false)
      this.getSkillsByEmployeeId();
  }

  clear() {
    this.searchForm.get('department')!.reset()
    this.searchForm.get('employee')!.reset()
    this.searchForm.get('employeeByDep')!.reset()
    this.getSkills();
  }

  searchEmployeeByDepartment() {
    this.div1 = true;
    this.div2 = false;
    this.getSkills();
  }

  searchEmployee() {
    this.div1 = false;
    this.div2 = true;
    this.getSkills();
  }

  getSkills() {
    this.goalsService.getSkills()
      .subscribe(res => {
        this.dataSource.data = res;
      })
  }

  getSkillsByEmployee() {
    const employee = this.searchForm.get('employee')!.value;
    this.goalsService.getSkillsByEmployee(employee)
      .subscribe(
        res => {
          if (res != null) {
            this.dataSource.data = res;
            this.dataSource.data.length > 1;
          }
          else {
            this.dataSource.data.length == 0;
          }
        })
  }

  getSkillsByEmployeeId() {
    this.goalsService.getSkillsByEmployeeId(this.employeeId)
      .subscribe(res => {
        this.dataSource.data = res;
      })
  }

}
