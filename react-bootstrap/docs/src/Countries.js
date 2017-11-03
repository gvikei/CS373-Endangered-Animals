import React from 'react';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import Row from '../../src/Row';
import Col from '../../src/Col';
import Thumbnail from '../../src/Thumbnail';


var axios = require('axios');

class Countries extends React.Component {

  constructor(props) {
    super(props);
    this.renderCountry = this.renderCountry.bind(this);
    this.state = {
      countries: []
    };

    var that = this;
    axios.create({
      baseURL: 'https://swe-endangered-animals.appspot.com/',
      headers: {"Access-Control-Allow-Origin": "*"}
    }).get('/all_country_data')
      .then(function(data) {
        that.setState({
          countries: data.data.slice(0,10)
        });
    });
  };

  shouldComponentUpdate() {
    return true;
  };


  changeURL(type, data) {
    if(typeof data !== "undefined")
      global.instance = data;
    this.context.router.push('/'+type+".html/");
  };

  renderCountry(country) {
    var animals = (country.assoc_animals ? country.assoc_animals.length : 0);
    var habitats = (country.assoc_habitats ? country.assoc_habitats.length : 0);
    return (
      <Col key={country.name} sm={4}>
        <Thumbnail src={ country.flag } width="100%" height="33%">
          <h3><a onClick={ () => { this.changeURL("country", country.name) } } >{ country.name }</a></h3>

          <Row>
            <a href="animals.html">Animals</a>: { animals }
          </Row>
          <Row>
            <a href="habitats.html">Habitats</a>: { habitats }
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
                  this.state.countries.map(function(country, i){
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

Countries.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Countries;
