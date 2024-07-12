import { validationResult } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  // el req es lo que manda el usuario
  const errors = validationResult(req);
  // si la validacion no pasa salta el mensaje de error del post
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // si no hay errores continua
  next();
};
