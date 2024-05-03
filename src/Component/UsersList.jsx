import { Button, CircularProgress, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { GetAllUsers, GetUserById, RemoveUser, UpdateUser } from "../Redux/ActionCreater";
import { connect, useDispatch, useSelector } from "react-redux";
import { OpenPopup } from "../Redux/Action";
import TableComponent from "./TableComponent";
import DialogComponent from "./DialogComponent";

const UsersList = (props) => {
    let userState = props.userState;
    const dispatch = useDispatch();

    // edit handling
    const [openDialog, setOpenDialog] = useState(false);
    const [isedit, setIsEdit] = useState(false);
    const [titleDialog, setTitleDialog] = useState('Create User');
    const editobj = useSelector((state) => state.user.userObj);

    const handleEdit = (id) => {
        setIsEdit(true);
        setTitleDialog('Update User');
        setOpenDialog(true);
        dispatch(GetUserById(id));
    }
    // Create user
    const functionadd = () => {
        setIsEdit(false);
        setTitleDialog('Create User');
        openpopup();
    }
    const openpopup = () => {
        setOpenDialog(true);
        dispatch(OpenPopup())
    }

    useEffect(() => {
        props.loadUser();
    }, []);

    return (
        userState.isloading ?<div className="spinner"><CircularProgress /></div>  :
        userState.errormessage ? <div><h2>{userState.errormessage}</h2></div> :
            <div>
                <Paper sx={{ margin: '1%' }}>
                    <div style={{ margin: '1%' }}>
                        <Button onClick={functionadd} variant="contained" color="success">Add New (+)</Button>
                    </div>
                    <TableComponent userState={userState} handleEdit={handleEdit}/>
                </Paper>
                <DialogComponent openDialog={openDialog} setOpenDialog={setOpenDialog} isedit={isedit} editobj={editobj} titleDialog={titleDialog}/>
            </div>
    );
}

const mapStatetoProps = (state) => {
    return {
        userState: state.user
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        loadUser: () => dispatch(GetAllUsers())
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(UsersList);