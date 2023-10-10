import 'text-encoding-polyfill'
import Joi from "joi";

export const schemaProduit = Joi.object({ 
      nom: Joi.string()
          .min(1)
          .max(100)
          .regex(/^[^</>]*$/)
          .required(),

      description: Joi.string()
          .min(1)
          .max(255)
          .regex(/^[^</>]*$/)
          .required(),
      
      image: Joi.string()
          .min(1)
          .max(255)
          .required(),

      auteur: Joi.string()
          .min(1)
          .max(255)
          .required(),
          
      dt_creation: Joi.string()
          .min(1)
          .max(255)
          .required(),
});
