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

export default class Threats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      threats: []
    };

    var that = this;
      axios.get('https://raw.githubusercontent.com/gvikei/idb/react-khuyen/static/threats_data.json')
        .then(function(data) {
          that.setState({
            threats: data.data
          });
      });
  }

  shouldComponentUpdate() {
    return true;
  }

  renderThreats(threat) {
    return (

      <Col sm={3} className="bs-docs-body">
        <h4>{threat.name}</h4>
        <p>Score: {threat.score}</p>
        <p>Timing: { threat.timing}</p>
      </Col>

    );
  };

  render() {
    return (
      <div>
        <NavMain activePage="threats" />

        <PageHeader
          title="Threats"
          subTitle=""/>

          <div className="container-fluid">

          { /* Threats */ }

          <Row className="container-fluid">
            {

                this.state.threats.map(function(threat, i){
                return this.renderThreats(threat);
              }.bind(this))

            }


          </Row>


        </div>

        <PageFooter />
      </div>
    );
  }
}
