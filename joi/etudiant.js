import 'text-encoding-polyfill'
import Joi from "joi";

export const schemaEtudiant = Joi.object({ 
    nom: Joi.string().min(3).max(255).required(),
    age: Joi.number().min(1).max(120).required(),
    email : Joi.string()
          .min(4)
          .max(255)
          .email({ tlds: { allow: false } })
          .required()
});