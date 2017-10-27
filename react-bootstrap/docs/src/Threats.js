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

  shouldComponentUpdate() {
    return true;
  }

  renderThreats(threat) {


    return (

      <Col sm={3} className="bs-docs-body">
          <Thumbnail src={animals[keyName].imageLink}>
            <h3>{animals[keyName].name}</h3>
            <p><b>Scientific name: &nbsp; </b>{animals[keyName].scientificName}</p>
            <p><b>Vulnerability status: &nbsp; </b>{animals[keyName].vulnerability}</p>
            <p><b>Threats: &nbsp; </b></p>

              <p className="pre-scrollable" max-height="150">
                {Object.keys(animals[keyName].assoc_threats).map(
                  (x, i) =>
                    <a onClick={() => {global.country = animals[keyName].assoc_threats[x];
                    this.props.history.pushState(null,'/threat.html/') }}> {animals[keyName].assoc_threats[x]}  </a>
                )}
              </p>

            <Button onClick={(e)=> this.setState({ open: !this.state.open })}>
              <b>Video</b>
            </Button>
            <Collapse in={!this.state.open}>
                <iframe className="col-sm-12" height="333" frameborder="0" display="block" width="100%"
                        src={this.reformatYoutubeURL(animals[keyName].videoLink)}/>
            </Collapse>
            <p><b>Countries: </b></p>
              <p className="pre-scrollable" max-height="150">

              {Object.keys(animals[keyName].assoc_countries).map(
                  (x, i) =>
                    <a onClick={() => {global.country = animals[keyName].assoc_countries[x];
                    this.props.history.pushState(null,'/country.html/') }}> {animals[keyName].assoc_countries[x]}  </a>
                )}
              </p>

            <p><b>Habitats:</b></p>
              <p className="pre-scrollable" max-height="150">
                {Object.keys(animals[keyName].assoc_habitats).map(
                  (x, i) =>
                    <a onClick={() => {global.country = animals[keyName].assoc_habitats[x];
                    this.props.history.pushState(null,'/habitat.html/') }}> {animals[keyName].assoc_habitats[x]}  </a>
                )}
              </p>

          </Thumbnail>
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
