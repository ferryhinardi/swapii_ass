'use strict';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchSpecies } from '../actions/speciesesActions';
import DetailObject from '../components/DetailObject';
import _ from 'lodash';

class Species extends Component {
  constructor(props) {
    super(props);

    this.fields = {
      name: 'Name',
      classification: 'Classification',
      designation: 'Designation',
      average_height: 'Average Height',
      skin_colors: 'Skin Colors',
      hair_colors: 'Hair Colors',
      eye_colors: 'Eye Colors',
      average_lifespan: 'Average Lifespan',
      homeworld: 'Homeworld',
      language: 'Language',
      people: 'People',
      films: 'Films'
    };
  }

  componentDidMount() {
    const { id } = this.props.routeParams;
    this.props.dispatch(fetchSpecies(id));
  }

  goBack() {
    browserHistory.goBack();
  }

  render() {
    if (this.props.specieses.isFetching) {
      return (
        <div>Loading species data...</div>
      );
    } else {
      const params = this.props.specieses.detail;
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
    specieses: state.specieses,
    fireReducer: state.fireReducer
  };
}

Species.propTypes = {
  routeParams: PropTypes.string,
  specieses: PropTypes.object,
  fireReducer: PropTypes.array,
  dispatch: PropTypes.func
};

export default connect(mapStateToProps)(Species);
