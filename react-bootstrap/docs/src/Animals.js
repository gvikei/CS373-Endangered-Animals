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

    renderAnimals(animals, keyName) {
      return (
        <Col sm={6} className="bs-docs-body" >
          <Thumbnail src={animals[keyName].image_url}>
            <h3>{keyName}</h3>
            <p>Common name: {animals[keyName].common_name}</p>
            <p>Vulnerability Status: {animals[keyName].vulnerability_status}</p>
            <p>Threats: {animals[keyName].threats}</p>
            Video:

            <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
              Video
            </Button>
            <Collapse in={this.state.open}>

              <Well>
                {animals[keyName].video_url}
              </Well>

            </Collapse>

            <p>Countries: {animals[keyName].countries} {" "}</p>
            <p>Habitats: {animals[keyName].habitats} {" "}</p>
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

                  <Row className="container-fluid">
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
