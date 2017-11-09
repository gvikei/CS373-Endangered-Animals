import React from 'react';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import Row from '../../components/Row';
import Col from '../../components/Col';
import Thumbnail from '../../components/Thumbnail';


var axios = require('axios');

class Threat extends React.Component {

  constructor(props) {
    super(props);

    this.renderThreat = this.renderThreat.bind(this);
    this.state = {
      threat: {},
      type: "threat"
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
    }).get('/single_threat_data/?threat_name='+$_GET['q'])
      .then(function(data) {
        that.setState({
          threat: data.data
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

  renderThreat(instance) {
    return (
      <Thumbnail src={instance.image}>
        <Row>
          <Col>
            Severity
          </Col>
          <Col>
            { instance.severity }
          </Col>
        </Row>
        <Row>
          <Col>
            Timing
          </Col>
          <Col>
            { instance.timing }
          </Col>
        </Row>
        <Row>
          <Col>
            Animals
          </Col>
          <Col>
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
          <Col>
            Habitats
          </Col>
          <Col>
            <ul>
              {
                instance.assoc_habitats.map(function(habitat, i){
                    return (
                      <a key={"ah"+i} onClick={() => { this.changeURL('habitat', habitat) }} >
                        <li key={"h"+i}>{ habitat }</li>
                      </a>
                    )
                }.bind(this))
              }
            </ul>
          </Col>
        </Row>
      </Thumbnail>
    );
  };

  render() {
    if(typeof this.state.threat.name == "undefined")
      return ( <div /> );

    return (
      <div>
        <NavMain activePage={this.state.type} />

        <PageHeader
          title={ this.state.threat.name } />

          <div className="container bs-public-container bs-public-single-col-container">
            <div className="bs-public-section">
              <Row>
                { this.renderThreat(this.state.threat) }
              </Row>
            </div>
          </div>

        <PageFooter />
      </div>
    );
  };
}

Threat.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Threat;
