import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { LoginData } from '../../../utils/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {


  // Formulario
  loginForm: FormGroup

  // Variable para saber cuando se está cargando el login
  isLoading: boolean = false;

  /**
   * 
   * @param fb 
   */
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { 

    if(this._authService.getToken){
      this.router.navigateByUrl('main/citas');
    }

    this.loginForm = this.fb.group({
      correo: [null, [Validators.required, Validators.email]],
      contrasena: [null, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  /**
   * Metodo para cuando se hace login
   * @param event 
   */
  public async ngSubmit( event: Event ): Promise<void>{
    // Detenemos las acciones por defecto
    event.preventDefault();
    // Detenemos la propagación del evento
    event.stopPropagation();
    // Hablitamos la bandera de cargando
    this.isLoading = true;

    // Guardamos los datos del formulario
    const loginForm: LoginData = this.loginForm.getRawValue();

    // Creamos un try catch para capturar posibles errores
    try {
      const response = await this._authService.signIn( loginForm );
      const { token, usuario } = response;
      this._snackBar.open(
        response.detalle,
        'X',
        {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5000
        }
      )
      
      this._authService.setToken( token );
      this._authService.setDataUser( usuario );
      // Deshabilitamos la bandera de cargando
      this.isLoading = false;
      // Redirigimos al lugar que corresponde
      this.router.navigateByUrl('main/citas')
    } catch (error: any) {
      this._snackBar.open(
        error.error.detalle,
        'X',
        {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5000
        }
      )
      console.log(error);
      this.isLoading = false;
    }

  }
}
