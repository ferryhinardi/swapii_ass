'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchFilms, fetchMoreFilms } from '../actions/filmsActions';
import StringHelper from '../utils/stringHelper';
import ReactMDL, { List, ListItem, ListItemContent } from 'react-mdl';
import ListObject from '../components/ListObject';
import _ from 'lodash';
import Infinite from 'react-infinite';

class Films extends React.Component {
  constructor(props) {
    super(props);

    this.fields = {
      title: 'Title',
      opening_crawl: 'Description',
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchFilms());
  }

  onRowClick(film) {
    browserHistory.push({
      pathname: StringHelper.getFullRoutes(film.url)
    });
  }

  handleInfiniteLoad() {
    this.props.dispatch(fetchMoreFilms());
  }

  elementInfiniteLoad() {
    return (<div className="infinite-list-item">
          Loading...
        </div>)
  }

  render() {
    if (this.props.films.isFetching) {
      return (
        <div>Loading films...</div>
      );
    } else {
      const width = (100 / Object.keys(this.fields).length);
      return (
        <List data-test="films-list">
          <ListItem style={{backgroundColor: '#cdcdcd'}}>
            {
              Object.keys(this.fields).map((field, i) => {
                return (
                  <ListItemContent style={{width: width}} key={i}>{this.fields[field]}</ListItemContent>
                );
              })
            }
          </ListItem>
          <Infinite
            containerHeight={500}
            elementHeight={40}
            infiniteLoadBeginEdgeOffset={200}
            onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
            loadingSpinnerDelegate={this.elementInfiniteLoad()}
            isInfiniteLoading={this.props.films.isFetchingMore}
          >
          {
            this.props.films.data.results.map((film, i) => {
              _.merge(film, {
                fields: this.fields,
                onRowClick: this.onRowClick.bind(this, film)
              });
              return <ListObject key={i} { ...film } />;
            })
          }
          </Infinite>
        </List>
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    films: state.films
  };
}

export default connect(mapStateToProps)(Films);