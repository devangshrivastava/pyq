import { Grid, Box, TextField, Button, Alert } from '@mui/material';
import { useState } from 'react';


export default function ChangePassword() {
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
      });
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const actualData = {
          password: data.get('password'),
          password2: data.get('password2'),
        }
        if (actualData.password && actualData.password2) {
          if (actualData.password === actualData.password2) {
            console.log(actualData);
            document.getElementById("password-change-form").reset();
            setError({ status: true, msg: "Password Changed Successful", type: "success" });
          } else {
            setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: "error" })
          }
        } else {
          setError({ status: true, msg: "All Fields are Required", type: "error" })
        }
      };

    return (
        <div>
            <Grid container justifyContent='center'>
                <Grid item sm={6} xs={12}>
                    <h1>Change Password</h1>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} id="password-change-form">
                        <TextField margin="normal" required fullWidth name="password" label="New Password" type="password" id="password" />
                        <TextField margin="normal" required fullWidth name="password2" label="Confirm New Password" type="password" id="password2" />
                        <Box textAlign='center'>
                        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, px: 5 }}> Update </Button>
                        </Box>
                        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
