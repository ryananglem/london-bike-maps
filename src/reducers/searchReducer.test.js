
import { stationSearch, requestStationSearch, receiveStationSearch, noSearchTerm, noStationFound  } from '../actions/searchActions'
import searchReducer from './searchReducer';

const initialState = {
    searchText:'',
    searchResults: []
};

const stations = [
    { id: 1, name:'North Greenwich', coords: { lat: 51.5, lng: 0 }, infoWindowIsOpen: true},
    { id: 2, name:'King Edward Park', coords: { lat: 51.51, lng: -0.05 }, infoWindowIsOpen: false}
];

it('requests a station search', () => {
    const searchText='Park';
    const action = requestStationSearch(searchText);

    const newState = searchReducer(initialState, action);

    expect(newState.searchText).toEqual(searchText);
    expect(newState.searchResults).toEqual([]);
});

it('receives a station search', () => {
    const action = receiveStationSearch(stations);
    const newState = searchReducer(initialState, action);

    //expect(newState.searchText).toEqual(searchText);
    expect(newState.searchResults).toEqual(stations);
});

it('station search returns no results', () => {
    const action = noStationFound();
    const newState = searchReducer(initialState, action);

    expect(newState.searchResults).toEqual([]);
});

it('station search term is empty', () => {
    const action = noSearchTerm();
    const newState = searchReducer(initialState, action);

    expect(newState.searchResults).toEqual([]);
});