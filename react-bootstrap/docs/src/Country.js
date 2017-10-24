  import React from 'react';

  import NavMain from './NavMain';
  import PageHeader from './PageHeader';
  import PageFooter from './PageFooter';
  import Row from '../../src/Row';
  import Col from '../../src/Col';
  import Thumbnail from '../../src/Thumbnail';

  var axios = require('axios');

  var country = {"flag": "http://cdn.wonderfulengineering.com/wp-content/uploads/2015/07/Albania-Flag-6.png", "name": "Albania", "coordinates": {"lat": 41.153332, "lng": 20.168331}};

  export default class Page extends React.Component {

    constructor(props) {
      super(props);

      this.renderCountry = this.renderCountry.bind(this);
    };

    shouldComponentUpdate() {
      return true;
    };

    renderCountry() {
      return (
        <Thumbnail src={ country.flag } width="100%" height="33%">

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
          
          <iframe id="gmap_canvas" width="100%" src={ "https://maps.google.com/maps?q=" + country.name + "&t=k&z=6&ie=UTF8&iwloc=&output=embed" } frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
          </iframe>
        </Thumbnail>
      );
    };

    render() {
      return (
        <div>
          <NavMain activePage="countries" />

          <PageHeader
            title={ country.name } />

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
