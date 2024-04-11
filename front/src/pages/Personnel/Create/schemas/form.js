


const form = {
  formId: 'new-personnel-form',
  formField: {
    name: {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      errorMsg: 'Campo requerido',
    },
    dpi:{
      name: 'dpi',
      label: 'DPI',
      type: 'number',
      errorMsg: 'Campo requerido',
    },
    phone:{
      name: 'phone',
      label: 'No. Telefono',
      type: 'number',
      errorMsg: 'Campo requerido',
    },
    email:{
      name: 'email',
      label: 'Correo Electronico',
      type: 'text',
      errorMsg: 'Correo Invalido',
    },
    role: {
      name: 'role',
      label: 'Puesto',
      type: 'text',
      errorMsg: 'Puesto requerido',
    },
    boss: {
      name: 'boss',
      label: 'Jefe',
      type: 'text',
      errorMsg: 'Campo requerido',
    },
    hired: {
      name: 'hired',
      label: 'Contratado',
      type: 'text',
      errorMsg: 'Elegir una opcion',
    },
    hired_date: {
      name: 'hired_date',
      label: 'Fecha de Contratacion',
      type: 'date',
      errorMsg: 'Campo requerido',
    },
  },
};

// 

export default form;
