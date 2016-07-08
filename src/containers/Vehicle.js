'use strict';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchVehicle } from '../actions/vehiclesActions';
import DetailObject from '../components/DetailObject';
import _ from 'lodash';

class Vehicle extends Component {
  constructor(props) {
    super(props);

    this.fields = {
      name: 'Name',
      model: 'Model',
      manufacturer: 'Manufacturer',
      cost_in_credits: 'Cost in Credits',
      length: 'Length',
      max_atmosphering_speed: 'Max Atmosphering Speed',
      crew: 'Crew',
      passengers: 'Passengers',
      cargo_capacity: 'Cargo Capacity',
      consumables: 'Consumables',
      vehicle_class: 'Vehicle Class',
      pilots: 'Pilots',
      films: 'Films'
    };
  }

  componentDidMount() {
    const { id } = this.props.routeParams;
    this.props.dispatch(fetchVehicle(id));
  }

  goBack() {
    browserHistory.goBack();
  }

  render() {
    if (this.props.vehicles.isFetching) {
      return (
        <div>Loading vehicle data...</div>
      );
    } else {
      const params = this.props.vehicles.detail;
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
    vehicles: state.vehicles,
    fireReducer: state.fireReducer
  };
}

Vehicle.propTypes = {
  routeParams: PropTypes.string,
  vehicles: PropTypes.object,
  fireReducer: PropTypes.array,
  dispatch: PropTypes.func
};


export default connect(mapStateToProps)(Vehicle);
