import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnDestroy{
  private readonly _destroy$: Subject<boolean> = new Subject<boolean>();
  private _id: string | undefined;
  constructor(
    private dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) id: string,
    private userService: UserService
  ) {
    this._id = id;
    console.log(id);
  }

  deleteUser(): void {
    this.userService.deleteUser((this._id as string)).subscribe(()=>{
      this.dialogRef.close(true);
    },
    (error) => {
          console.error(error);
          this.dialogRef.close(false);
    });
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }
}