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

class Habitats extends React.Component {

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


  changeURL(type, data) {
      if(typeof data !== "undefined")
        global.instance = data;
      this.context.router.push('/'+type+".html/");
  };

  renderHabitats(habitat) {
    return (
      <Col key={ habitat.name } sm={ 3 }>
        <Thumbnail src={ habitat.image } width="100%" height="33%">
          <h3><a onClick={ () => { this.changeURL("habitat", habitat.name) } } >{ habitat.name }</a></h3>
          <Row><Col><b>Suitability:</b></Col><Col>{ habitat.suitability }</Col></Row>
          <Row><Col><a href="animals.html">Animals:</a></Col><Col>{ habitat.assoc_animals.length }</Col></Row>
          <Row><Col><a href="countries.html">Countries:</a></Col><Col>{ habitat.assoc_countries.length }</Col></Row>
        </Thumbnail>
      </Col>
    );
  };

  render() {
    if(!this.state.habitats.length)
      return ( <div /> );
    
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
              (this.state.habitats).map(function(habitat){
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

Habitats.contextTypes = {
      router: React.PropTypes.object.isRequired
  };

export default Habitats;
