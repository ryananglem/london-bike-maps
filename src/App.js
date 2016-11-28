import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { withTranslate /*, IntlActions */ } from 'react-redux-multilingual'

import {Navbar, NavItem, Grid, Nav } from 'react-bootstrap';

const App = (props) =>
    <div>
        <Navbar inverse fixedTop>
            <Grid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">London Bike Maps</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">{props.translate('parks')}</NavItem>
                        <NavItem eventKey={2} href="#">{props.translate('spaces')}</NavItem>
                        <NavItem eventKey={3} href="#">{props.translate('settings')}</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Grid>
        </Navbar>
        { props.children }
    </div>

function mapStateToProps(state) {
    return {}
}
const mapDispatchToEvents = (dispatch) => {
    return {}
};
export default withTranslate(connect(mapStateToProps, mapDispatchToEvents)(App));
