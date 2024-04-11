const form = {
    formId: "new-po-detail-form",
    formField: {
        purchase_order: {
            name: "purchase_order",
            label: "Purchase Order",
            type: "text",
            errorMsg: "Campo requerido",
        },
        inventory: {
            name: "inventory",
            label: "Inventory",
            type: "text",
            errorMsg: "Campo requerido",
        },

        description: {
            name: "description",
            label: "Description",
            type: "text",
            errorMsg: "Campo requerido",
        },
        cc: {
            name: "cc",
            label: "C.C",
            type: "text",
            errorMsg: "Campo requerido",
        },
        condition: {
            name: "condition",
            label: "Condition",
            type: "text",
            errorMsg: "Campo requerido",
        },
        u_m: {
            name: "u_m",
            label: "U/M",
            type: "text",
            errorMsg: "Campo requerido",
        },

        qty: {
            name: "qty",
            label: "QTY",
            type: "number",
            errorMsg: "Campo requerido",
        },
        quote: {
            name: "quote",
            label: "Un. Price",
            type: "number",
            errorMsg: "Campo requerido",
        },
        disc: {
            name: "disc",
            label: "Disc.",
            type: "number",
            errorMsg: "Campo requerido",
        },
        net: {
            name: "net",
            label: "Net Price",
            type: "number",
            errorMsg: "Campo requerido",
        },
        total: {
            name: "total",
            label: "Total",
            type: "number",
            errorMsg: "Campo requerido",
        },
    }
}
export default form;