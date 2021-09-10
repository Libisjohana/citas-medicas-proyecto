import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { LoginData, User } from '../../../utils/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  // Formulario
  registerForm: FormGroup

  // Variable para saber cuando se está cargando el login
  isLoading: boolean = false;

  private readonly idRolePaciente = '61198224422cc048acf62bc5';

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
    this.registerForm = this.fb.group({
      nid: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      nacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      telefono: ['', Validators.required],
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
    const registerForm: User = this.registerForm.getRawValue();
    registerForm.rol = this.idRolePaciente;
    // Creamos un try catch para capturar posibles errores
    try {
      const response = await this._authService.signUp( registerForm );
      this._snackBar.open(
        response.detalle,
        'X',
        {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5000
        }
      )
      // Deshabilitamos la bandera de cargando
      this.isLoading = false;
      // Redirigimos a Login
      this.router.navigateByUrl('account/sign-in');
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
