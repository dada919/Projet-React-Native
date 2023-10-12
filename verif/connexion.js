import 'text-encoding-polyfill'
import Joi from "joi";

export const schemaConnexion = Joi.object({ 
    email: Joi.string()
          .min(4)
          .max(255)
          .email({ tlds: { allow: false } })
          .required(),

    password: Joi.string()
          .min(3)
          .max(42)
          .regex(/^[^</>]*$/)
          .required()
          .messages({
               "string.min": "le champ mot de passe doit contenir au minimum 3 caractères",
               "string.max": "le champ mot de passe ne peut contenir au maximum que 40 caractères",
               "string.pattern.base": "le champ mot de passe ne peut pas contenir de caractères spéciaux: < > /",
          })
});
