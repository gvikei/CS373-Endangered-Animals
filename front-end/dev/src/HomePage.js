import React from 'react';

import NavMain from './NavMain';
import PageFooter from './PageFooter';
import Grid from '../../components/Grid';
import Alert from '../../components/Alert';
import Glyphicon from '../../components/Glyphicon';
import Label from '../../components/Label';
import Carousel from '../../components/Carousel';

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
              <img src="http://animals.sandiegozoo.org/sites/default/files/2016-11/animals_hero_african_spurred_tortoise.jpg" />
            </Carousel.Item>
          </Carousel>
        </div>
        
      </div>
    );
  }
}
