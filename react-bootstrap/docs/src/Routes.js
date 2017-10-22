import React from 'react';
import { IndexRoute, Route } from 'react-router';

import ComponentsPage from './ComponentsPage';
import About from './About';
import Animals from './Animals';
import Threats from './Threats';
import Habitats from './Habitats';
import Countries from './Countries';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import Root from './Root';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={HomePage} />
    <Route path="about.html" component={About} />
    <Route path="animals.html" component={Animals} />
    <Route path="threats.html" component={Threats} />
    <Route path="habitats.html" component={Habitats} />
    <Route path="countries.html" component={Countries} />

    <Route path="*" component={NotFoundPage} />
  </Route>
);
