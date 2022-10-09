import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public employees?: Employee[];
  public employeeAll?: Employee[];
  public updateEmployee?: Employee;
  public deleteEmployee?: Employee;

  constructor(private employeeService: EmployeeService){}

  ngOnInit(){
    this.getEmployees();
  }

  public getEmployees(): void{
    this.employeeService.getEmployee().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        this.employeeAll = this.employees;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onAddEmployee(addEmployee: NgForm): void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addEmployee.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees(); // Refresh list
      },
      (error: HttpErrorResponse) => {alert(error.message)}
    );
  }

  public onUpdateEmployee(editEmployee: Employee): void{
    document.getElementById('edit-employee-form')?.click();
    this.employeeService.updateEmployee(editEmployee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees(); // Refresh list
      },
      (error: HttpErrorResponse) => {alert(error.message)}
    );
  }

  public onDeleteEmployee(idEmployee: number): void{
    document.getElementById('delete-employee-form')?.click();
    this.employeeService.deleteEmployee(idEmployee).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees(); // Refresh list
      },
      (error: HttpErrorResponse) => {alert(error.message)}
    );
  }

  public findEmployee(key: string): void{
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employeeAll!) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (key.length === 0) {
      this.getEmployees();
    }
  }

  private onActionButton(employee: Employee | null, mode:string): void{
    console.log(employee);
    switch (mode){
      case "updateEmployeeModal":
        this.updateEmployee = employee!;
      break;
      case "deleteEmployeeModal":
        this.deleteEmployee = employee!;
      break;
    }
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    this.onActionButton(employee, mode);
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', `#${mode}`);
    container?.appendChild(button);
    button.click();
  }

}
