  import React from 'react';

  import NavMain from './NavMain';
  import PageHeader from './PageHeader';
  import PageFooter from './PageFooter';
  import Row from '../../src/Row';
  import Col from '../../src/Col';
  import Thumbnail from '../../src/Thumbnail';
  import Button from '../../src/Button';
  import Collapse from '../../src/Collapse';
  import Well from '../../src/Well';
  import Image from '../../src/Image';
  import Panel from '../../src/Panel';

  var axios = require('axios');
  var animals;

  export default class Animals extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          open: true,
          animals: []
      };

      var that = this;
      axios.create({
        baseURL: 'https://swe-endangered-animals.appspot.com/',
        headers: {"Access-Control-Allow-Origin": "*"}
      }).get('/all_animal_data')
        .then(function(data) {
          console.log(data.data);
          that.setState({
            animals: data.data.slice(0,10)
          });
      });
    }

    shouldComponentUpdate() {
      return true;
    }

    reformatYoutubeURL(url) {
      var videoID = url.substring(url.indexOf("v=") + 2, url.length);
      return "https://www.youtube.com/embed/" + videoID;
    }

    renderAnimals(animals, keyName) {
      return (
        <Col sm={3} className="bs-docs-body">
          <Thumbnail src={animals[keyName].image_url}>
            <h3><a onClick={ () => { global.animal = animals[keyName].name; this.props.history.pushState(null, '/animal.html/') } } >{animals[keyName].name}</a></h3>
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
          <NavMain activePage="animals" />

           <PageHeader
            title="Animals"
            subTitle=""/>

            <div className="container-fluid">

                { /* Animals */ }

                <Row>
                  {
                    Object.keys(this.state.animals).map(function(keyName, keyIndex) {
                      return this.renderAnimals(this.state.animals, keyName);
                    }.bind(this))
                  }
                </Row>

            </div>

          <PageFooter />
        </div>
    );
    }
  }
