import {useState, useRef} from "react";
import {useAppContext, CLEAR_STUDENTS, ADD_STUDENT, REMOVE_STUDENT} from "../providers/ApplicationProvider";
import {
    Alert, Button, Input, InputGroup, InputGroupAddon, Table
  } from 'reactstrap';
const Setup = props => {
    const [{students}, dispatch] = useAppContext();
    const [text, setText] = useState("");
    const inputRef = useRef(null);
    const handleSubmit = e => {
        dispatch({type: ADD_STUDENT, payload: text});
        setText("");
        if (inputRef.current !== null) inputRef.current.focus();
    }
    return (
        <>
        <h1>Seznam studentů <Button color="danger" onClick={e=>{dispatch({type: CLEAR_STUDENTS})}}>Vymazat</Button></h1>
        {
        students.length > 0
        ?
        <Table>
        {students.map((item, index) => (
            <tr key={index}>
                <td>
                    {item}
                </td>
                <td>
                <Button 
                    color="danger" 
                    size="sm" 
                    onClick={e=>{dispatch({type: REMOVE_STUDENT, index: index})}}
                >Odstranit</Button>
                </td>
            </tr>
        ))
        }
        </Table>
        :
        <Alert color="info">Seznam studentů je prázdný.</Alert>
        }
        <InputGroup>
            <Input 
                value={text} 
                onChange={e=>{setText(e.target.value)}} 
                autoFocus={true} 
                onKeyDown={e=>{
                    if(e.key === "Enter")
                        handleSubmit();
                }}
            />
            <InputGroupAddon addonType="append">
                <Button 
                    color="success" 
                    onClick={handleSubmit}
                    disabled={text.length === 0} 
                    onClick={handleSubmit}
                >Přidat</Button>
                </InputGroupAddon>
        </InputGroup>
        </>
    );
}

export default Setup;