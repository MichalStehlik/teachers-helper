import {useState, useEffect} from "react";
import {
    Card, CardText, CardBody,
    CardTitle, Button, Progress, Row, Col, Input
  } from 'reactstrap';
import {useParams} from "react-router-dom";

const Countdown = () => {
    let {hours, minutes, seconds} = useParams();
    if (hours === undefined) hours = 0;
    if (minutes === undefined) minutes = 15;
    if (seconds === undefined) seconds = 0;
    const [paused, setPaused] = useState(true);
    const [over, setOver] = useState(false);
    const [is, setIS] = useState(seconds);
    const [im, setIM] = useState(minutes);
    const [ih, setIH] = useState(hours);
    const [[h, m, s], setTime] = useState([ih, im, is]);
    const tick = () => {
        if (paused || over) return;
        if (h === 0 && m === 0 && s === 0) setOver(true);
        else if (m === 0 && s === 0) {
            setTime([h - 1, 59, 59]);
        }
        else if (s === 0) {
            setTime([h, m - 1, 59]);
        }
        else {
            setTime([h, m, s - 1]);
        }
    }
    useEffect(()=>{
        let t = setInterval(() => tick(), 1000);
        return () => clearInterval(t);
    },[paused, over, h, m, s]);

    let totalSec = 24 * 60 * 60 * h + 60 * 60 * m + 60 * s;
    let totalInitSec = 24 * 60 * 60 * ih + 60 * 60 * im + 60 * is;
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h1">Odpočet času</CardTitle>
                {over
                ?
                <CardText className="display-3 text-center">Konec</CardText>
                :
                <CardText className="display-3 text-center">{h.toString().padStart(2,"0")}:{m.toString().padStart(2,"0")}:{s.toString().padStart(2,"0")}</CardText>
                }
                <Progress value={totalSec / totalInitSec * 100} color={totalSec / totalInitSec < 0.1 ? "danger" : totalSec / totalInitSec < 0.33 ? "warning" : "success"} />
                <Row className="mt-3">
                    <Col>
                        <Button block color={paused ? "success" : "danger"} onClick={e => {setPaused(!paused)}}>{paused ? "Spustit" : "Zastavit"}</Button>
                    </Col>
                    <Col>
                        <Button block onClick={e => {setTime([ih,im,is]); setPaused(true);setOver(false);}}>Reset</Button>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col>
                        <Input type="number" value={ih} onChange={e => { setIH(Number(e.target.value)) }} />
                    </Col>
                    <Col>
                        <Input type="number" value={im} onChange={e => { setIM(Number(e.target.value)) }} />
                    </Col>
                    <Col>
                        <Input type="number" value={is} onChange={e => { setIS(Number(e.target.value)) }} />
                    </Col>
                    <Col>
                        <Button block onClick={e => {
                            setTime([ih,im,is]); setPaused(true); setOver(false);
                        }} >Nastavit startovní čas</Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default Countdown;