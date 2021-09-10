import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, LoginResponse } from 'src/app/utils/interfaces';
import { environment } from 'src/environments/environment';
import { User } from '../../utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Constante privada y de solo lectura para asegurar la key con que se guardará el token en Sesion Storage
  private readonly tokenSesionStorage = 'token';
  
  // Constante para asegurar que los datos del usuario siempre tengan el mimso key en el sesion storage
  private readonly userSesionStorage = 'user';

  constructor(
    private http: HttpClient
  ) { }

  public get getToken(): string | null{
    return localStorage.getItem(this.tokenSesionStorage);
  }

  public setToken( token: any ): void {
    localStorage.setItem(this.tokenSesionStorage, token);
  }


  public removeToken(){
    localStorage.removeItem(this.tokenSesionStorage);
  }

  public get getDataUser(): User{
    const dataSS: User | any= localStorage.getItem(this.userSesionStorage)
    return JSON.parse(dataSS);
  }

  public setDataUser( user: User ): void {
    localStorage.setItem(this.userSesionStorage, JSON.stringify(user));
  }


  public removeDataUser(){
    localStorage.removeItem(this.userSesionStorage);
  }

  public signIn( loginData: LoginData ): Promise<LoginResponse>{
    return this.http.post<LoginResponse>(
      `${environment.host}/auth/login`,
      loginData
    ).toPromise()
  }


  public signUp( reisterData: User ): Promise<LoginResponse>{
    return this.http.post<LoginResponse>(
      `${environment.host}/users/register`,
      reisterData
    ).toPromise()
  }



}
