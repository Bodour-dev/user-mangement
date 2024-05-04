import { Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { CreateUser, UpdateUser } from '../Redux/ActionCreater';
import { INITIAL_USER_STATE } from '../Constants';

function DialogComponent({ isDialogOpen, setIsDialogOpen, isEdit, editObj, dialogTitle }) {
    const [userForm, setUserForm] = useState(INITIAL_USER_STATE);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(editObj).length > 0) {
          setUserForm({...userForm,...editObj});
        } else {
          setUserForm(INITIAL_USER_STATE);
        }
    }, [editObj]);

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        const addressFields = ["street", "suite", "city", "zipcode"];
        const companyFields = ["companyName", "catchPhrase", "bs"];
    
        if (addressFields.includes(name)) {
          setUserForm((prevState) => ({
            ...prevState,
            address: {
              ...prevState.address,
              [name]: value,
            },
          }));
        } else if (name === 'lat' || name === "lng") {
          setUserForm((prevState) => ({
            ...prevState,
            address: {
              ...prevState.address,
              geo: {
                ...prevState.address.geo,
                [name]: value,
              },
            },
          }));
        } else if (companyFields.includes(name)) {
          setUserForm((prevState) => ({
            ...prevState,
            company: {
              ...prevState.company,
              [name !== "companyName" ? name : 'name']: value,
            },
          }));
        } else {
          setUserForm((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const _obj = userForm;
        if (isEdit) {
            dispatch(UpdateUser(_obj));
        } else {
            dispatch(CreateUser(_obj));
        }
        setIsDialogOpen(false);
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setUserForm(INITIAL_USER_STATE);
    };

  return (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
            <span>{dialogTitle}</span>
            <IconButton style={{ float: 'right' }} onClick={handleCloseDialog}><CloseIcon color="primary"></CloseIcon></IconButton>
        </DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} margin={1}>
                        <TextField required error={!userForm.name} name="name" value={userForm.name} onChange={handleTextChange} variant="outlined" label="Name" />
                        <TextField required error={!userForm.email} name="email" type='email' value={userForm.email} onChange={handleTextChange} variant="outlined" label="Email" />
                        <TextField required error={!userForm.username} name="username" value={userForm.username}  onChange={handleTextChange} variant="outlined" label="Username" />
                    <div className='d-flex'>
                        <TextField required className='w-50' error={!userForm.address.street} name="street" value={userForm.address.street} onChange={handleTextChange} variant="outlined" label="Street" />
                        <TextField className='w-50' name="suite" value={userForm.address.suite} onChange={handleTextChange} variant="outlined" label="Suite" />
                        <TextField className='w-50' name="city" value={userForm.address.city} onChange={handleTextChange} variant="outlined" label="City" />
                        <TextField className='w-50' name="zipcode" value={userForm.address.zipcode} onChange={handleTextChange} variant="outlined" label="Zipcode" />
                        <TextField className='w-50' name="lat" type="number" value={userForm.address.geo.lat} onChange={handleTextChange} variant="outlined" label="Latitude" />
                        <TextField className='w-50' name="lng" type="number" value={userForm.address.geo.lng} onChange={handleTextChange} variant="outlined" label="Longutide" />
                    </div>
                        <TextField required error={!userForm.phone} name="phone" value={userForm.phone} onChange={handleTextChange} variant="outlined" label="Phone" />
                        <TextField required error={!userForm.website} name="website" value={userForm.website} onChange={handleTextChange} variant="outlined" label="Website" />
                    <div className='d-flex'>
                        <TextField required sx={{ width: 1 }} error={!userForm.company.name} name="companyName" value={userForm.company.name} onChange={handleTextChange} variant="outlined" label="Company Name" />
                        <TextField required className='w-50' error={!userForm.company.catchPhrase} name="catchPhrase"  value={userForm.company.catchPhrase} onChange={handleTextChange} variant="outlined" label="Catch Phrase" />
                        <TextField required className='w-50' error={!userForm.company.bs} name="bs" value={userForm.company.bs} onChange={handleTextChange} variant="outlined" label="BS" />
                    </div>
                        <Button sx={{ mt: '1rem!important' }} variant="contained" type="submit">Submit</Button>
                </Stack>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default DialogComponent


