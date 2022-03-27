import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable, tap } from "rxjs";
import { User } from "../interfaces";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token = ''

    register() {}

    constructor(private http: HttpClient) {
    }

    login(user: User): Observable<{token: string}> {
        return this.http.post<{token: string}>('/api/auth/login', user)
            .pipe(
                tap(
                    ({token}) => {
                        localStorage.setItem('auth-token', token)
                        this.setToken(token)
                    }
                )
            )
    }

    setToken(token: string) {
        this.token = token
    }

    getToken(token: string){
        return this.token
    }

    isAuthenticated(): boolean{
        return !! this.token
    }

    logout() {
        this.setToken('')
        localStorage.clear
    }
}