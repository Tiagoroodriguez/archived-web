import { z } from "zod";

export const registerSchema = z.object({
    nombre: z.string({
        required_error: "Debe ingresar un nombre"
    }),

    apellido: z.string({
        required_error: "Debe ingresar un apellido"
    }),

    email: z.string({
        required_error: "Debe ingresar un correo electronico"
    }).email({
        message: "El correo electronico no es valido" }),

    password: z.string({
        required_error: "Debe ingresar una contraseña"
    }).min(6, { message: "La contraseña debe tener minimo 6 caracteres" })
});

export const loginSchema = z.object({
    email: z.string({
        required_error: "Debe ingresar un correo electronico"
    }).email({
        message: "El correo electronico no es valido"
    }),

    password: z.string({
        required_error: "Debe ingresar una contraseña"
    }).min(6, {
        message: "La contraseña debe tener minimo 6 caracteres"  
    })
});