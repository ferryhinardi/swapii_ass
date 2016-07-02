'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchPeople, fetchMorePeople } from '../actions/peopleActions';
import StringHelper from '../utils/stringHelper';
import ReactMDL, { List, ListItem, ListItemContent } from 'react-mdl';
import ListObject from '../components/ListObject';
import _ from 'lodash';
import Infinite from 'react-infinite';

class People extends React.Component {
  constructor(props) {
    super(props);

    this.fields = {
      name: 'Name'
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchPeople());
  }

  onRowClick(person) {
    browserHistory.push({
      pathname: StringHelper.getFullRoutes(person.url)
    });
  }

  handleInfiniteLoad() {
    this.props.dispatch(fetchMorePeople());
  }

  elementInfiniteLoad() {
    return (<div className="infinite-list-item">
          Loading...
        </div>)
  }

  render() {
    if (this.props.people.isFetching) {
      return (
        <div>Loading people...</div>
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
            isInfiniteLoading={this.props.people.isFetchingMore}
          >
            {
              this.props.people.data.results.map((people, i) => {
                _.merge(people, {
                  fields: this.fields,
                  onRowClick: this.onRowClick.bind(this, people)
                });
                return <ListObject key={i} { ...people } />;
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
    people: state.people
  };
}

export default connect(mapStateToProps)(People);