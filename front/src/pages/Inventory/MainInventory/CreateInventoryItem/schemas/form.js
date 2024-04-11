const form = {
    formId: "new-inventory-form",
    formField: {
        part_id: {
            name: "part_id",
            label:"Part Number",
            type:"text",
            errorMsg:"Campo requerido"
        },
        make: {
            name: "make",
            label:"Make",
            type:"text",
            errorMsg:"Campo requerido"
        },
        nsn: {
            name: "nsn",
            label:"NSN",
            type:"text",
            errorMsg:"Campo requerido"
        },
        market_price: {
            name: "market_price",
            label:"Cost",
            type:"text",
            errorMsg:"Campo requerido"
        },
        list_price: {
            name: "list_price",
            label:"List Price",
            type:"text",
            errorMsg:"Campo requerido"
        },
        supplier: {
            name: "supplier",
            label:"Pref. Supp.",
            type:"text",
            errorMsg:"Campo requerido"
        },

        description: {
            name: "description",
            label:"Desc.",
            type:"text",
            errorMsg:"Campo requerido"
        },
        model: {
            name: "model",
            label:"Model",
            type:"text",
            errorMsg:"Campo requerido"
        },
        location: {
            name: "location",
            label:"Location",
            type:"text",
            errorMsg:"Campo requerido"
        },
        tariff_code: {
            name: "tariff_code",
            label:"Tariff Code",
            type:"text",
            errorMsg:"Campo requerido"
        },

        min_amount: {
            name: "min_amount",
            label:"Min Qty",
            type:"text",
            errorMsg:"Campo requerido"
        },
        max_amount: {
            name: "max_amount",
            label:"Max Qty",
            type:"text",
            errorMsg:"Campo requerido"
        },
        amount: {
            name: "amount",
            label:"Total Qty",
            type:"text",
            errorMsg:"Campo requerido"
        },
        type: {
            name: "type",
            label:"Type",
            type:"text",
            errorMsg:"Campo requerido"
        },
        u_m: {
            name: "u_m",
            label:"U/M",
            type:"text",
            errorMsg:"Campo requerido"
        },
        weight: {
            name: "weight",
            label:"Weight",
            type:"text",
            errorMsg:"Campo requerido"
        },
        weight_type: {
            name: "weight_type",
            label:"Weight Type",
            type:"text",
            errorMsg:"Campo requerido"
        },

        note: {
            name: "note",
            label:"Note",
            type:"text",
            errorMsg:"Campo requerido"
        },
        instalation_note: {
            name: "instalation_note",
            label:"Note at Installation",
            type:"text",
            errorMsg:"Campo requerido"
        },
        serialized: {
            name: "serialized",
            label:"Serialized",
            type:"text",
            errorMsg:"Campo requerido"
        },
        life_limited: {
            name: "life_limited",
            label:"Life Limited",
            type:"text",
            errorMsg:"Campo requerido"
        },
        utilization: {
            name: "utilization",
            label:"Utilization",
            type:"text",
            errorMsg:"Campo requerido"
        },
        
    },
}

export default form;