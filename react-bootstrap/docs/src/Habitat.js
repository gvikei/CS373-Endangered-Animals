import React from 'react';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import Row from '../../src/Row';
import Col from '../../src/Col';
import Thumbnail from '../../src/Thumbnail';


var axios = require('axios');

class Habitat extends React.Component {

  constructor(props) {
    super(props);

    this.renderHabitat = this.renderHabitat.bind(this);
    this.state = {
      habitat: {},
      type: "habitat"
    };

    //Following snippet of code from ideasandpixels.com
    var $_GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        $_GET[decode(arguments[1])] = decode(arguments[2]);
    });

    var that = this;
    axios.create({
      baseURL: 'https://swe-endangered-animals.appspot.com/',
      headers: {"Access-Control-Allow-Origin": "*"}
    }).get('/single_habitat_data/?habitat_name='+$_GET['q'])
      .then(function(data) {
        that.setState({
          habitat: data.data
        });
    });
  };

  shouldComponentUpdate() {
    return true;
  };


  changeURL(type, data){
    if(typeof data == "undefined")
      data = "";
    this.context.router.push("/"+type+".html/?q="+data);
  };

  renderHabitat(instance) {
    return (
      <Col key={ instance.name } sm={ 3 }>
        <Thumbnail src={ instance.image } width="100%" height="33%">
          <Row>
            <Col sm={2}>
              <b>Suitability:</b>
            </Col>
            <Col sm={2}>
              { instance.suitability }
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <a href="animals.html">Animals:</a>
            </Col>
            <Col sm={2}>
              <ul>
              {
                instance.assoc_animals.map(function(animal, i){
                  return (
                    <a key={"ah"+i} onClick={() => { this.changeURL('animal', animal) }} >
                      <li key={"h"+i}>{ animal }</li>
                    </a>
                  )
                }.bind(this))
              }
              </ul>
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <a href="countries.html">Countries:</a>
            </Col>
            <Col sm={2}>
              <ul>
              {
                instance.assoc_countries.map(function(country, i){
                  return (
                    <a key={"ac"+i} onClick={() => { this.changeURL('country', country) }} >
                      <li key={"c"+i}>{ country }</li>
                    </a>
                  )
                }.bind(this))
              }
              </ul>
            </Col>
          </Row>
        </Thumbnail>
      </Col>
    );
  };

  render() {
    if(typeof this.state.habitat.name == "undefined")
      return ( <div /> );

    return (
      <div>
        <NavMain activePage={this.state.type} />

        <PageHeader
          title={ this.state.habitat.name } />

            <Row>
              { this.renderHabitat(this.state.habitat) }
            </Row>

        <PageFooter />
      </div>
    );
  };
}

Habitat.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Habitat;
