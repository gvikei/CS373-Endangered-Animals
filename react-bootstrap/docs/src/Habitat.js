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
      animal: {}
    };

    var that = this;
    axios.create({
      baseURL: 'https://swe-endangered-animals.appspot.com/',
      headers: {"Access-Control-Allow-Origin": "*"}
    }).get('/single_habitat_data/?habitat_name='+global.instance)
      .then(function(data) {
        console.log(data);
        that.setState({
          animal: data.data
        });
    });
  };

  shouldComponentUpdate() {
    return true;
  };

  renderCountry() {
    return (
      <Thumbnail src={ this.state.animal.image } width="100%" height="33%">
        <p>Suitability: {this.state.animal.suitability}</p>
        <p><b>Countries: </b></p>
            <p className="pre-scrollable" max-height="150">
              {Object.keys(this.state.animal.assoc_countries).map(
                (x, i) =>
                  <a onClick={() => {global.country = this.state.animal.assoc_countries[x];
                  this.props.history.pushState(null,'/country.html/') }}> {this.state.animal.assoc_countries[x]}  </a>
              )}
            </p>

      </Thumbnail>
    );
  };

  render() {
    return (
      <div>
        <NavMain activePage="animals" />

        <PageHeader
          title={ global.habitat } />

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
