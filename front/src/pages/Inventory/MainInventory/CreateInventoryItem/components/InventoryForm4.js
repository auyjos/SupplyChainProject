import Grid from "@mui/material/Grid";
import MDBox from "../../../../../components/MDBox";
import FormField from "../../../../../components/FormField";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { Autocomplete } from "@mui/material";
import MDInput from "../../../../../components/MDInput";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

const InventoryForm4 = ({isView, formData}) => {
    const { formField, values, errors, touched, setFieldValue } = formData;
    const {
        note,
        instalation_note,
        serialized,
        life_limited,
        utilization
    } = formField;
    let {
        note: noteV,
        instalation_note:instalation_noteV,
        serialized:serializedV,
        life_limited:life_limitedV,
        utilization:utilizationV,
    } = values;

    const handleChange = (event) => {
        values.utilizationV = event.target.value;
    }

    return(
        <MDBox mt={2}>
            <Grid container spacing={3}>
                {/* <Grid item xs={12} md={6}>
                    <FormField 
                    multiline
                    rows={4}
                    type={note.type} label={note.label} name={note.name} 
                    value={noteV} error={errors.note && touched.note} 
                    success={noteV.length > 0 && !errors.note}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormField 
                    multiline
                    rows={4}
                    type={instalation_note.type} label={instalation_note.label} name={instalation_note.name} 
                    value={instalation_noteV} error={errors.instalation_note && touched.instalation_note} 
                    success={instalation_noteV.length > 0 && !errors.instalation_note}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid> */}
                <Grid item xs={12} md={6}>
                <FormGroup row>
                    <FormControlLabel 
                        control={
                            <Checkbox  checked={serializedV}  
                            disabled={isView}
                            onChange={(event) => {
                                setFieldValue(serialized.name, event.target.checked)
                            }}/>
                        } 
                        label={serialized.label} />
                    <FormControlLabel 
                        control={
                            <Checkbox  checked={life_limitedV} 
                            disabled={isView}
                            onChange={(event) => {
                                setFieldValue(life_limited.name, event.target.checked)
                            }}/>
                        } 
                        label={life_limited.label} />
                </FormGroup>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend">{utilization.label}</FormLabel>
                        <RadioGroup
                            row
                            disabled={isView}
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name={utilization.name}
                            value={utilizationV}
                            onChange={(event) => {
                                setFieldValue(utilization.name, event.currentTarget.value)
                            }}
                        >
                            <FormControlLabel disabled={isView} value="CS" control={<Radio disabled={isView} />} label="Consumable" />
                            <FormControlLabel disabled={isView} value="RT" control={<Radio disabled={isView} />} label="Rotable" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </MDBox>
    )

}

export default InventoryForm4;