import React from 'react';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import Row from '../../components/Row';
import Col from '../../components/Col';
import Thumbnail from '../../components/Thumbnail';


var axios = require('axios');

class Habitat extends React.Component {

  constructor(props) {
    super(props);

    this.renderHabitat = this.renderHabitat.bind(this);
    this.state = {
      habitat: {},
      type: "habitat"
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
    }).get('/single_habitat_data/?habitat_name='+$_GET['q'])
      .then(function(data) {
        that.setState({
          habitat: data.data
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

  renderHabitat(instance) {
    return (
      <Thumbnail src={instance.image}>
        <p></p>
        <p><b>Suitability: &nbsp; </b>{ instance.suitability }</p>
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
          
          <p><b>Countries:</b></p>
            <ul>
              {
                instance.assoc_countries.map(function(country, i){
                  return (
                    <a key={"ac"+i} onClick={() => { this.changeURL('country', country) }} >
                      <li key={"c"+i}>{ country }</li>
                    </a>
                  )
                }.bind(this))
              }
            </ul>

      </Thumbnail>
    );
  };

  render() {
    if(typeof this.state.habitat.name == "undefined")
      return ( <div /> );

    return (
      <div>
        <NavMain activePage={this.state.type} />

        <PageHeader
          title={ this.state.habitat.name } />

          <div className="container bs-docs-container bs-docs-single-col-container">
            <div className="bs-docs-section">
              <Row>
              { this.renderHabitat(this.state.habitat) }
              </Row>
            </div>
          </div>

        <PageFooter />
      </div>
    );
  };
}

Habitat.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Habitat;
