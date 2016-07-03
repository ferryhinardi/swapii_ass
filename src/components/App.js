import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Layout, Header, Drawer, Navigation, Content } from 'react-mdl';
import { fetchFireData } from '../actions/fireActions';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  onMenuClick(e) {
    const pathname = e.target.getAttribute('to');
    
    browserHistory.replace({
      pathname: pathname
    });
  }

  componentDidMount() {
    this.props.dispatch(fetchFireData());
  }

  render() {
    return (
      <div>
        <Layout>
          <Header waterfall className="header">
            <Navigation data-test="navigation">
              <a className="nav-item" to="/films" onClick={this.onMenuClick.bind(this)}> Films </a>
              <a className="nav-item" to="/people" onClick={this.onMenuClick.bind(this)}> People </a>
              <a className="nav-item" to="/planets" onClick={this.onMenuClick.bind(this)}> Planets </a>
              <a className="nav-item" to="/species" onClick={this.onMenuClick.bind(this)}> Species </a>
              <a className="nav-item" to="/starships" onClick={this.onMenuClick.bind(this)}> Starships </a>
              <a className="nav-item" to="/vehicles" onClick={this.onMenuClick.bind(this)}> Vehicles </a>
            </Navigation>
          </Header>
          <Drawer title="Star Wars">
            <Navigation>
              <a className="nav-item" to="/films" onClick={this.onMenuClick.bind(this)}> Films </a>
              <a className="nav-item" to="/people" onClick={this.onMenuClick.bind(this)}> People </a>
              <a className="nav-item" to="/planets" onClick={this.onMenuClick.bind(this)}> Planets </a>
              <a className="nav-item" to="/species" onClick={this.onMenuClick.bind(this)}> Species </a>
              <a className="nav-item" to="/starships" onClick={this.onMenuClick.bind(this)}> Starships </a>
              <a className="nav-item" to="/vehicles" onClick={this.onMenuClick.bind(this)}> Vehicles </a>
            </Navigation>
          </Drawer>
          <Content>
            <div className="container">
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default connect()(App);
