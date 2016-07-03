'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { fetchPerson } from '../actions/peopleActions';
import DetailObject from '../components/DetailObject';
import _ from 'lodash';

class Person extends React.Component {
  constructor(props) {
    super(props);

    this.fields = {
      name: 'Name',
      height: 'Height',
      mass: 'Mass',
      hair_color: 'Hair Color',
      skin_color: 'Skin Color',
      eye_color: 'Eye Color',
      birth_year: 'Birth Year',
      gender: 'Gender',
      homeworld: 'Homeworld',
      films: 'Films',
      species: 'Species',
      vehicles: 'Vehicles',
      starships: 'Starships'
    };
  }

  componentDidMount() {
    const { id } = this.props.routeParams;
    this.props.dispatch(fetchPerson(id));
  }

  goBack() {
    browserHistory.goBack();
  }

  render() {
    if (this.props.people.isFetching) {
      return (
        <div>Loading person data...</div>
      );
    } else {
      const params = this.props.people.detail;
      _.merge(params, {
        fields: this.fields,
        goBack: this.goBack,
        reducer: this.props.fireReducer.data
      })
      return (
          <DetailObject { ...params } />
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    people: state.people,
    fireReducer: state.fireReducer
  };
}

export default connect(mapStateToProps)(Person);
