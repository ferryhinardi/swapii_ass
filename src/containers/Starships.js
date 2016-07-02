'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchStarships, fetchMoreStarships } from '../actions/starshipsActions';
import StringHelper from '../utils/stringHelper';
import ReactMDL, { List, ListItem, ListItemContent } from 'react-mdl';
import ListObject from '../components/ListObject';
import _ from 'lodash';
import Infinite from 'react-infinite';

class Starships extends React.Component {
  constructor(props) {
    super(props);

    this.fields = {
      name: 'Name'
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchStarships());
  }

  onRowClick(starship) {
    browserHistory.push({
      pathname: StringHelper.getFullRoutes(starship.url)
    });
  }

  handleInfiniteLoad() {
    this.props.dispatch(fetchMoreStarships());
  }

  elementInfiniteLoad() {
    return (<div className="infinite-list-item">
          Loading...
        </div>)
  }

  render() {
    if (this.props.starships.isFetching) {
      return (
        <div>Loading starships...</div>
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
            isInfiniteLoading={this.props.starships.isFetchingMore}
          >
          {
            this.props.starships.data.results.map((starship, i) => {
              _.merge(starship, {
                fields: this.fields,
                onRowClick: this.onRowClick.bind(this, starship)
              });
              return <ListObject key={i} { ...starship } />;
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
    starships: state.starships
  };
}

export default connect(mapStateToProps)(Starships);
