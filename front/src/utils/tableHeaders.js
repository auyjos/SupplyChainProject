import Icon from "@mui/material/Icon";
import MDBox from "../components/MDBox";
import MDButton from "../components/MDButton";
import MDTypography from "../components/MDTypography";

import { getRolLabel } from "../Services/authService";

const statusCell = (icon, color, text) => {
  return (
    <MDBox display="flex" alignItems="center">
      <MDBox mr={1}>
        <MDButton
          variant="outlined"
          color={color}
          size="small"
          iconOnly
          circular
        >
          <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
        </MDButton>
      </MDBox>
      <MDTypography
        variant="caption"
        fontWeight="medium"
        color="text"
        sx={{ lineHeight: 0 }}
      >
        {text}
      </MDTypography>
    </MDBox>
  );
};

export const invoiceHeaders = () => {
  return [
    { Header: "No.", accessor: "id", width: "10%" },
    { Header: "NIT", accessor: "nit", width: "10%" },
    { Header: "Cliente", accessor: "name", width: "15%" },
    { Header: "Fecha", accessor: "date", width: "15%" },
    { Header: "Total", accessor: "total", width: "15%" },

  ];
};

export const personnelHeaders = () => {
  return [
    { Header: "No.", accessor: "id", width: "10%" },
    { Header: "Nombre", accessor: "name", width: "15%" },
    { Header: "DPI", accessor: "dpi", width: "15%" },
    { Header: "Puesto", accessor: "role", width: "15%" },
    { Header: "Jefe", accessor: "boss", width: "15%" },
    { Header: "Telefono", accessor: "phone", width: "15%" },
    { Header: "Email", accessor: "email", width: "20%" },
    {
      Header: "Contratado",
      accessor: "hired",
      width: "20%",
      Cell: ({ value }) => {
        return value
          ? statusCell("done", "success", "SI")
          : statusCell("close", "error", "NO");
      },
    },
    { Header: "Contratacion", accessor: "hired_date", width: "20%" },
    
  ];
};

export const receptionHeaders = () => {
  return [
    { Header: "No.", accessor: "id", width: "10%" },
    { Header: "Nave", accessor: "vehicle.registration", width: "20%" },
    { Header: "Creado", accessor: "updated_at", width: "20%" },
  ];
};

export const deliverHeaders = () => {
  return [
    { Header: "No.", accessor: "id", width: "10%" },
    { Header: "Nave", accessor: "vehicle.registration", width: "20%" },
    { Header: "Creado", accessor: "updated_at", width: "20%" },
    { Header: "Entregado a", accessor: "pilot.name+pilot.first_last_name", width: "20%" },

  ];
};

export const supplierHeaders = () => {
  return [
    { Header: "No.", accessor: "id", width: "10%" },
    { Header: "Compañia", accessor: "name", width: "12%" },
    { Header: "Direccion", accessor: "address", width: "15%" },
    { Header: "Codigo", accessor: "code", width: "12%" },
    { Header: "Contacto", accessor: "contact", width: "12%" },
    { Header: "Moneda", accessor: "currency", width: "12%" },
    { Header: "Telefono", accessor: "phone", width: "12%" },
    { Header: "Email", accessor: "email", width: "12%" },
  ];
};

// ------------------- Inventory

export const inventoryMainHeaders = () => {
  return [
    { Header: "Part Number", accessor: "part_id", width: "10%" },
    { Header: "Descripcion", accessor: "description", width: "20%" },
    { Header: "Modelo", accessor: "model", width: "15%" },
    { Header: "Tipo", accessor: "type", width: "15%" },
    { Header: "NSN", accessor: "nsn", width: "8%" },
    { Header: "Min", accessor: "min_amount", width: "8%" },
    { Header: "Max", accessor: "max_amount", width: "8%" },
  ];
};

export const inventorySecondHeaders = () => {
  return [
    { Header: "No.", accessor: "id", width: "5%" },
    { Header: "Traking", accessor: "tracker_id", width: "15%" },
    { Header: "Serial", accessor: "serial_number", width: "15%" },
    { Header: "Qty", accessor: "qty", width: "10%" },
    { Header: "Creacion", accessor: "creation_date", width: "15%" },
    { Header: "Base", accessor: "base", width: "10%" },
    { Header: "Freight", accessor: "freight", width: "5%" },
    { Header: "Proveedor", accessor: "supplier.Company", width: "10%" },
  ];
};

