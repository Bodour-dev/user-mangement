import { CircularProgress, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { GetAllUsers } from "../Redux/ActionCreater";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "./TableComponent";
import DialogComponent from "./DialogComponent";

const UsersList = () => {
  const dispatch = useDispatch();

  // edit handling
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Create User");
  const { isLoading, errorMessage, userObj, usersList } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(GetAllUsers());
  }, [dispatch]);

  if (isLoading) {
    return (<div className="spinner"><CircularProgress /></div>);
  }

  if (errorMessage) {
    return (<div><h2>{errorMessage}</h2></div>);
  }
  
  return (
    <div>
      <Paper sx={{ margin: "1%" }}>
        <TableComponent
          usersList={usersList}
          setIsEdit={setIsEdit}
          setIsDialogOpen={setIsDialogOpen}
          setDialogTitle={setDialogTitle}
        />
      </Paper>
      <DialogComponent
        isDialogOpen={isDialogOpen}
        isEdit={isEdit}
        setIsDialogOpen={setIsDialogOpen}
        editObj={userObj}
        dialogTitle={dialogTitle}
      />
    </div>
  );
};

export default UsersList;
