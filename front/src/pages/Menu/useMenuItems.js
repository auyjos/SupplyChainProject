
import { LineAxis } from "@mui/icons-material";
import { LINKS } from "../../type/globals";

const useMenuItem = () => {

    const menuItems = [];

    menuItems.push({title:"Clientes y Proveedores", icon:"weekend", link:LINKS.clandsu})
    menuItems.push({title:"Agregar Cliente", icon:"weekend", link:LINKS.clients_add})
    menuItems.push({title:"Agregar Proveedor", icon:"weekend", link:LINKS.suppliers_add})
    menuItems.push({title:"Agregar Piloto", icon:"weekend", link:LINKS.pilots_add})
    menuItems.push({title:"Agregar Nave", icon:"weekend", link:LINKS.shipments_add})
    menuItems.push({title:"Encuesta de Satisfaccion", icon:"weekend", link:LINKS.encuesta})
    menuItems.push({title:"Recepcion de Naves", icon:"weekend", link:LINKS.reception})
    menuItems.push({title:"Entrega de Naves", icon:"weekend", link:LINKS.deliver})
    menuItems.push({title:"Job Description", icon:"weekend", link:LINKS.job_desc})
    menuItems.push({title:"Certificaciones", icon:"weekend", link:LINKS.certifications})
    menuItems.push({title:"Ficha de Empleado", icon:"weekend", link:LINKS.employee_card})
    menuItems.push({title:"Evaluacion de Proveedores", icon:"weekend", link:LINKS.providers_evl})
    menuItems.push({title:"Definicion de procesos", icon:"weekend", link:LINKS.processes})

    return menuItems;

}

export default useMenuItem;