import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, Badge
} from "reactstrap";
import {useAppContext} from "../providers/ApplicationProvider";

const Navigation = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [{students}] = useAppContext();
    const toggle = () => setIsOpen(!isOpen);
    return (
        <Navbar color="light" light expand="md" fixed="top">
            <NavbarBrand tag={Link} to="/">Učitelův pomocníček</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/random">Číslo</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/countdown">Odpočet</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/random-student" disabled={students.length === 0}>Student</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/order" disabled={students.length === 0}>Seznam</NavLink>
                    </NavItem>
                </Nav>
                <Nav navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/setup">Nastavení studentů <Badge color="secondary">{students.length}</Badge></NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default Navigation;