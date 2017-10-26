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
      axios.get('https://raw.githubusercontent.com/gvikei/idb/react-khuyen/static/animals_data.json')
        .then(function(data) {
          that.setState({
            animals: data.data
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
            <h3>{animals[keyName].common_name}</h3>
            <p><b>Scientific name: &nbsp; </b>{keyName}</p>
            <p><b>Vulnerability status: &nbsp; </b>{animals[keyName].vulnerability_status}</p>
            <p><b>Threats: &nbsp; </b> {animals[keyName].threats}</p>
            <Button onClick={(e)=> this.setState({ open: !this.state.open })}>
              <b>Video</b>
            </Button>
            <Collapse in={!this.state.open}>
                <iframe class="col-sm-12" height="333" frameborder="0" allowfullscreen="" src={this.reformatYoutubeURL(animals[keyName].video_url)}/>
            </Collapse>
            <p><b>Countries: &nbsp; </b>
              {Object.keys(animals[keyName].countries).map(
                 (x, i) => (
                    animals[keyName].countries[x] + ", "
                 )
              )}
            </p>
            <p><b>Habitats: &nbsp; </b>: {animals[keyName].habitats} </p>
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

                <Row max-height="100px" overflow="scroll">
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
