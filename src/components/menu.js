import React, { Component } from 'react';
import {Navbar, NavItem, Grid, Nav, NavDropdown, MenuItem, Glyphicon, /* FormGroup, FormControl */} from 'react-bootstrap';
import Swedish from '../content/images/Flag_of_Sweden.png';
import British from '../content/images/Flag_of_United_Kingdom.png';
import * as constants from '../config/constants'
import { hashHistory } from 'react-router';
import PropTypes from 'prop-types';

import StationAutoComplete from './stationAutoComplete';

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
    constructor(props, context){
        super(props, context);
        this.state = {
            searchText: ''
        }
    }
    onChange = (event, { newValue, method }) => {
        this.setState({
            searchText: newValue
        });
    }
    onChangeFilter = newFilter => {
        this.props.changeFilter(newFilter)
        hashHistory.push("/")
    }
    onSearch = searchText => {
        this.props.searchStations(searchText)
        hashHistory.push("/")
    }

    render(){
    const flag = flags.find(f => f.locale === this.props.locale);
    return (
     <Navbar fluid inverse fixedTop >
        <Grid>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">{ this.props.text.appName }</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem onSelect={() => this.onChangeFilter(constants.BIKES_AVAILABLE)} active={ this.props.filter===constants.BIKES_AVAILABLE} eventKey={1} href="#">{ this.props.text.bikes }</NavItem>
                    <NavItem onSelect={() => this.onChangeFilter(constants.PARKS_AVAILABLE)} active={ this.props.filter===constants.PARKS_AVAILABLE} eventKey={2} href="#">{ this.props.text.spaces }</NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem>
                        <StationAutoComplete
                            placeholder={ this.props.text.search }
                            onChange={this.onChange}
                            searchText={this.state.searchText}
                            getSuggestions={this.props.getSuggestions}
                        />
                    </NavItem>
                    <NavItem eventKey={5} href="#/" onSelect={ () => this.onSearch(this.state.searchText) }>
                            <Glyphicon glyph="search" />
                    </NavItem>
                    <NavItem eventKey={3} href="#/about" >
                            <Glyphicon glyph="cog" />
                    </NavItem>
                    <NavDropdown id="language-selector" title={ <span style={{ height: 20 + 'px'}}><img className="flag" alt={flag.locale}  src={flag.flag}  /></span> } eventKey={4} >
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
    filter: PropTypes.string.isRequired,
    searchStations: PropTypes.func.isRequired
}
export default Menu