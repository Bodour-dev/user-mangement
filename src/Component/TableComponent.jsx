import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { RemoveUser } from '../Redux/ActionCreater';
import { COLUMNS_USERS_TABLE } from '../Constants';
import { useDispatch } from 'react-redux';

function TableComponent(props) {
    const columns = COLUMNS_USERS_TABLE;
    // pagination handling
    const [rowperpage, setRowPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const handlepagechange = (event, newpage) => {
        setPage(newpage);
    }
    const handlerowperpagechange = (event) => {
        setRowPerPage(+event.target.value);
        setPage(0);
    }
    const handleRemove = (id) => {
        if (window.confirm('Do you want to remove this user?')) {
            dispatch(RemoveUser(id));
        }
    }

  return (
    <div style={{ margin: '1%' }}>
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow style={{ backgroundColor: '#263238' }}>
                    {columns.map((column) =>
                        <TableCell key={column.id} style={{ color: 'white' }}>{column.name}</TableCell>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {props.userState.usersList &&
                    props.userState.usersList
                    .slice(page * rowperpage, page * rowperpage + rowperpage)
                    .map((row, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.address.city} - {row.address.street}</TableCell>
                                <TableCell>{row.website}</TableCell>
                                <TableCell>{row.company.name}</TableCell>
                                <TableCell>
                                    <Button onClick={() => { props.handleEdit(row.id) }} variant="contained" color="primary">Edit</Button>
                                    <Button onClick={() => { handleRemove(row.id) }} variant="contained" color="error">Delete</Button>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[2, 5, 10, 20]}
        rowsPerPage={rowperpage}
        page={page}
        count={props.userState.usersList.length}
        component={'div'}
        onPageChange={handlepagechange}
        onRowsPerPageChange={handlerowperpagechange}
    >
    </TablePagination>
</div>
  )
}

export default TableComponent