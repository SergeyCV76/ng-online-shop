import { Component, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  ReactiveFormsModule,
  FormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { user } from '../../models/user';
import { DataService } from '../../services/data.service';
import { catchError, of, Subscription } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-user-login',
  imports: [
    CommonModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss',
})
export class UserLoginComponent implements OnInit, OnDestroy {
  public data: user = new user();
  private userSubscription: Subscription | undefined;
  private allUserSubscription: Subscription | undefined;
  public incorrectlogin: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UserLoginComponent>,
    private dataService: DataService
  ) {}

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public myFormLoginPass: UntypedFormGroup = new UntypedFormGroup({
    username: new UntypedFormControl(
      this.data?.username ?? '',
      Validators.required
    ),
    password: new UntypedFormControl(
      this.data?.password ?? '',
      Validators.required
    ),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.myFormLoginPass.disable();

    this.data = {
      username: this.myFormLoginPass.value.username,
      password: this.myFormLoginPass.value.password,
      token: '',
      id: 0,
    };

    this.allUserSubscription = this.dataService
      .getAllUser()
      .subscribe((response) => {
        const userSearch = response.filter(
          (data) => data.username === this.data.username
        );
        if (userSearch.length > 0) {
          this.data.id = userSearch[0].id;
        } else {
          console.log('User is not registered');
        }
      });

    this.userSubscription = this.dataService.userlogin(this.data).subscribe(
      (response) => {
        this.data.token = response.token;
        this.dataService.setCurrentUser(this.data);
        this.dialogRef.close(this.data);
      },
      (error) => {
        this.incorrectlogin = true;
        this.myFormLoginPass.enable();
      }
    );
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe;
    if (this.allUserSubscription) this.allUserSubscription.unsubscribe;
  }
}
