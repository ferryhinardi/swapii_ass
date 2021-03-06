'use strict';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchPlanet } from '../actions/planetsActions';
import DetailObject from '../components/DetailObject';
import _ from 'lodash';

class Planet extends Component {
  constructor(props) {
    super(props);

    this.fields = {
      name: 'Name',
      rotation_period: 'Rotation Period',
      orbital_period: 'Orbital Period',
      diameter: 'Diameter',
      climate: 'Climate',
      gravity: 'Gravity',
      terrain: 'Terrain',
      surface_water: 'Surface Water',
      population: 'Population',
      residents: 'Residents',
      films: 'Films'
    };
  }

  componentDidMount() {
    const { id } = this.props.routeParams;
    this.props.dispatch(fetchPlanet(id));
  }

  goBack() {
    browserHistory.goBack();
  }

  render() {
    if (this.props.planets.isFetching) {
      return (
        <div>Loading planet data...</div>
      );
    } else {
      const params = this.props.planets.detail;
      _.merge(params, {
        fields: this.fields,
        goBack: this.goBack,
        reducer: this.props.fireReducer.data
      });
      return (
          <DetailObject {...params} />
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    planets: state.planets,
    fireReducer: state.fireReducer
  };
}

Planet.propTypes = {
  routeParams: PropTypes.string,
  planets: PropTypes.object,
  fireReducer: PropTypes.array,
  dispatch: PropTypes.func
};

export default connect(mapStateToProps)(Planet);
