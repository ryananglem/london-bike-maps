import React, { Component, PropTypes } from 'react';
import {Navbar, NavItem, Grid, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import Swedish from '../content/images/Flag_of_Sweden.png';
import British from '../content/images/Flag_of_United_Kingdom.png';

const flags = [
    {
        locale: 'en',
        flag: British
    },
    {
        locale: 'se',
        flag: Swedish
    }];

class Menu extends Component {

    render(){
    const flag = flags.find(f => f.locale === this.props.locale);
    return (
     <Navbar collapseOnSelect inverse fixedTop>
        <Grid>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">{ this.props.text.appName }</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem onSelect={() => this.props.changeFilter('BIKES_AVAILABLE')} active={ this.props.filter==='BIKES_AVAILABLE'} eventKey={1} href="#">{ this.props.text.bikes }</NavItem>
                    <NavItem onSelect={() => this.props.changeFilter('PARKS_AVAILABLE')} active={ this.props.filter==='PARKS_AVAILABLE'} eventKey={2} href="#">{ this.props.text.spaces }</NavItem>
                    <NavItem eventKey={3} href="#">{ this.props.text.settings }</NavItem>
                </Nav>
            <Nav pullRight>
                <NavDropdown id="language-selector" title={ <div><img className="flag" alt={flag.locale}  src={flag.flag}  /></div> } eventKey={4} >
                <MenuItem onSelect={() => this.props.languageSelected('en')} eventKey={'en'}><img className="flag" src={British} alt="British Flag"/> English</MenuItem>
                <MenuItem onSelect={() => this.props.languageSelected('se')} eventKey={'se'}><img className="flag" src={Swedish} alt="Svenska Flagga"/>Svenska</MenuItem>
            </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Grid>
    </Navbar>
    )}
}
Menu.propTypes = {
    locale: PropTypes.string.isRequired,
    text: PropTypes.object.isRequired,
    languageSelected: PropTypes.func.isRequired,
    changeFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired
};
export default Menu