import React, { Component, PropTypes } from 'react';
import {Navbar, NavItem, Grid, Nav, NavDropdown, MenuItem, Glyphicon, /* FormGroup, FormControl */} from 'react-bootstrap';
import Swedish from '../content/images/Flag_of_Sweden.png';
import British from '../content/images/Flag_of_United_Kingdom.png';

import SearchField from './searchField';

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
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this)
    }
    componentWillMount()
        {
            this.setState({
                 searchText: ''
            });
        }
    /*
     <form><FormGroup>
     <FormControl type="text" />
     <FormControl bsClass="hidden-search"  type="text" />
     </FormGroup></form>


<p>{ this.props.text.search }</p>
<p>{ this.props.text.settings} </p>
    */
    onChange(event) {
        const field = event.target.name;
        const value = event.target.value;
        let newState = this.state;
        newState[field] = value;
        return this.setState(newState);
    }

    render(){
    const flag = flags.find(f => f.locale === this.props.locale);
    return (
     <Navbar fluid collapseOnSelect inverse fixedTop >
        <Grid>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">{ this.props.text.appName }</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem onSelect={() => this.props.changeFilter('BIKES_AVAILABLE')} active={ this.props.filter==='BIKES_AVAILABLE'} eventKey={1} href="#">{ this.props.text.bikes }</NavItem>
                    <NavItem onSelect={() => this.props.changeFilter('PARKS_AVAILABLE')} active={ this.props.filter==='PARKS_AVAILABLE'} eventKey={2} href="#">{ this.props.text.spaces }</NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={5} href="#" onSelect={ () => this.props.searchStations(this.state.searchText) } >
                            <SearchField placeholder={ this.props.text.search } onChange={this.onChange} name="searchText"  />
                            {' '}
                            <Glyphicon glyph="search" />
                    </NavItem>
                    <NavItem eventKey={3} href="#">
                        <div style={{ textAlign: 'center'}}>
                            <Glyphicon glyph="cog" />
                        </div>
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
};
export default Menu