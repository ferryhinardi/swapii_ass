'use strict';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchStarship } from '../actions/starshipsActions';
import DetailObject from '../components/DetailObject';
import _ from 'lodash';

class Starship extends Component {
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
      hyperdrive_rating: 'Hyperdrive Rating',
      MGLT: 'MGLT',
      starship_class: 'Starship Class',
      pilots: 'Pilots',
      films: 'Films'
    };
  }

  componentDidMount() {
    const { id } = this.props.routeParams;
    this.props.dispatch(fetchStarship(id));
  }

  goBack() {
    browserHistory.goBack();
  }

  render() {
    if (this.props.starships.isFetching) {
      return (
        <div>Loading starship data...</div>
      );
    } else {
      const params = this.props.starships.detail;
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
    starships: state.starships,
    fireReducer: state.fireReducer
  };
}

Starship.propTypes = {
  routeParams: PropTypes.string,
  starships: PropTypes.object,
  fireReducer: PropTypes.array,
  dispatch: PropTypes.func
};

export default connect(mapStateToProps)(Starship);
