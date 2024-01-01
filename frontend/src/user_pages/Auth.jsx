import { Grid, Card, Tabs, Typography, Tab, Box } from '@mui/material';
import { useState } from 'react';
import SignUp from './SignUp';
import Login from './Login';


const TabPanel = (props) => {
    const { children, value, index } = props;
    return (
      <div role='tabpanel' hidden={value !== index}>
        {
          value === index && (
            <Box>{children}</Box>
          )
        }
      </div>
    )
}



export default function Auth() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return (
    <div>
        <Grid container sx={{ backgroundColor: '#001f3f', height: '100vh' }}>
            <Grid item lg={7} sm={5}>
            </Grid>
            <Grid item lg={5} sm={7} xs={12}>
                <Card sx={{ width: '100%', height: '100%', borderRadius: 0 }}>
                    <Box sx={{ mx: 3, height: 530 }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} textColor='secondary' indicatorColor='secondary' onChange={handleChange}>
                            <Tab label='Login' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
                            <Tab label='SignUp' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
                        </Tabs>
                        </Box>
                        <Grid
                          container
                          spacing={0}
                          direction="column"
                          alignItems="center"
                          justifyContent="center"
                          style={{ minHeight: '100vh' }}
                        >
                          <Grid item>
                            <TabPanel value={value} index={0}>
                              <Login />
                              </TabPanel>
                              <TabPanel value={value} index={1}>
                              <SignUp />
                            </TabPanel>
                          </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    </div>
  )
}
 