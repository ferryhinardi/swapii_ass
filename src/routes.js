import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';

import App from './components/App';
import Films from './containers/Films';
import Film from './containers/Film';
import People from './containers/People';
import Person from './containers/Person';
import Planets from './containers/Planets';
import Planet from './containers/Planet';
import Specieses from './containers/Specieses';
import Species from './containers/Species';
import Starships from './containers/Starships';
import Starship from './containers/Starship';
import Vehicles from './containers/Vehicles';
import Vehicle from './containers/Vehicle';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/films" />
    <Route path="films" component={Films} />
    <Route path="films/:id" component={Film} />
    <Redirect from="characters" to="people" />
    <Redirect from="pilots" to="people" />
    <Route path="people" component={People} />
    <Redirect from="characters/:id" to="people/:id" />
    <Redirect from="pilots/:id" to="people/:id" />
    <Route path="people/:id" component={Person} />
    <Redirect from="homeworld" to="planets" />
    <Route path="planets" component={Planets} />
    <Redirect from="homeworld/:id" to="planets/:id" />
    <Route path="planets/:id" component={Planet} />
    <Route path="species" component={Specieses} />
    <Route path="species/:id" component={Species} />
    <Route path="starships" component={Starships} />
    <Route path="starships/:id" component={Starship} />
    <Route path="vehicles" component={Vehicles} />
    <Route path="vehicles/:id" component={Vehicle} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
