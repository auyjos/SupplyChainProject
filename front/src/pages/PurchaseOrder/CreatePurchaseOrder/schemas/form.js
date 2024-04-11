const form = {
    formId: "new-po-form",
    formField: {
        addressedTo: {
            name: "addressedTo",
            label: "Addressed to",
            type: "text",
            errorMsg: "Campo requerido",
        },
        orderFrom: {
            name: "orderFrom",
            label: "Order from",
            type: "text",
            errorMsg: "Campo requerido",
        },
        shipTo: {
            name: "shipTo",
            label: "Ship to",
            type: "text",
            errorMsg: "Campo requerido",
        },
        billTo: {
            name: "billTo",
            label: "Bill to",
            type: "text",
            errorMsg: "Campo requerido",
        },
        your_reference: {
            name: "your_reference",
            label: "Reference",
            type: "text",
            errorMsg: "Campo requerido",
        },
        ship_via: {
            name: "ship_via",
            label: "Ship via",
            type: "text",
            errorMsg: "Campo requerido",
        },
        pbh_contract: {
            name: "pbh_contract",
            label: "PBH No.",
            type: "text",
            errorMsg: "Campo requerido",
        },

        supplier: {
            name: "supplier",
            label: "Supplier",
            type: "text",
            errorMsg: "Campo requerido",
        },
        default_control_code: {
            name: "default_control_code",
            label: "Default Control Code",
            type: "text",
            errorMsg: "Campo requerido",
        },
        currency: {
            name: "currency",
            label: "Currency",
            type: "text",
            errorMsg: "Campo requerido",
        },
        default_expected_date: {
            name: "default_expected_date",
            label: "",
            type: "date",
            errorMsg: "Campo requerido",
        },
        aog: {
            name: "aog",
            label: "AOG",
            type: "date",
            errorMsg: "Campo requerido",
        },
        reference: {
            name: "reference",
            label: "Reference Correlative",
            type: "text",
            errorMsg: "Campo requerido",
        },
    }
}

export default form;