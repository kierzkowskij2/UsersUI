import { Component, Inject } from '@angular/core';
import { UserService } from '../service/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { Role } from '../model/role.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  form: FormGroup;
  currentUser: User | undefined;
  constructor(
    private dialogRef: MatDialogRef<EditUserComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) id: string,
  ) {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, null), // password is not required as I do not want to change other users passowrds as I do not know their passwords
      role: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required)
    });
    if(id) {
      this.userService.getUserById(id).subscribe((response: any)=>{
        if(response.success) {
          let user = response.data.user as User;
          this.currentUser = user;
          console.log(user);
          this.form.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password, // TODO: verify issues with no password -> propably it is on purpose, so we should not change different users passwords :)
            role: user.roles[0].name,
            username: user.userName,
          });
          this.form.markAsPristine();
        }
        else {
          console.log('getting user was not successful');
        }
      },
      (error)=>{
        console.log(error);
      });
    }
    else {
      this.dialogRef.close(false);
    }
  }

  onSave() {
    let user = this.currentUser as User;
    const {firstName, lastName, email, password, role, username} = this.form.value;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    //user.password = password; // TODO: as I do not get other user's password I will not try to change password for him
    user.roles = [{name: role} as Role];
    user.userName = username;

    this.userService.updateUser(user).subscribe((response: any) => {
      this.dialogRef.close(true);
    }, (error) => {
      console.log(error);
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}