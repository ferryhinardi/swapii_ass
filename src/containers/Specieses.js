'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchSpecieses, fetchMoreSpecieses } from '../actions/speciesesActions';
import StringHelper from '../utils/stringHelper';
import ReactMDL, { List, ListItem, ListItemContent } from 'react-mdl';
import ListObject from '../components/ListObject';
import _ from 'lodash';
import Infinite from 'react-infinite';

class Specieses extends React.Component {
  constructor(props) {
    super(props);

    this.fields = {
      name: 'Name'
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchSpecieses());
  }

  onRowClick(species) {
    browserHistory.push({
      pathname: StringHelper.getFullRoutes(species.url)
    });
  }

  handleInfiniteLoad() {
    this.props.dispatch(fetchMoreSpecieses());
  }

  elementInfiniteLoad() {
    return (<div className="infinite-list-item">
          Loading...
        </div>)
  }

  render() {
    if (this.props.specieses.isFetching) {
      return (
        <div>Loading species...</div>
      );
    } else {
      const width = (80 / Object.keys(this.fields).length);
      return (
        <List data-test="species-list">
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
            isInfiniteLoading={this.props.specieses.isFetchingMore}
          >
          {
            this.props.specieses.data.results.map((species, i) => {
              _.merge(species, {
                fields: this.fields,
                onRowClick: this.onRowClick.bind(this, species)
              });
              return <ListObject key={i} { ...species } />;
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
    specieses: state.specieses
  };
}

export default connect(mapStateToProps)(Specieses);
