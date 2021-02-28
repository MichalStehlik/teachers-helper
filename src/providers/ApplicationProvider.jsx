import { createContext, useReducer, useContext, useEffect } from "react";

const LOCAL_STORAGE_ID = "randomHelper";
const initialState = {students: []};
let storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID));

export const ADD_STUDENT = "ADD_STUDENT";
export const REMOVE_STUDENT = "REMOVE_STUDENT";
export const CLEAR_STUDENTS = "CLEAR_STUDENTS";

const appReducer = (state, action) => {
    switch (action.type) {
        case ADD_STUDENT: {
            let newStudents = [...state.students];
            return {...state, students: [...newStudents, action.payload]};
        }
        case REMOVE_STUDENT: {
            let newStudents = [...state.students];
            newStudents.splice(action.index,1);
            return {...state, students: newStudents};
        }
        case CLEAR_STUDENTS: {
            return {...state, students: []};
        }
        default: {
            return state;
        }
    }
}

export const AppContext = createContext();
export const AppProvider = ({children, ...rest}) => {
    const [store, dispatch] = useReducer(appReducer, storedData || initialState); 
    useEffect(()=> {
        console.log("Storing data");
        localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(store));
    },[store]);  
    return (
        <AppContext.Provider value={[store, dispatch]}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);