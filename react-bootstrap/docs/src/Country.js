  import React from 'react';

  import NavMain from './NavMain';
  import PageHeader from './PageHeader';
  import PageFooter from './PageFooter';
  import Row from '../../src/Row';
  import Col from '../../src/Col';
  import Thumbnail from '../../src/Thumbnail';


  var axios = require('axios');

  export default class Page extends React.Component {

    constructor(props) {
      super(props);

      this.renderCountry = this.renderCountry.bind(this);
      this.state = {
        country: {}
      };

      var that = this;
      axios.create({
        baseURL: 'https://swe-endangered-animals.appspot.com/',
        headers: {"Access-Control-Allow-Origin": "*"}
      }).get('/single_country_data/?country_name='+global.instance)
        .then(function(data) {
          that.setState({
            country: data.data
          });
      });
    };

    shouldComponentUpdate() {
      return true;
    };

    renderCountry() {
      return (
        <Thumbnail src={ this.state.country.flag } width="100%" height="33%">

          <br/><br/>

          <Row>
            <Col sm={2}>
              <b><a href="animals.html">Animals</a>:</b>
            </Col>
            <Col sm={2}>
              0
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <b><a href="threats.html">Threats</a>:</b>
            </Col>
            <Col sm={2}>
              0
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <b><a href="habitats.html">Habitats</a>:</b>
            </Col>
            <Col sm={2}>
              0
            </Col>
          </Row>

          <br/><br/>
          
          <iframe id="gmap_canvas" width="100%" src={ "https://maps.google.com/maps?q=" + this.state.country.name + "&t=k&z=6&ie=UTF8&iwloc=&output=embed" } frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
          </iframe>
        </Thumbnail>
      );
    };

    render() {
      if(typeof this.state.country.name == "undefined")
        return <div />
      return (
        <div>
          <NavMain activePage="countries" />

          <PageHeader
            title={ this.state.country.name } />

            <div className="container bs-docs-container bs-docs-single-col-container">
              <div className="bs-docs-section">
            
                { /* Countries */ }
                <Row>
                  { 
                    this.renderCountry()
                  }
                </Row>

              </div>
            </div>

          <PageFooter />
        </div>
      );
    };
  }
