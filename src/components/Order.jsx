import {useState, useEffect} from "react";
import {useAppContext} from "../providers/ApplicationProvider";
import {
    Alert, Button, Input, FormGroup, Label, Table, Row, Col
  } from 'reactstrap';
  import requireStudents from "./requireStudents";

const Order = props => {
    const [{students}] = useAppContext();
    const [list, setList] = useState([]);
    const [groups, setGroups] = useState(0);
    const buildRandomOrder = () => {
        let l = [...students];
        for (let i = l.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [l[i], l[j]] = [l[j], l[i]];
        }
        setList(l);
    }
    useEffect(()=>{
        buildRandomOrder();
    },[students]);
    let groupSize = (list.length / groups);
    return (
        <>
        <h1>Náhodný seznam studentů</h1>
        {list.length > 0
        ?
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Student</th>
                    <th>Skupina</th>
                </tr>
            </thead>
        {list.map((item, index)=>(
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item}</td>
                <td>{groups > 0 ? Math.floor(1 + (index / groupSize)) : ""}</td>
            </tr>
        ))}
        </Table>
        :
        <Alert color="warning">Seznam studentů je prázdný.</Alert>
        }
        <Button block color="success" disabled={list.length === 0} onClick={e => {buildRandomOrder()}}>Zamíchat</Button>
        <Row>
            <Col md={10}>
                <FormGroup>
                    <Label for="groups">Počet skupin</Label>
                    <Input value={groups} min="0" max={list.length} onChange={e => {setGroups(e.target.value)}} type="range" />
                </FormGroup>
            </Col>
            <Col md={2}>
            {groups}
            </Col>
        </Row>
        </>
    );
}

export default requireStudents(Order);