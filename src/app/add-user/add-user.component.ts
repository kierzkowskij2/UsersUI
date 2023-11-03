import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';
import { Role } from '../model/role.model';
import { Label } from '../model/label.model';
import { Language } from '../model/language.model';

const language: Language = { id: "5ca493950d7cac452d10c22a", name: "fr-FR"} as Language
const labels: Label[] = [{id: "5fcf87651c32f90ce8dbcfb9", name: "Balitrand"} as Label ];
const departmentId: string = "5cc7790c4f3a516c41c493d0";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  form: FormGroup;
  currentUser: User | undefined;
  constructor(
    private dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService
  ) {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required)
    });
  }

  onSave() {
    let user = {} as User;
    const {firstName, lastName, email, password, role, username} = this.form.value;
    user.id = "1334535435";
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    //user.roles = [{name: role} as Role]; 
    user.roles = [{name: "PracticalTest"} as Role]; // hardcoded value, as I do not have dropdown with roles
    user.userName = username;
    user.departmentId = departmentId; // hardcoded value, as I do not have departments dropdown in my form
    user.labels = labels; // hardcoded value
    user.active = true;
    user.apiAccessAllowed = true;
    user.enabled = true;
    user.notify = true;
    user.language = language;
    user.tokenExpiration = 0;
    user.userPreferences = [];

    this.userService.createUser(user).subscribe((response: any) => {
      this.dialogRef.close(true);
    }, (error) => {
      console.log(error);
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}

// authorized call to User/Create endpoint with attached data does not work -> 
/*

RESPONSE:

{
  "success": false,
  "data": {
    "error": {
      "code": "UnhandledException",
      "message": "Error creating user."
    }
  },
  "message": {
    "text": "Error creating user.",
    "type": 3
  }
}

REQUEST:

curl -X 'POST' \
  'https://pimb2bqatesting-api.dev01.pimalion.cloud/app/User/Create' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcmFjdGljYWxUZXN0QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJwcmFjdGljYWxUZXN0QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjY0OTFiMGRhMWU2ZTc2ZjJiMjdjNTk4YSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlByYWN0aWNhbFRlc3QiLCJEZXBhcnRtZW50SWQiOiI1Y2M3NzkwYzRmM2E1MTZjNDFjNDkzZDAiLCJJc3N1ZWRBdCI6IjYzODM0NjM5MDkwMDYxMjY3MyIsIkxhYmVsQ29kZXMiOiJCQUwsQ0lGLFNBTCIsImV4cCI6MTY5OTA0Mjg5MCwiaXNzIjoiUGltYWxpb24uUHVibGlzaGluZy5BUEkiLCJhdWQiOiJQaW1hbGlvbi5QdWJsaXNoaW5nLkFQSSJ9.LVBGQ-ELxo_KQ1oaWi_AGels1d8lb9-DZogjb4mJ9FY' \
  -H 'Content-Type: application/json-patch+json' \
  -d '{
  "user": {
    "id": "6491b0da1e6e76f2b27c598a",
    "firstName": "test1",
    "lastName": "test1",
    "email": "jan@jan.com",
    "userName": "trefdsfdsfds",
    "active": true,
    "apiAccessAllowed": true,
    "roles": [
      {
        "name": "PracticalTest"
      }
    ],
    "labels": [
      {
        "id": "5fcf87651c32f90ce8dbcfb9",
        "name": "Balitrand"
      }
    ],
    "userPreferences": [
    ],
    "password": "Test123456",
    "departmentId": "5cc7790c4f3a516c41c493d0",
    "notify": true,
    "language": {
      "id": "5ca493950d7cac452d10c22a",
      "name": "fr-FR"
    },
    "enabled": true,
    "tokenExpiration": 0
  }
}'

*/