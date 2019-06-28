import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RootService {
    // private tasksSubject: BehaviorSubject<any>;
    public users: any;



    constructor(private http: HttpClient) {
        // this.tasksSubject = new BehaviorSubject<any>(null);
    }



    getAllUsers() : Observable<any> {
        return this.http.get<any>(
            `https://localhost:44369/api/users`);

        // return this.http.get<any>(`https://localhost:44348/api/users`)
        //     .pipe(map(response => {
        //         this.users = response;
        //         this.usersSubject.next(this.users);
        //         return response;
        //     }));
    }

   
    getUserHistory(x: number): Observable<any> {
        return this.http.get<any>(
            `https://localhost:44369/api/users/` + x);
    }

 
}