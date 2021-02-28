import {useState} from "react";
import {useAppContext} from "../providers/ApplicationProvider";
import requireStudents from "./requireStudents";
import {
    Card, CardText, CardBody,
    CardTitle, Button
  } from 'reactstrap';

const RandomStudent = props => {
    const [{students}] = useAppContext();
    const [name, setName] = useState("?");
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h1">Náhodný student</CardTitle>
                <CardText className="display-3 text-center">{name}</CardText>
                <Button block color="success" disabled={students === 0} onClick={e => {
                    setName(students[Math.floor(Math.random() * students.length)]);
                }}>Vybrat</Button>
            </CardBody>
        </Card>
    );
}

export default requireStudents(RandomStudent);