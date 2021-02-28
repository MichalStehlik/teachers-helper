import {useState} from "react";
import {
    Card, CardText, CardBody,
    CardTitle, Button, Input, FormGroup, Row, Col, Label
  } from 'reactstrap';
const Random = props => {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [value, setValue] = useState(0);
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h1">Náhodné číslo ({min}-{max})</CardTitle>
                <CardText className="display-3 text-center">{value}</CardText>
                <Button block color="success" disabled={min >= max} onClick={e => {setValue(Math.floor(Math.random() * (Number(max) - Number(min) + 1) ) + Number(min))}}>Vygenerovat</Button>
            </CardBody>
            <CardBody>
                <CardTitle tag="h1">Rozsah</CardTitle>
                <Row form>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="min">Minimum</Label>
                            <Input value={min} min="0" max="100" onChange={e => {
                                setMin(e.target.value);
                                if (max <= min) setMax(Number(min) + 1);
                            }} type="range" />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        {min}
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="min">Maximum</Label>
                            <Input value={max} min="0" max="100" onChange={e => {
                                if (e.target.value > min) setMax(Number(e.target.value));
                            }} type="range" />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        {max}
                    </Col>
                </Row>                
            </CardBody>
        </Card>
    );
}

export default Random;