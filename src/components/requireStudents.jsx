import React from 'react';
import {useAppContext} from "../providers/ApplicationProvider";
import {
    Alert
} from 'reactstrap';

const requireStudents = (WrappedComponent) => props  => {
    const [{students}] = useAppContext();
    if (students.length === 0) {
        return <Alert color="danger">Seznam studentů nesmí být prázdný.</Alert>;
    } else {
        return(
            <WrappedComponent {...props}>
                {props.children}
            </WrappedComponent>
        );
    }
    
}

export default requireStudents;