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
        <Thumbnail src={ habitat.image } width="100%" height="33%">
          <h3><a onClick={ () => { global.habitat = habitat.name; this.props.history.pushState(null, '/habitat.html/') } } >{ habitat.name }</a></h3>
          <p>Suitability: {habitat.suitability}</p>
          <p><b>Countries: </b></p>
              <p className="pre-scrollable" max-height="150">
                {Object.keys(habitat.assoc_countries).map(
                  (x, i) =>
                    <a onClick={() => {global.country = habitat.assoc_countries[x];
                    this.props.history.pushState(null,'/country.html/') }}> {habitat.assoc_countries[x]}  </a>
                )}
              </p>

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
