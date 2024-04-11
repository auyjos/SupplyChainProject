/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 PRO React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography"; 
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";

// Authentication layout components
import CoverLayout from "../../components/authentication/CoverLayout";

// Images
import bgImage from "../../assets/images/construction.jpg";
import { signUp } from "../../Services/authService";

function SignUp({setSession}) {

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [pass, setPass] = useState();

  const handleMailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handlePassChange = (event) => {
    setPass(event.target.value);
  }

  const register = () => {
    console.info(email, pass, name);
    let body = { email: email, password: pass, username: name};
    signUp(body)
      .then(() => {
        window.location.replace("/");
        alert("Usuario Creado Exitosamente!")
      })
      .catch((err) => {
        console.error(err.response);
      });
    

  }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Registrarse
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Correo"
                variant="standard"
                fullWidth
                placeholder="john@example.com"
                InputLabelProps={{ shrink: true }}
                onChange= {handleMailChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nombre"
                variant="standard"
                fullWidth
                placeholder="John"
                InputLabelProps={{ shrink: true }}
                onChange= {handleNameChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Contrasena"
                variant="standard"
                fullWidth
                placeholder="************"
                InputLabelProps={{ shrink: true }}
                onChange={handlePassChange}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={register} >
                Aceptar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Ya tienes una cuenta?{" "}
                <MDTypography
                  component={Link}
                  to="/login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Inicia Sesion
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default SignUp;
