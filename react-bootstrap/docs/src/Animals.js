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

  class Animals extends React.Component {

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
          that.setState({
            animals: data.data.slice(0,10)
          });
      });
    };

    shouldComponentUpdate() {
      return true;
    };


    changeURL(type, data) {
      global.instance = data;
      this.context.router.push('/'+type+".html/");
    }

    renderAnimals(keyName) {
      var animal = this.state.animals[keyName];

      return (
        <Col sm={3} className="bs-docs-body" key={ keyName }>
          <Thumbnail src={ animal.imageLink }>
            <h3>
              <a onClick={ () => { 
                this.changeURL('animal', animal.name) } } >
                {animal.name}
              </a>
            </h3>

            <Row>
              <Col><b> Scientific name: </b></Col>
              <Col>{animal.scientificName}</Col>
            </Row>

            <Row>
              <Col><b> Vulnerability: </b></Col>
              <Col>{animal.vulnerability}</Col>
            </Row>
            
            <Row>
              <Col><b> Threats: </b></Col>
              <Col>{ animal.assoc_threats.length }</Col>
            </Row>
            
            <Row>
              <Col><b> Habitats: </b></Col>
              <Col>{ animal.assoc_habitats.length }</Col>
            </Row>
            
            <Row>
              <Col><b> Countries: </b></Col>
              <Col>{ animal.assoc_countries.length }</Col>
            </Row>

          </Thumbnail>
        </Col>


      );
    };

    render() {
      if(!this.state.animals.length)
        return ( <div /> )

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
                      return this.renderAnimals(keyName);
                    }.bind(this))
                  }
                </Row>

            </div>

          <PageFooter />
        </div>
    );
    }
  }

  Animals.contextTypes = {
      router: React.PropTypes.object.isRequired
  };

  export default Animals;