export const inventoryQuarantineHeaders = () => {
  return [
    { Header: "Part Number", accessor: "inventory.part_id", width: "20%" },
    { Header: "Descripcion", accessor: "inventory.description ", width: "20%" },
    { Header: "Traking", accessor: "tracker_id", width: "20%" },
    { Header: "Serial", accessor: "serial_number", width: "20%" },
    { Header: "Creacion", accessor: "creation_date", width: "10%" },
    { Header: "Tipo", accessor: "type", width: "10%" },
  ];
};

export const inventoryItems = () => {
  return [
    { Header: "Part Number", accessor: "inventory.part_id", width: "20%" },
    { Header: "Descripcion", accessor: "inventory.description ", width: "20%" },
    { Header: "Traking", accessor: "tracker_id", width: "20%" },
    { Header: "Serial", accessor: "serial_number", width: "20%" },
    { Header: "Creacion", accessor: "creation_date", width: "10%" },
    { Header: "Expiracion", accessor: "expiration_date", with: "10%" },
    { Header: "Tipo", accessor: "type", width: "10%" },
  ];
};

export const inventoryScrapHeaders = () => {
  return [
    { Header: "Part Number", accessor: "inventory.part_id", width: "10%" },
    { Header: "Descripcion", accessor: "inventory.description ", width: "20%" },
    { Header: "Traking", accessor: "tracker_id", width: "10%" },
    { Header: "Serial", accessor: "serial_number", width: "20%" },
    { Header: "Costo", accessor: "total_cost", width: "10%" },
    { Header: "Moneda", accessor: "currency", width: "10%" },
  ];
};

export const inventoryMissingExpiration = () => {
  return [
    { Header: "Part Number", accessor: "inventory.part_id", width: "15%" },
    { Header: "Descripcion", accessor: "inventory.description ", width: "25%" },
    { Header: "Traking", accessor: "tracker_id", width: "20%" },
    { Header: "Serial", accessor: "serial_number", width: "20%" },
    { Header: "Base", accessor: "base", width: "20%" },
  ];
};

// ------------------- PO
export const POHeaders = () => {
  return [
    { Header: "Prefix-PO #", accessor: "id", width: "10%" },
    { Header: "Date", accessor: "created_at", width: "20%" },
    { Header: "Supplier", accessor: "supplier.Company", width: "15%" },
    { Header: "Ref", accessor: "your_reference", width: "15%" },
    { Header: "Created By", accessor: "user.name", width: "15%" },
    {
      Header: "Locked",
      accessor: "locked",
      width: "20%",
      Cell: ({ value }) => {
        return value
          ? statusCell("lock", "error", "Yes")
          : statusCell("lockOpen", "success", "No");
      },
    },
  ];
};

export const PODetails = () => {
  return [
    { Header: "Part Number", accessor: "inventory.part_id", width: "10%" },
    { Header: "Description", accessor: "description", width: "20%" },
    { Header: "Cond.", accessor: "condition", width: "10%" },
    { Header: "QTY", accessor: "qty", width: "10%" },
    { Header: "Qty Received", accessor: "received_qty", width: "10%" },
    {
      Header: "Received",
      accessor: "received",
      width: "10%",
      Cell: ({ value }) => {
        return value
          ? statusCell("done", "success", "SI")
          : statusCell("close", "error", "NO");
      },
    },
    { Header: "Un. Price", accessor: "quote", width: "15%" },
    { Header: "Disc. %", accessor: "disc", width: "15%" },
    { Header: "Net Price", accessor: "net", width: "20%" },
  ];
};

export const PONotes = () => {
  return [
    { Header: "#", accessor: "id", width: "10%" },
    { Header: "Note", accessor: "note", width: "40%" },
    { Header: "Cost", accessor: "cost", width: "20%" },
  ];
};

// ------------------- Invoice

export const InvoiceHeaders = () => {
  return [
    { Header: "#", accessor: "id", width: "5%" },
    { Header: "Date", accessor: "created_at", width: "15%" },
    { Header: "Aircraft", accessor: "", width: "10%" },
    { Header: "Customer", accessor: "client.name", width: "30%" },
    { Header: "subject", accessor: "subject", width: "20%" },
  ];
};

export const headersManager = () => {
  return [
    { Header: "#", accessor: "id", width: "5%" },
    { Header: "Name", accessor: "client.name", width: "15%" },
    { Header: "Date", accessor: "", width: "10%" },
    { Header: "#", accessor: "client.names", width: "30%" },
    { Header: "Registration", accessor: "lo", width: "20%" },
    { Header: "WR#", accessor: "subjtoect", width: "20%" },
    { Header: "Closed", accessor: "subjasect", width: "20%" },
    { Header: "Authorization", accessor: "subjectad", width: "20%" },
    { Header: "Created By", accessor: "subjdect", width: "20%" },
  ];
};

