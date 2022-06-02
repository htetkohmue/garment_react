import { Link as RouterLink ,useParams} from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
// @mui
import { styled } from '@mui/material/styles';
import {Stack, Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import { TailorsRegisterForm } from '../sections/@dashboard/TailorRegister';
import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 600,
  margin: '70px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  
}));

const path = process.env.REACT_APP_BACKEND_URL;


// ----------------------------------------------------------------------

export default function TailorsRegister() {


  const { id ,setId } = useParams();
  useEffect(() => {
    axios.get(`${path}/api/edit-tailor/${id}`).then((response) => {
      if (response.data.status==='OK' && response.data.data!=null) {
        setTailorsID(response.data.data.tailorID); setTailorsEngName(response.data.data.nameMM); setTailorsMyanmarName(response.data.data.nameEN);
        setPhone(response.data.data.phoneNO); setNrcNo(response.data.data.nrcNO); setAddress(response.data.data.address); setDescription(response.data.data.description);
      }
    });
  }, []);

  const [successMsg, setSuccessMsg] = useState(""); // for success msg
  const [errorMsg, setErrorMsg] = useState([]); // for success msg

  const [tailorsID, setTailorsID] = useState(""); // for id
  const [tailorsEngName, setTailorsEngName] = useState(""); // for eng name
  const [tailorsMyanmarName, setTailorsMyanmarName] = useState(""); // for myanmar name
  const [phone, setPhone] = useState(""); // for phone name
  const [nrcNo, setNrcNo] = useState(""); // for Nrc No name
  const [address, setAddress] = useState(""); // for address name
  const [description, setDescription] = useState(""); // for description
  
/** change id */
  const changeID=(e)=>{
    setTailorsID(e.target.value);
  }
/** change name */
const changeEngName=(e)=>{
  setTailorsEngName(e.target.value);
}
/** change name */
const changeMyanmarName=(e)=>{
  setTailorsMyanmarName(e.target.value);
}
/** change Phone */
const changePhone=(e)=>{
  setPhone(e.target.value);
}
/** change Nrc */
const changeNrcNo=(e)=>{
  setNrcNo(e.target.value);
}
/** change address */
const changeAddress=(e)=>{
  setAddress(e.target.value);
}
/** change address */
const changeDescription=(e)=>{
  setDescription(e.target.value);
}

/** click function */
  const register=()=>{
    if (id==null) {
      axios
          .post(`${path}/api/register-tailor`, {
            "tailor_id": tailorsID,
            "name_mm":tailorsEngName,
            "name_en":tailorsMyanmarName,
            "phone_no": phone,
            "nrc_no":nrcNo,
            "address":address,
            "description":description,
            "login_id":2001
          })
          .then((response) => {
            if (response.data.status==='NG') {
              setErrorMsg(response.data.message);
              setSuccessMsg("");
            }
            if (response.data.status==='OK') {
              setSuccessMsg(response.data.message);
              setTailorsID(""); setTailorsEngName("");
              setTailorsMyanmarName(""); setPhone("");
              setNrcNo(""); setAddress(""); setDescription("");
              setErrorMsg([]);
            }
          })
          .catch(error => {
          });
      }
      if (id!=null) {
        axios
        .put(`${path}/api/update-tailor/${id}`, {
          "tailor_id": tailorsID,
          "name_mm":tailorsEngName,
          "name_en":tailorsMyanmarName,
          "phone_no": phone,
          "nrc_no":nrcNo,
          "address":address,
          "description":description,
          "login_id":2001
        })
        .then((response) => {
          if (response.data.status==='NG') {
            setErrorMsg(response.data.message);
            setSuccessMsg("");
          }
          if (response.data.status==='OK') {
            setSuccessMsg(response.data.message);
            setTailorsID(""); setTailorsEngName("");
            setTailorsMyanmarName(""); setPhone("");
            setNrcNo(""); setAddress(""); setDescription("");
            setId("");
            setErrorMsg([]);
          }
        })
        .catch(error => {
        });
      }
  }
  return (
    <Page title="Register">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h3" gutterBottom>
            Tailor Registration
            </Typography>
          </Stack>
          <div style={{backgroundColor:"red",borderRadius:'10px'}}>
            {errorMsg.map((data,index)=>{
              return(
                <div key={index} style={{color:"white"}}>
                    {data}
                </div>
                
              )
            })}
          </div>
          <div style={{backgroundColor:"green",borderRadius:'10px'}}><h3 style={{color:"white"}}>{successMsg}</h3></div>
          <ContentStyle>
            <TailorsRegisterForm
            register={register}
            tailorsID={tailorsID} changeID={changeID}
            tailorsEngName={tailorsEngName} changeEngName={changeEngName}
            tailorsMyanmarName={tailorsMyanmarName} changeMyanmarName={changeMyanmarName}
            phone={phone} changePhone={changePhone} nrcNo={nrcNo} changeNrcNo={changeNrcNo}
            address={address} changeAddress={changeAddress} description={description} changeDescription={changeDescription}
            />
          </ContentStyle>
        </Container>
     
    </Page>
  );
}
