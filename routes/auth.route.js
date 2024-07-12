import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validatorResultExpress.js";

const router = express.Router();

router.post(
  // ruta en la cual se va a hacer el metodo
  "/register",
  //   middleware que es el express validator, trim es para limpiar los espacios en blanco (hay que hacerlo antes de la validacion),
  // is email comprueba que tiene formato de email y normaliza el email
  [
    body("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    //   se pueden hacer varias validaciones con diferentes mensajes para un mismo campo
    body("password", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
    //   validacion personalizada
    body("password", "Las contraseñas no coinciden").custom(
      (value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error("No coinciden las contraseñas");
        }
        return value;
      }
    ),
  ],
  //   accede a el middleware de validacion
  validationResultExpress,
  //   accede al controllador de register
  register
);
router.post(
  "/login",
  [
    body("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);

export default router;
