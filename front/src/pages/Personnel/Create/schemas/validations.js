import * as Yup from 'yup';
import checkout from './form';

const {
  formField: {
    name,
    dpi,
    phone,
    email,
    role,
    boss,
    hired,
    hired_date,
  },
} = checkout;

const validations = Yup.object().shape({
  [name.name]: Yup.string() ,
  [dpi.name]: Yup.string() ,
  [phone.name]: Yup.string()  ,
  [email.name]: Yup.string()  ,
  [role.name]: Yup.string(),
  [boss.name]: Yup.string()  ,
  [hired.name]: Yup.string()  ,
  [hired_date.name]: Yup.string()  ,
  
});

export default validations;