export const laborHeaders = () => {
  return [
    { Header: "Date", accessor: "date", width: "20%" },
    { Header: "Empl.", accessor: "employee.name", width: "15%" },
    { Header: "Desc.", accessor: "description", width: "30%" },
    { Header: "Hrs", accessor: "hours", width: "10%" },
    { Header: "Rate", accessor: "rate", width: "10%" },
    { Header: "Total", accessor: "total", width: "10%" },
  ];
};

export const micsHeaders = () => {
  return [
    { Header: "Desc.", accessor: "description", width: "40%" },
    { Header: "QTY", accessor: "qty", width: "10%" },
    { Header: "Price", accessor: "price", width: "30%" },
  ];
};

// ------------------- Task
export const taskHeaders = () => {
  return [
    { Header: "No.", accessor: "id", width: "5%" },
    { Header: "ATTA", accessor: "ata_code", width: "15%" },
    { Header: "Description", accessor: "task_description", width: "45%" },
    { Header: "Conditional", accessor: "cond", width: "15%" },
    {
      Header: "Activo",
      accessor: "active",
      width: "10%",
    },
  ];
};

export const subTaskHeaders = () => {
  return [
    { Header: "No.", accessor: "id", width: "10%" },
    { Header: "ATTA", accessor: "ata", width: "25%" },
    { Header: "Description", accessor: "description", width: "50%" },
  ];
};

export const taskItemsHeaders = () => {
  return [
    {
      Header: "Traking",
      accessor: "inventory_detail.tracker_id",
      width: "15%",
    },
    {
      Header: "Serial",
      accessor: "inventory_detail.serial_number",
      width: "15%",
    },
    { Header: "Qty", accessor: "inventory_detail.qty", width: "10%" },
    {
      Header: "Creacion",
      accessor: "inventory_detail.creation_date",
      width: "15%",
    },
    { Header: "Base", accessor: "inventory_detail.base", width: "10%" },
    { Header: "Freight", accessor: "inventory_detail.freight", width: "5%" },
    {
      Header: "Proveedor",
      accessor: "inventory_detail.supplier.name",
      width: "10%",
    },
  ];
};

// ------------------- Ships

export const shipsHeaders = () => {
  return [
    { Header: "No.", accessor: "id", width: "15%" },
    { Header: 'Registro', accessor: 'registration', width: '15%' },
    { Header: "Modelo", accessor: "model", width: "20%" },
    //{ Header: 'Serial', accessor: 'serial_number', width: '15%' },
    //{ Header: 'Year', accessor: 'year', width: '10%' },
    { Header: "Cliente", accessor: "client.name", width: "30%" },
  ];
};

export const pilotsHeaders = () => {
  return [
    { Header: "No.", accessor: "id", width: "15%" },
    { Header: 'Nombre', accessor: 'first_name', width: '15%' },
    { Header: "Apellido", accessor: "first_last_name", width: "20%" },
    { Header: 'Email', accessor: 'email', width: '15%' },
    { Header: 'Telefono', accessor: 'phone', width: '10%' },
    //{ Header: "Cliente", accessor: "client.name", width: "30%" },
  ];
};

export const shipPartsHeaders = () => {
  return [
    { Header: "No.", accessor: "inventory_detail.id", width: "15%" },
    // { Header: "Ship", accessor:'ship.id'  , width: "15%" },
    {
      Header: "Part Id",
      accessor: "inventory_detail.inventory.name",
      width: "15%",
    },
    {
      Header: "Serial",
      accessor: "inventory_detail.serial_number",
      width: "15%",
    },
    // { Header: "Instalation Date", accessor:'instalation_date'  , width: "15%" },
  ];
};

export const shipAssemblyHeaders = () => {
  return [
    { Header: "No.", accessor: "id", width: "15%" },
    { Header: "Status", accessor: "status", width: "15%" },
    { Header: "Component", accessor: "component_name", width: "15%" },
    { Header: "ATA Code", accessor: "ata_code", width: "15%" },
    { Header: "Action", accessor: "action", width: "15%" },
    { Header: "Make", accessor: "make", width: "15%" },
    { Header: "Model", accessor: "model", width: "15%" },
    { Header: "Part", accessor: "part_id", width: "15%" },
    { Header: "Serial", accessor: "serial", width: "15%" },
  ];
};

