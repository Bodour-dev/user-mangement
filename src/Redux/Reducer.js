import { MAKE_REQ, OPEN_POPUP, REQ_ADD_SUCC, REQ_DELETE_SUCC, REQ_GETALL_FAIL, REQ_GETALL_SUCC, REQ_GETBYID_SUCC, REQ_UPDATE_SUCC } from "./ActionType"

export const initialstate = {
    isLoading: false,
    usersList: [],
    userObj: {},
    errorMessage: ''
}

export const UserReducer = (state = initialstate, action) => {
    switch (action.type) {
        case MAKE_REQ:
            return {
                ...state,
                isLoading: true
            }
        case REQ_GETALL_SUCC:
            return {
                ...state,
                isLoading: false,
                usersList: action.payload
            }
        case REQ_GETBYID_SUCC:
            return {
                ...state,
                userObj: action.payload
            }
        case REQ_GETALL_FAIL:
            return {
                ...state,
                isLoading: false,
                usersList: [],
                errorMessage: action.payload
            }
        case OPEN_POPUP:
            return {
                ...state,
                userObj: {}
            }
        case REQ_ADD_SUCC:
            const _inputdata = { ...action.payload };
            const _maxid = Math.max(...state.usersList.map(o => o.id));
            _inputdata.id = (_maxid + 1);
            // debugger
            return {
                ...state,
                usersList: [...state.usersList, _inputdata]
            }
            
        case REQ_UPDATE_SUCC:
            const _data = { ...action.payload };
            const _finaldata = state.usersList.map(item => {
                return item.id === _data.id ? _data : item
            });
            return {
                ...state,
                usersList: _finaldata
            }
        case REQ_DELETE_SUCC:
            const _filterdata = state.usersList.filter((data) => {
                return data.id !== action.payload
            })
            debugger
            return {
                ...state,
                usersList: _filterdata
            }
        default: return state;
    }
}