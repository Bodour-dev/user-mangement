import axios from "axios";
import { AddRequest, RemoveRequest, UpdateRequest, getAllRequestFail, getAllRequestSuccess, getByIdSuccess, makeRequest } from "./Action"
import { toast } from "react-toastify";
import { SERVER_URL } from "../Constants";

export const GetAllUsers = () => {
    return (dispatch) => {
        dispatch(makeRequest());
        setTimeout(()=>{
            axios.get(SERVER_URL).then(res => {
                const _list = res.data;
                dispatch(getAllRequestSuccess(_list));
            }).catch(err => {
                dispatch(getAllRequestFail(err.message));
            });
        }, 1000);
    }
}

export const GetUserById = (id) => {
    return (dispatch) => {
        axios.get(SERVER_URL+id).then(res => {
            const _obj = res.data;
            // debugger
            dispatch(getByIdSuccess(_obj));
        }).catch(err => {
            toast.error('Failed to fetch the data')
        });
    }
}

export const CreateUser = (data) => {
    return (dispatch) => {
        axios.post(SERVER_URL, data).then(res => {
            dispatch(AddRequest(data));
            toast.success('User created successfully.')
        }).catch(err => {
            toast.error('Failed to create comany due to :' + err.message)
        });
    }
}

export const UpdateUser = (data) => {
    return (dispatch) => {
        axios.put(SERVER_URL+data.id, data).then(res => {
            dispatch(UpdateRequest(data));
            toast.success('User updated successfully.')
        }).catch(err => {
            toast.error('Failed to update User due to :' + err.message)
        });
    }
}

export const RemoveUser = (id) => {
    return (dispatch) => {
        axios.delete(SERVER_URL+id).then(res => {
            dispatch(RemoveRequest(id));
            toast.success('User Removed successfully.')
        }).catch(err => {
            toast.error('Failed to remove User due to :' + err.message)
        });
    }
}


