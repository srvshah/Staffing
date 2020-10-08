import { Component, OnInit } from '@angular/core';
import { UserDetailService } from './user-detail.service';
import { MvUserDetail } from './user-detail.model';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'zen-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userMsg: string = null;
  displayedColumns: string[];
  dataSource: MvUserDetail[] = [];

  constructor(
    private userDetailService: UserDetailService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.displayedColumns = ['personId', 'username', 'password', 'firstName', 'middleName', 'lastName'];

    this.getUserDetail();

  }


  getUserDetail(): void{
    this.route.params.pipe(
      map(res => {
        const id = res.id;
        return id;
      }), mergeMap(id => this.userDetailService.getUser({personId: id}))
    ).subscribe(res => {
      if (res){
        this.dataSource = [res];
      }
      else {
        this.dataSource = [];
        this.userMsg = 'No data';
      }
    }, err => console.log(err));

  }

  getAllUsers(): void{
    this.userMsg = null;
    this.userDetailService.getAllUser().subscribe(res => {
      if (res && res.data){
        this.dataSource = res.data;
      } else {
        this.dataSource = [];
        this.userMsg = 'No data';
      }
    }, err => console.log(err));
  }

}
