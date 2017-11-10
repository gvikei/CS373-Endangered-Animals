import React from 'react';
import { IndexRoute, Route } from 'react-router';

import ComponentsPage from './ComponentsPage';
import About from './About';
import Animals from './Animals';
import Animal from './Animal';
import Threats from './Threats';
import Threat from './Threat';
import Habitats from './Habitats';
import Habitat from './Habitat';
import Countries from './Countries';
import Country from './Country';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import Root from './Root';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={HomePage} />
    <Route path="about.html" component={About} />
    <Route path="animals.html" component={Animals} />
    <Route path="animal.html" component={Animal} />
    <Route path="threats.html" component={Threats} />
    <Route path="threat.html" component={Threat} />
    <Route path="habitats.html" component={Habitats} />
    <Route path="habitat.html" component={Habitat} />
    <Route path="countries.html" component={Countries} />
    <Route path="country.html" component={Country} />

    <Route path="*" component={NotFoundPage} />
  </Route>
);
