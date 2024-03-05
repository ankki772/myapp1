import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FormControl, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from '@mui/material/InputLabel';

// import { dJson } from "../dummy";
function FormView(props) {
  const { id,setId } = props;
  const [getlogView, setLogView] = useState(false);
  const [getStatus,setStatus]=useState(false)

  const [getValue,setValue]=useState("")
  const [getData, setData] = useState({});

  const FetchData = async () => {
    // console.log(dJson, "getdata");
    try {
      // this endpoint will return 404
      const res = await fetch("./dummy.json");
      if (res.ok) {
        const data = await res.json();
        console.log(data[0], "data");
        setData({
          SetPoint: data[0].SetPoint,
          Corrected: data[0].Corrected,
          Varience: data[0].Varience,
          deviation: data[0].deviation,
          options: data[0].SelectOptions
        });
      }
    } catch {
      console.error("Failed");
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  //   console.log(dJson, "getdata");
  return (
    <div className="App">
      <h2>{`${id}`}</h2>
      {getlogView == true ? (
        <Box component="section" sx={{ p: 2, border: "1px solid grey" }}>
          <div className="List">
            <p>11-04-2021 04:35 PM</p>
            <p>2/3</p>
            <p style={{color: "green"}} >Passed</p>
          </div>
          <div className="List">
            <p>11-04-2021 04:35 PM</p>
            <p>2/3</p>
            <p style={{color: "red"}}>Failed</p>
          </div>
        </Box>
      ) : (
        ""
      )}
      <Button onClick={() => setLogView(!getlogView)} type="button" sx={{display: "block",textAlign:"left",color:"red",marginLeft:"10px",padding:0}} > View Log</Button>
      <div>
        <h2>Instructions</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <Formik
        initialValues={{
          Register: "",
          SetPoint: getData.SetPoint || '',
          Corrected: getData.Corrected || '',
          Varience: getData.Varience || '',
          deviation: getData.deviation || '',
          Comments: "",
          Options: getData.options || ""
        }}
        enableReinitialize={true}
        validate={(values) => {
          const errors = {};
          console.log(values.Comments.length,values.Comments)
          if(values.Comments.length ===500 || values.Comments.length>500)
          {
            errors.Comments = "Must be less than 500";
            return
          }
          if (!values.Register) {
            errors.Register = "Required";
          } else if (!/[0-9]/.test(values.Register)) {
            errors.Register = "Must Contain Number";
          } else if(!values.Comments)
          {
            errors.Comments = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
          setValue(values)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} padding={1} mb={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  label={"Register"}
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="Register"
                //   type="number"
                  value={values.Register || ""}
                  onChange={(event) => {
                    const value = event.target.value;
                    if(isNaN(value)) return

                    if(value>=values.SetPoint && value<=values.Corrected )
                    {
                        setStatus(false)
                    }else if(value<=values.SetPoint && value>=values.Corrected )
                    {
                        setStatus(false)
                    }else{
                        setStatus(true)
                    }
                    handleChange(event);
                 
                  }}
                  onKeyUp={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onBlur={handleBlur}
                  error={Boolean(touched.Register && errors.Register)}
                  helperText={touched.Register && errors.Register}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  label="Set Point"
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="text" 
                  name="SetPoint"
                  value={values?.SetPoint || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  label={"Corrected"}
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="Corrected"
                  value={values.Corrected}
                  disabled
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  label={"Varience"}
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="Varience"
                  value={values.Varience}
                  disabled
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  label={"deviation"}
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="deviation"
                  value={values.deviation}
                  disabled
                />
              </Grid>
              {getStatus==true && values?.Register.length>0 ? <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography variant="h6"  sx={{color:"red",fontSize:"15px",textAlign:"left" ,marginBottom:"5px",marginLeft:"10px" }} >
                  Equipment Verification Failed
                </Typography>
              <FormControl  shrink={true} sx={{minWidth: "100%"}} >
                <InputLabel   id="demo-simple-select-label">Corrective Action</InputLabel>
  
                <Select
                labelId="demo-simple-select-label"
                fullWidth
                id="demo-simple-select"
                size="small"
                value={getValue}
                label="Corrective Action"
                onChange={(e)=>setValue(e.target.value)}
              >
                  {/* <MenuItem value={""} selected>Please select one</MenuItem> */}
                  {values.Options.map((item,i)=>{
                    return (
                        <MenuItem value={item}>{item}</MenuItem>
                    )
                  })}
              </Select>
                </FormControl>

               
              </Grid> : values.Register &&
              <Typography variant="h6" sx={{fontSize:"15px",textAlign:"left" ,marginBottom:"5px",marginLeft:"10px",}} >
              Equipment Verification Succed
            </Typography>}

              <Grid item xs={12} sm={12} md={6} lg={12}   >
              <TextField
                id="outlined-multiline-static"
                label="Comments"
                name="Comments"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={values?.Comments}
                onPaste={(e)=>{e.preventDefault()}}
                onChange={(event)=>{
                    if(values.Comments.length ===500 || values.Comments.length>500)
                    {
                      errors.Comments = "Must be less than 100";
                      return
                    }else{
                        handleChange(event)
                    }

                }}      
                error={Boolean(touched.Comments && errors.Comments)}
                helperText={touched.Comments && errors.Comments}
              />
              </Grid>
              
          
              
            
            </Grid>
           
            <Button type="submit" variant="contained" className="btn" color="error" sx={{margin:"auto"}} disabled={isSubmitting || (!values?.Register || !values.Comments )} >
             Done
            </Button>
            <Button type="button" className="btn" sx={{margin:"auto"}} disabled={isSubmitting} onClick={()=>{
                setId("")
            }}   >
             Cancel
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default FormView;
