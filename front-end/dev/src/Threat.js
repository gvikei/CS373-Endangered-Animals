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
        <p></p>
        <p><b>Severity: &nbsp; </b>{ instance.severity }</p>
        <p><b>Timing: &nbsp; </b>{ instance.timing }</p>
        <p><b>Animals: &nbsp; </b></p>
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
          
          <p><b>Habitats:</b></p>
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

          <div className="container bs-docs-container bs-docs-single-col-container">
            <div className="bs-docs-section">
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
