
import Button from '@mui/material/Button';
import './App.css';
import { useState } from 'react';
import FormView from './components/Form';
function App() {
  const [getId,setId]=useState("")
  const [getValue,setValue]=useState({})
  
  return (
    <div className="App">
     
   {getId ?   <FormView id={getId} setId={setId} setValue={setValue} ></FormView> : 
   <>
    <h1>Hello User</h1>
     <Button onClick={()=>setId("Thermometer-ABC123")} >
      Thermometer-ABC123
     </Button>
   </> }
    </div>
  );
}

export default App;
