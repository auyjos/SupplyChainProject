import React, { useEffect, useState } from 'react';
import MDBox from '../../../../components/MDBox';
import FormField from '../../../../components/FormField';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import MDInput from '../../../../components/MDInput';
import { Typography } from '@mui/material';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Field } from "formik";
import MultiSelect from './Select';



const CreatePersonnelForm = ({
  handleChange,
  inputs,
  isView,
  formData,
  isUpdate,
}) => {
  // const [ships, setShips] = useState([]);

  const { formField, values, errors, touched, setFieldValue } = formData;

  const [hiredVal, setHiredVal] = useState();

  const {
    name,
    dpi,
    phone,
    email,
    role,
    boss,
    hired,
    hired_date,
  } = formField;

  var {
    name: nameV,
    dpi: dpiV,
    phone: phoneV,
    email: emailV,
    role: roleV,
    boss: bossV,
    hired: hiredV,
    hired_date: hired_dateV,
  } = values;
  console.log(values)

  return (
    <MDBox mt={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormField
            type={name.type}
            label={name.label}
            name={name.name}
            value={nameV}

            InputProps={{ readOnly: isView }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormField
            type={dpi.type}
            label={dpi.label}
            name={dpi.name}
            value={dpiV}
            error={errors.dpi && touched.dpi}
            success={dpiV.length > 0 && !errors.dpi}
            InputProps={{ readOnly: isView }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormField
            type={phone.type}
            label={phone.label}
            name={phone.name}
            value={phoneV}
            error={errors.phone && touched.phone}
            success={phoneV.length > 0 && !errors.phone}
            InputProps={{ readOnly: isView }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormField
            type={email.type}
            label={email.label}
            name={email.name}
            value={emailV}
            error={errors.email && touched.email}
            success={emailV.length > 0 && !errors.email}
            InputProps={{ readOnly: isView }}
          />
        </Grid>

        <Grid item xs={12} md={4}>

          <Field
            name="singleSelectCustom"
            id="singleSelectCustom"
            placeholder="Single Select"
            isMulti={false}
            component={MultiSelect}
            options={[
              { value: 'one', label: 'One' },
              { value: 'two', label: 'Two' },
              { value: 'three', label: 'Three' },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Cycle</InputLabel>
            <Select
              labelId="Cycle"
              id="cycle"
              //value={inputs.role}
              label="Cycle"
              name="cycle"
              onChange={handleChange}
              sx={{ height: "40px" }}
            >
              <MenuItem value="NF">NF</MenuItem>
              <MenuItem value="NG">NG</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{hired.label}</InputLabel>
            <Select

              value={values.hiredV}
              label={hiredV}
              name={hired.name}
              onChange={(e) => {
                hiredV = e.target.value
                console.log(hiredV)
              }}
              sx={{ height: "40px" }}
            >
              <MenuItem value="SI">SI</MenuItem>
              <MenuItem value="NO">NO</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormField
            type={hired_date.type}
            label={hired_date.label}
            name={hired_date.name}
            value={hired_dateV}
            error={errors.hired_date && touched.hired_date}
            success={hired_date.length > 0 && !errors.hired_date}
            InputProps={{ readOnly: isView }}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default CreatePersonnelForm;