export const shipMotorHeaders = () => {
  return [
    { Header: "No.", accessor: "id", width: "15%" },
    { Header: "Serial", accessor: "serial", width: "15%" },
    { Header: "Status", accessor: "status", width: "15%" },
    //{ Header: 'Cliente', accessor: 'ship.client.name', width: '10%' },
  ];
};

export const shipAircraftsHeaders = () => {
  return [
    { Header: "No.", accessor: "id", width: "20%" },
    { Header: "Serial", accessor: "serial", width: "30%" },
    { Header: "Status", accessor: "status", width: "30%" },
    // { Header: 'Hours limit', accessor: 'hours_limit', width: '15%' },
    // { Header: 'Hours performed', accessor: 'hours_perfomed', width: '15%' },
    // {
    //   Header: 'Hours instalation',
    //   accessor: 'hours_instalation',
    //   width: '15%',
    // },
    // { Header: 'Hours warning', accessor: 'hours_warning', width: '15%' },
    // { Header: 'Hours next due', accessor: 'hours_next_due', width: '15%' },
    // { Header: 'Calendar months', accessor: 'calendar_months', width: '15%' },
  ];
};

// ------------------- Users

export const userHeaders = () => {
  return [
    { Header: "No.", accessor: "id", width: "15%" },
    { Header: "Email", accessor: "email", width: "15%" },
    { Header: "Nombre", accessor: "name", width: "10%" },
    {
      Header: "Rol",
      accessor: "role",
      width: "15%",
      Cell: ({ value }) => {
        return <div>{getRolLabel(value)}</div>;
      },
    },
  ];
};

export const deffectsHeaders = () => {
  return [
    { Header: "ID", accessor: "id", width: "15%" },
    { Header: "Aircraft", accessor: "aircraft.serial", width: "15%" },
    { Header: "Status", accessor: "status", width: "15%" },
    { Header: "Description", accessor: "description", width: "15%" },
    { Header: "Date", accessor: "date", width: "15%" },
    { Header: "TTAP", accessor: "TTAP", width: "15%" },
  ];
};

export const logsHeaders = () => {
  return [
    { Header: "ID", accessor: "id", width: "15%" },
    { Header: "Work", accessor: "work_card", width: "15%" },
    { Header: "Date", accessor: "date", width: "15%" },
    { Header: "Remark", accessor: "remarks", width: "15%" },
    { Header: "Air time", accessor: "air_time", width: "15%" },
    { Header: "Status", accessor: "status", width: "15%" },
    { Header: "NG", accessor: "ng", width: "15%" },
    { Header: "NF", accessor: "nf", width: "15%" },
  ];
};

//  ------------------- Task Warning

export const warningHeaders = () => {
  return [
    { Header: "ID", accessor: "id", width: "15%" },
    { Header: "Task Number", accessor: "task_number", width: "15%" },
    { Header: "Aircraft", accessor: "aircraft.serial", width: "15%" },
    { Header: "Hours Warinig", accessor: "hours_warning", width: "15%" },
    { Header: "Hours Limit", accessor: "hours_limit", width: "15%" },
    { Header: "Cycle", accessor: "cycle_warning", width: "15%" },
    { Header: "Expired", accessor: "expired", width: "15%" },
  ];
};

// ------------------- Staff

export const staffHeaders = () => {
  return [
    { Header: "ID", accessor: "id", width: "15%" },
    { Header: "Autorizacion", accessor: "authorization", width: "15%" },
    { Header: "Nombre", accessor: "name", width: "10%" },
    { Header: "Fecha de Creacion", accessor: "created_at", width: "15%" },
    { Header: "Inicial", accessor: "initial", width: "10%" },
    { Header: "Status", accessor: "status", width: "10%" },
    { Header: "Usuario", accessor: "user.name", width: "10%" },
  ];
};

// ------------------- BPTasks

export const BPTasksHeaders = () => {
  return [
    { Header: "ID", accessor: "id", width: "5%" },
    { Header: "ATTA Code", accessor: "ata_code", width: "10%" },
    { Header: "Descripción", accessor: "task_description", width: "30%" },
    { Header: "Corrección", accessor: "action", width: "20%" },
    { Header: "Mech.", accessor: "initial", width: "10%" },
    { Header: "Insp.", accessor: "status", width: "10%" },
  ];
};

export const InspectionsHeaders = () => {
  return [
    { Header: "ID", accessor: "id", width: "5%" },
    { Header: "ATTA Code", accessor: "ATTA_code", width: "10%" },
    { Header: "Inspections", accessor: "inspections", width: "30%" },
    { Header: "Link", accessor: "blueprint_task.action", width: "20%" },
    { Header: "Active", accessor: "active", width: "10%" },
  ];
};
