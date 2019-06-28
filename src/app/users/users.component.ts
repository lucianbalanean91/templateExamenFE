import { Component, OnInit } from '@angular/core';
import { RootService } from 'src/app/services/root.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public history: any = null;
  public users: any = null;
  public displayedColumns: string[] =
   ['id','username', 'email','userRole','edit'];
   public displayedColumnsHistory: string[] =
   ['username', 'userRoleName', 'startTime', 'endTime'];
   selectedTrainer: User;
   usersPanel = false;
   historyPanel = false;


  constructor(private rootService: RootService) {
     this.getAllUsers();
    }

  ngOnInit() {
    this.usersPanel = true;
  }

  getAllUsers() {
      // this.users = []
    
      this.rootService.getAllUsers().subscribe(u => {
        this.users = u;
        console.log(u);
      });
  
  }
  showHistory(x: number) {
    this.usersPanel = false;
    this.historyPanel = true;
    this.rootService.getUserHistory(x).subscribe(h => {
      this.history = h;
      console.log(h);
    });
  }
  cancelEdit(){
    this.usersPanel = true;
    this.historyPanel = false;
    this.selectedTrainer = null;
  }

}
