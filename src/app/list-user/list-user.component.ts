import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Language } from '../model/language.model';

// user for displaying sample data - it should be removed in 'real-life' scenario
const ELEMENT_DATA: User[] = [ 
  { 
    id: "1",
     email: 
     'test1@gmail.com', 
     firstName: "test1", 
     lastName: 'test1', 
     roles: [], 
     userName: 'test123', 
     password: '', 
     role: '', 
     departmentId: "5cc7790c4f3a516c41c493d0", 
     labels: [],
     userPreferences: [],
    active: true,
    apiAccessAllowed: true,
    enabled: true,
    language: {} as Language,
    notify: true,
    tokenExpiration: 0
    } as User,
];

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements AfterViewInit{
  displayedColumns = ['name', 'email', 'roles', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selectedElement: any;

  constructor(private userService: UserService, public dialog: MatDialog) { 
    this.refresh();
  }

  // TODO: If I had more time I would fix paginator look
  @ViewChild('paginator') paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // apply filter - it should filter by all columns
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refresh() {
    this.userService.getUsers().subscribe(response => {
      if(response.success) {
        //TODO: remove that workaround - issues with displaying single role from roles collection
        // it should display ex. control with list of roles (mostly one role is assigned to user - maybe it should be changed to role in api model?)
        let data: User[] = [];
        response.data.users.forEach((elem: User) => {
          elem.role = elem.roles[0].name;
          data.push(elem);
        });
        this.dataSource = new MatTableDataSource(response.data.users as User[]);
        this.dataSource.paginator = this.paginator;
      }
      else {
        console.log('cannot load users');
      }
    });
  }

  newUserClicked = () => {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '600px';

    this.dialog
      .open(AddUserComponent, dialogConfig)
      .afterClosed()
      .subscribe((isCreated: boolean) => {
        if (isCreated) {
          console.log('user created - refresh will be called');
          this.refresh();
        }
      });
  };

  edit(user: User) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '600px';
    dialogConfig.data = user.id;

    this.dialog
      .open(EditUserComponent, dialogConfig)
      .afterClosed()
      .subscribe((isUpdated: boolean) => {
        if (isUpdated) {
          console.log('user updated - refresh will be called');
          this.refresh();
        }
      });
  }

  delete(user:User) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = user.id;
    dialogConfig.width = '400px';

    this.dialog
    .open(DeleteUserComponent, dialogConfig)
    .afterClosed()
    .subscribe((isDeleted) => {
      if(isDeleted) {
        console.log('user deleted - refresh will be called');
        this.refresh();
      }
    });
  }
}