import React from 'react';

import NavMain from './NavMain';
import PageFooter from './PageFooter';
import Grid from '../../src/Grid';
import Alert from '../../src/Alert';
import Glyphicon from '../../src/Glyphicon';
import Label from '../../src/Label';
import Carousel from '../../src/Carousel';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <NavMain activePage="home" />

        <div>
          <Carousel>
            <Carousel.Item>
              <img className={"carousel"} src="http://animals.sandiegozoo.org/sites/default/files/2016-10/animals_hero_penguin_02_1.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="http://www.cambridgeblog.org/wp-content/uploads/2015/05/What-is-an-Animal.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="http://animals.sandiegozoo.org/sites/default/files/2016-10/animals_hero_penguin_02_1.jpg" />
            </Carousel.Item>
          </Carousel>
        </div>
        
      </div>
    );
  }
}
