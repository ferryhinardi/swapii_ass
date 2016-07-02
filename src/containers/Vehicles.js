'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchVehicles, fetchMoreVehicles } from '../actions/vehiclesActions';
import StringHelper from '../utils/stringHelper';
import ReactMDL, { List, ListItem, ListItemContent } from 'react-mdl';
import ListObject from '../components/ListObject';
import _ from 'lodash';
import Infinite from 'react-infinite';

class Vehicles extends React.Component {
  constructor(props) {
    super(props);

    this.fields = {
      name: 'Name'
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchVehicles());
  }

  onRowClick(vehicle) {
    browserHistory.push({
      pathname: StringHelper.getFullRoutes(vehicle.url)
    });
  }

  handleInfiniteLoad() {
    this.props.dispatch(fetchMoreVehicles());
  }

  elementInfiniteLoad() {
    return (<div className="infinite-list-item">
          Loading...
        </div>)
  }

  render() {
    if (this.props.vehicles.isFetching) {
      return (
        <div>Loading vehicles...</div>
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
            isInfiniteLoading={this.props.vehicles.isFetchingMore}
          >
          {
            this.props.vehicles.data.results.map((vehicle, i) => {
              _.merge(vehicle, {
                fields: this.fields,
                onRowClick: this.onRowClick.bind(this, vehicle)
              });
              return <ListObject key={i} { ...vehicle } />;
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
    vehicles: state.vehicles
  };
}

export default connect(mapStateToProps)(Vehicles);