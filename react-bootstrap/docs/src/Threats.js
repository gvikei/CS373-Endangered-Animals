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

class Threats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      threats: []
    };

    var that = this;
      axios.create({
        baseURL: 'https://swe-endangered-animals.appspot.com/',
        headers: {"Access-Control-Allow-Origin": "*"}
      }).get('/all_threat_data')
        .then(function(data) {
          console.log(data.data);
          that.setState({
            threats: data.data.slice(0,10)
          });
      });
  }


  changeURL(type, data) {
      if(typeof data !== "undefined")
        global.instance = data;
      this.context.router.push('/'+type+".html/");
  };

  shouldComponentUpdate() {
    return true;
  }

  renderThreats(threat) {
    return (

      <Col sm={3} className="bs-docs-body">
        <h4><a onClick={ () => { this.changeURL("threat", threat.name) } } >{ threat.name }</a></h4>
        <p><img src={threat.image }/></p>
        <p>Score: {threat.score }</p>
        <p>Timing: { threat.timing }</p>
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

Threats.contextTypes = {
      router: React.PropTypes.object.isRequired
  };

export default Threats;
