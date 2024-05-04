import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { GetUserById, RemoveUser } from "../Redux/ActionCreater";
import { useDispatch } from "react-redux";
import { COLUMNS_USERS_TABLE } from "../Constants";
import { OpenPopup } from "../Redux/Action";

function TableComponent({
  usersList,
  setIsEdit,
  setDialogTitle,
  setIsDialogOpen,
}) {
  const columns = COLUMNS_USERS_TABLE;
  const dispatch = useDispatch();
  // pagination handling
  const [rowperpage, setRowPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleEditUser = (userId) => {
    setIsEdit(true);
    setDialogTitle("Update User");
    setIsDialogOpen(true);
    dispatch(GetUserById(userId));
  };
  // Create user
  const handleAddUser = () => {
    setIsEdit(false);
    setDialogTitle("Create User");
    setIsDialogOpen(true);
    dispatch(OpenPopup());
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowPerPage(+event.target.value);
    setPage(0);
  };
  const handleRemoveUser = (userId) => {
    if (window.confirm("Do you want to remove this user?")) {
      dispatch(RemoveUser(userId));
    }
  };

  return (
    <div style={{ margin: "1%" }}>
      <div style={{ margin: "1%" }}>
        <Button onClick={handleAddUser} variant="contained" color="success">
          Add New (+)
        </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#263238" }}>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ color: "white" }}>
                  {column.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList &&
              usersList
                .slice(page * rowperpage, page * rowperpage + rowperpage)
                .map((user) => {
                  return (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        {user.address.city} - {user.address.street}
                      </TableCell>
                      <TableCell>{user.website}</TableCell>
                      <TableCell>{user.company.name}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            handleEditUser(user.id);
                          }}
                          variant="contained"
                          color="primary"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            handleRemoveUser(user.id);
                          }}
                          variant="contained"
                          color="error"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 20]}
        rowsPerPage={rowperpage}
        page={page}
        count={usersList.length}
        component={"div"}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      ></TablePagination>
    </div>
  );
}

export default TableComponent;
