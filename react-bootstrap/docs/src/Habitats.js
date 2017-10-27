import React from 'react';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import Row from '../../src/Row';
import Col from '../../src/Col';
import Thumbnail from '../../src/Thumbnail';
import Image from '../../src/Image';
import Panel from '../../src/Panel';
import Button from '../../src/Button';
import Collapse from '../../src/Collapse';
import Well from '../../src/Well';

var axios = require('axios');

export default class Habitats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      habitats: []
    };

    var that = this;
      axios.create({
        baseURL: 'https://swe-endangered-animals.appspot.com/',
        headers: {"Access-Control-Allow-Origin": "*"}
      }).get('/all_habitat_data')
        .then(function(data) {
          console.log(data.data);
          that.setState({
            habitats: data.data.slice(0,10)
          });
      });
  }

  shouldComponentUpdate() {
    return true;
  }

  renderHabitats(habitat) {
    return (

      <Col sm={3} className="bs-docs-body">
        <Thumbnail src={ habitat.imageUrl } width="100%" height="33%">
          <h3>{ habitat.name }</h3>
          <p>Suitability: {habitat.suitability}</p>

        </Thumbnail>
      </Col>
    );
  };

  render() {
    return (
      <div>
        <NavMain activePage="habitats" />

        <PageHeader
          title="Habitats"
          subTitle=""/>

        <div className="container-fluid">

          { /* Habitats */ }

          <Row className="container-fluid">
            {
              (this.state.habitats).map(function(habitat, i){
                return this.renderHabitats(habitat);
              }.bind(this))
            }

          </Row>


        </div>

        <PageFooter />
      </div>
    );
  }
}
