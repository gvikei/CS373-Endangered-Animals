import React from 'react';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import Row from '../../src/Row';
import Col from '../../src/Col';
import Thumbnail from '../../src/Thumbnail';


var axios = require('axios');

class Animal extends React.Component {

  constructor(props) {
    super(props);

    this.renderAnimal = this.renderAnimal.bind(this);
    this.state = {
      animal: {},
      type: "animal"
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
    }).get('/single_animal_data/?animal_name='+$_GET['q'])
      .then(function(data) {
        that.setState({
          animal: data.data
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

  formatVideo(url) {
    if(!url)
      return;

    var videoID = url.substring(url.indexOf("v=") + 2, url.length);
    var videoURL = "https://www.youtube.com/embed/" + videoID;

    return (
      <iframe display="block" height="500px" width="100%" src={ videoURL }/>
    );
  };

  renderAnimal() {
    return (
      <Thumbnail src={ this.state.animal.imageLink }>
          <p><b>Scientific name: &nbsp; </b>{ this.state.animal.scientificName }</p>
          <p><b>Vulnerability status: &nbsp; </b>{ this.state.animal.vulnerability }</p>
          <p>{ this.formatVideo(this.state.animal.videoLink) }</p>

          <p><b>Threats: &nbsp; </b></p>
            <ul>
              {
                this.state.animal.assoc_threats.map(function(threat, i){
                  return (
                    <a key={"at"+i} onClick={() => { this.changeURL('threat', threat) }} >
                      <li key={"t"+i}>{ threat }</li>
                    </a>
                  )
                }.bind(this))
              }
            </ul>


          <p><b>Habitats:</b></p>
            <ul>
              {
                this.state.animal.assoc_habitats.map(function(habitat, i){
                  return (
                    <a key={"ah"+i} onClick={() => { this.changeURL('habitat', habitat) }} >
                      <li key={"h"+i}>{ habitat }</li>
                    </a>
                  )
                }.bind(this))
              }
            </ul>

          <p><b>Countries:</b></p>
            <ul>
              {
                this.state.animal.assoc_countries.map(function(country, i){
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
    if(typeof this.state.animal.name == "undefined")
      return ( <div /> )

    return (
      <div>
        <NavMain activePage={this.state.type} />

        <PageHeader
          title={ this.state.animal.name } />

          <div className="container bs-docs-container bs-docs-single-col-container">
            <div className="bs-docs-section">
          
              <Row>
                { 
                  this.renderAnimal()
                }
              </Row>

            </div>
          </div>

        <PageFooter />
      </div>
    );
  };
};

Animal.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Animal;
