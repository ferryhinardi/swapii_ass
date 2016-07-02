'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { fetchFilm } from '../actions/filmsActions';
import DetailObject from '../components/DetailObject';
import _ from 'lodash';

class Film extends React.Component {
  constructor(props) {
    super(props);

    this.fields = {
      title: 'Title',
      episode_id: 'Episode',
      opening_crawl: 'Description',
      director: 'Director',
      producer: 'Producer',
      release_date: 'Release Date',
      characters: 'Characters',
      planets: 'Planets',
      starships: 'Starships',
      vehicles: 'Vehicles',
      species: 'Species'
    };
  }

  componentDidMount() {
    const { id } = this.props.routeParams;
    this.props.dispatch(fetchFilm(id));
  }

  goBack() {
    browserHistory.goBack();
  }

  render() {
    if (this.props.films.isFetching) {
      return (
        <div>Loading film data...</div>
      );
    } else {
      const params = this.props.films.detail;
      _.merge(params, {
        fields: this.fields,
        goBack: this.goBack
      })
      return (
          <DetailObject { ...params } />
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    films: state.films
  };
}

export default connect(mapStateToProps)(Film);
