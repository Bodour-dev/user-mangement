import { Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from 'react'
import { INITIAL_USER_STATE } from '../Constants';
import { useDispatch } from 'react-redux';
import { CreateUser, UpdateUser } from '../Redux/ActionCreater';

function DialogComponent(props) {
    const [userForm, setUserForm] = useState(INITIAL_USER_STATE);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(props.editobj).length > 0) {
          setUserForm({...userForm,...props.editobj});
        } else {
            clearstate();
        }
    }, [props.editobj]);

    const handleTextChange = (e) => {
        const addressDetails = ["street", "suite", "city", "zipcode"];
        const companyDetails = ["companyName", "catchPhrase", "bs"];
        let addressCheck = addressDetails.some((item) => item == e.target.name);
        let companyCheck = companyDetails.some((item) => item == e.target.name);
        if(addressCheck){
            setUserForm({
                ...userForm,
                address:{
                    ...userForm.address,
                    [e.target.name]:e.target.value
                }
            })
        } else if(e.target.name == 'lat' || e.target.name == "lng"){
            setUserForm({
                ...userForm,
                address:{
                    ...userForm.address,
                    geo:{
                        ...userForm.address.geo,
                        [e.target.name]:e.target.value
                    }
                }
            })    
        } else if(companyCheck){
            setUserForm({
                ...userForm,
                company:{
                    ...userForm.company,
                    [e.target.name !== "companyName" ? e.target.name : 'name']:e.target.value
                }
            })
        }else{
            setUserForm({...userForm,[e.target.name]:e.target.value});
        }
    };
    const clearstate = () => {
        setUserForm(INITIAL_USER_STATE);
    }
    const closepopup = () => {
        props.setOpenDialog(false);
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        const _obj = userForm;
        console.log(_obj);
        debugger
        if (props.isedit) {
            dispatch(UpdateUser(_obj));
        } else {
            dispatch(CreateUser(_obj));
        }
        closepopup();
    }

  return (
    <Dialog open={props.openDialog} onClose={closepopup} fullWidth maxWidth="sm">
        <DialogTitle>
            <span>{props.titleDialog}</span>
            <IconButton style={{ float: 'right' }} onClick={closepopup}><CloseIcon color="primary"></CloseIcon></IconButton>
        </DialogTitle>
        <DialogContent>
            <form onSubmit={handlesubmit}>
                <Stack spacing={2} margin={2}>
                    <TextField required error={userForm.name.length === 0} name="name" value={userForm.name} onChange={e => handleTextChange(e)} variant="outlined" label="Name"></TextField>
                    <TextField required error={userForm.email.length === 0} name="email" type='email' value={userForm.email} onChange={e => handleTextChange(e)} variant="outlined" label="Email"></TextField>
                    <TextField required error={userForm.username.length === 0} name="username" value={userForm.username}  onChange={(e) => handleTextChange(e)} variant="outlined" label="Username"></TextField>
                    <div className='d-flex'>
                    <TextField required className='w-50' error={userForm.address.street.length === 0} name="street" value={userForm.address.street} onChange={(e) => handleTextChange(e)} variant="outlined" label="Street" ></TextField>
                    <TextField className='w-50' name="suite" value={userForm.address.suite} onChange={(e) => handleTextChange(e)} variant="outlined" label="Suite"></TextField>
                    <TextField className='w-50' name="city" value={userForm.address.city} onChange={(e) => handleTextChange(e)} variant="outlined" label="City"></TextField>
                    <TextField className='w-50' name="zipcode" value={userForm.address.zipcode} onChange={(e) => handleTextChange(e)} variant="outlined" label="Zipcode"></TextField>
                    <TextField className='w-50' name="lat" type="number" value={userForm.address.geo?.lat} onChange={(e) => handleTextChange(e)} variant="outlined" label="Latitude"></TextField>
                    <TextField className='w-50' name="lng" type="number" value={userForm.address.geo?.lng} onChange={(e) => handleTextChange(e)} variant="outlined" label="Longutide"></TextField>
                    </div>
                    <TextField required error={userForm.phone.length === 0} name="phone" value={userForm.phone} onChange={e => handleTextChange(e)} variant="outlined" label="Phone"></TextField>
                    <TextField required error={userForm.website.length === 0} name="website" value={userForm.website} onChange={e => handleTextChange(e)} variant="outlined" label="Website"></TextField>
                    <div className='d-flex'>
                    <TextField required sx={{ width: 1 }} error={userForm.company.name.length === 0} name="companyName" value={userForm.company.name} onChange={(e) => handleTextChange(e)} variant="outlined" label="Company Name"></TextField>
                    <TextField required className='w-50' error={userForm.company.catchPhrase.length === 0} name="catchPhrase"  value={userForm.company.catchPhrase} onChange={(e) => handleTextChange(e)} variant="outlined" label="Catch Phrase"></TextField>
                    <TextField required className='w-50' error={userForm.company.bs.length === 0} name="bs" value={userForm.company.bs} onChange={(e) => handleTextChange(e)} variant="outlined" label="BS"></TextField>
                    </div>
                    <Button sx={{ my: '1rem!important' }} variant="contained" type="submit">Submit</Button>
                </Stack>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default DialogComponent


