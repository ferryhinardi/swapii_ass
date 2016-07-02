'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchPlanets, fetchMorePlanets } from '../actions/planetsActions';
import StringHelper from '../utils/stringHelper';
import ReactMDL, { List, ListItem, ListItemContent } from 'react-mdl';
import ListObject from '../components/ListObject';
import _ from 'lodash';
import Infinite from 'react-infinite';

class Planets extends React.Component {
  constructor(props) {
    super(props);

    this.fields = {
      name: 'Name'
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchPlanets());
  }

  onRowClick(planet) {
    browserHistory.push({
      pathname: StringHelper.getFullRoutes(planet.url)
    });
  }

  handleInfiniteLoad() {
    this.props.dispatch(fetchMorePlanets());
  }

  elementInfiniteLoad() {
    return (<div className="infinite-list-item">
          Loading...
        </div>)
  }

  render() {
    if (this.props.planets.isFetching) {
      return (
        <div>Loading planets...</div>
      );
    } else {
      const width = (80 / Object.keys(this.fields).length);
      return (
        <List>
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
            isInfiniteLoading={this.props.planets.isFetchingMore}
          >
          {
            this.props.planets.data.results.map((planet, i) => {
              _.merge(planet, {
                fields: this.fields,
                onRowClick: this.onRowClick.bind(this, planet)
              });
              return <ListObject key={i} { ...planet } />;
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
    planets: state.planets
  };
}

export default connect(mapStateToProps)(Planets);
