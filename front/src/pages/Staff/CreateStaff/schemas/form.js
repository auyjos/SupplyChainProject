const form = {
    formId: "new-staff-form",
    formField: {
        name: {
            name: "name",
            label:"Nombre de Staff",
            type:"text",
            errorMsg:"Campo requerido"
        },
        authorization: {
            name: "authorization",
            label:"No. de Autorizacion",
            type:"text",
            errorMsg:"Campo requerido"
        },
        initial: {
            name: "initial",
            label:"Inicial",
            type:"text",
            errorMsg:"Campo requerido"
        }
    },
}

export default form;