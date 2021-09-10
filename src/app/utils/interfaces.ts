export interface Rol {
    id?: number | string,
    nombre: string,
    descripcion: string,
}

export interface LoginData {
    correo: string,
    contrasena: string
}

export interface User {
    nid: string,
    rol: Rol | string,
    nombres: string,
    apellidos: string,
    nacimiento: Date,
    correo: string,
    contrasena?: string
    telefono: string,
}

export interface GeneralResponse {
    estado: string,
    mensaje: string,
    detalle: string
}

export interface LoginResponse {
    estado: string,
    mensaje: string,
    detalle: string
    usuario: User,
    token: string
}