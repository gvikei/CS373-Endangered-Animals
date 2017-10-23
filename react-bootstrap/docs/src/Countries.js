  import React from 'react';

  import NavMain from './NavMain';
  import PageHeader from './PageHeader';
  import PageFooter from './PageFooter';
  import Row from '../../src/Row';
  import Col from '../../src/Col';
  import Thumbnail from '../../src/Thumbnail';

  var axios = require('axios');

  var countries = [{"flag": "http://cdn.wonderfulengineering.com/wp-content/uploads/2015/07/Albania-Flag-6.png", "name": "Albania", "coordinates": {"lat": 41.153332, "lng": 20.168331}}, {"flag": "http://cdn.wonderfulengineering.com/wp-content/uploads/2015/07/Algeria-Flag-12.png", "name": "Algeria", "coordinates": {"lat": 28.033886, "lng": 1.659626}}, {"flag": "http://cdn.wonderfulengineering.com/wp-content/uploads/2015/07/American-Samoa-Flag-3.png", "name": "American Samoa", "coordinates": {"lat": -14.270972, "lng": -170.132217}}, {"flag": "http://cdn.wonderfulengineering.com/wp-content/uploads/2015/07/Flag_of_Angola.svg-1.png", "name": "Angola", "coordinates": {"lat": -11.202692, "lng": 17.873887}}, {"flag": "http://2.bp.blogspot.com/-wXeA_hX1S14/ThMD5VlDy_I/AAAAAAAAAlw/XyLANs2pW0M/s1600/Flag+of+Anguilla.gif", "name": "Anguilla", "coordinates": {"lat": 18.220554, "lng": -63.06861499999999}}, {"flag": "http://3.bp.blogspot.com/-NDr2OV7QqJk/UFQcYSMvXGI/AAAAAAAABl0/-ll4BiNGlZk/s1600/Flag+of+Antigua+and+Barbuda+(1).jpg", "name": "Antigua and Barbuda", "coordinates": {"lat": 17.060816, "lng": -61.796428}}];

  export default class Page extends React.Component {

    constructor(props) {
      super(props);

      this.renderCountry = this.renderCountry.bind(this);
    };

    shouldComponentUpdate() {
      return true;
    };

    renderCountry(country) {
      return (
        <Col sm={4}>
          <Thumbnail src={ country.flag } width="100%" height="33%">
            <h3>{ country.name }</h3>

            <Row>
              <a href="animals.html">Animals</a>: 0
            </Row>
            <Row>
              <a href="threats.html">Threats</a>: 0
            </Row>
            <Row>
              <a href="habitats.html">Habitats</a>: 0
            </Row>
            
            <iframe id="gmap_canvas" width="100%" src={ "https://maps.google.com/maps?q=" + country.name + "&t=k&z=6&ie=UTF8&iwloc=&output=embed" } frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
            </iframe>
          </Thumbnail>
        </Col>
      );
    };

    render() {
      return (
        <div>
          <NavMain activePage="countries" />

          <PageHeader
            title="Countries"
            subTitle="Click on a country to begin exploring its ecosystem."/>

            <div className="container bs-docs-container bs-docs-single-col-container">
              <div className="bs-docs-section">
            
                { /* Countries */ }
                <Row>
                  { 
                    countries.map(function(country, i){
                      return this.renderCountry(country);
                    }.bind(this))
                  }
                </Row>

              </div>
            </div>

          <PageFooter />
        </div>
      );
    };
  }
