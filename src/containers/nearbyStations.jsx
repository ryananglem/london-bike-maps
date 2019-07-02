import React, { Component } from "react";

import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { getNearbyBikeStations } from "../actions/getNearestStations";
import NearbyStation from "../components/nearbyStation";

class NearbyStations extends Component {
  componentDidMount() {
    this.props.coords &&
      this.props.getNearbyStations(
        { lat: this.props.coords.lat, lng: this.props.coords.lng },
        500
      );
  }
  componentWillUpdate(nextProps, nextState) {
    if (
      nextProps &&
      nextProps.coords &&
      nextProps.coords.lat !== nextProps.searchResults.coords.lat &&
      nextProps.coords.lng !== nextProps.searchResults.coords.lng
    ) {
      this.props.getNearbyStations(
        {
          lat: nextProps.searchResults.coords.lat,
          lng: nextProps.searchResults.coords.lng
        },
        500
      );
    }
  }
  render() {
    if (this.props.stations === undefined) return null;
    const translations = {
      distance: this.props.translate("distance"),
      bikes: this.props.translate("bikes"),
      spaces: this.props.translate("spaces")
    };
    return (
      <div>
        <h4>{this.props.translate("nearbyStations")}</h4>
        {this.props.stations.map(station => {
          return (
            <div key={station.id}>
              <NearbyStation
                text={translations}
                station={station}
                locale={this.props.locale}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { root, Intl } = state;
  const { map, filter, nearbyStation, search } = root;
  const { stations, isFetchingStations, error } = nearbyStation;
  const { locale } = Intl;
  const { coords } = map;
  const { value } = filter;
  const { searchResults } = search;
  return {
    isFetchingStations,
    stations,
    error,
    coords,
    filterValue: value,
    searchResults,
    locale
  };
};
const mapDispatchToEvents = dispatch => {
  return {
    getNearbyStations: (coords, radius) => {
      dispatch(getNearbyBikeStations(coords, radius));
    }
  };
};
export default withTranslate(
  connect(
    mapStateToProps,
    mapDispatchToEvents
  )(NearbyStations)
);
