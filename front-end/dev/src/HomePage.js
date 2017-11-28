import React from 'react';

import NavMain from './NavMain';
import PageFooter from './PageFooter';
import Grid from '../../components/Grid';
import Alert from '../../components/Alert';
import Glyphicon from '../../components/Glyphicon';
import Label from '../../components/Label';
import Carousel from '../../components/Carousel';
import Modal from '../../components/Modal';
import FormControl from '../../components/FormGroup';
import FormGroup from '../../components/FormControl';
import Button from '../../components/Button';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

var axios = require('axios');

const MyLargeModal = React.createClass({
  render() {
    const options = {
      page: 1,
      sizePerPageList: [ {
        text: '10', value: 10
      }, {
        text: '20', value: 20
      }, {
        text: '30', value: 30
      } ],
      sizePerPage: 10,
      pageStartIndex: 1,
      paginationSize: 5,
      prePage: 'Prev',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      paginationShowsTotal: this.renderShowsTotal,
      paginationPosition: 'top'
    };

    var model_types = ['animal','threat','habitat','country'];


    return (

      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Animals</h4>

            <BootstrapTable data={this.props.model['animal']} striped={true} hover={true} ref='table' pagination={true} search={true} columnFilter={false} >

            <TableHeaderColumn width='200' dataField="imageLink"            dataAlign="center"                   dataFormat={this.imageFormatter}                 > Image                </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="name"                 dataAlign="center"  dataSort={true}  dataFormat={this.instanceFormatter}              > Name                 </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="scientificName"       dataAlign="center"  dataSort={true}  dataFormat={this.txtFormatter}      isKey={true} > Scientific Name      </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="vulnerability"        dataAlign="center"  dataSort={true}  dataFormat={this.txtFormatter}                   > Vulnerability        </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="videoLink"            dataAlign="center"  dataSort={true}  dataFormat={this.linkFormatter}                  > Video                </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="citationLink"         dataAlign="left"    dataSort={true}  dataFormat={this.txtFormatter}                   > Citation             </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="conservationMeasure"  dataAlign="center"  dataSort={true}  dataFormat={this.txtFormatter}                   > Conservation Measure </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="webLink"              dataAlign="center"  dataSort={true}  dataFormat={this.linkFormatter}                  > Source               </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="assoc_threats"        dataAlign="left"    dataSort={true}  dataFormat={this.threatFormatter}                > Associated Threats   </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="assoc_habitats"       dataAlign="left"    dataSort={true}  dataFormat={this.habitatFormatter}               > Associated Habitats  </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="assoc_countries"      dataAlign="left"    dataSort={true}  dataFormat={this.countryFormatter}               > Associated Countries </TableHeaderColumn>
          </BootstrapTable>

          <h4> Habitats </h4>
           <BootstrapTable data={this.props.model['habitat']} striped={true} hover={true} ref='table' pagination={true} search={true} columnFilter={false} >
            <TableHeaderColumn width='200' dataField="image"            dataAlign="center"                                dataFormat={this.imageFormatter}    > Image                 </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="name"             dataAlign="center" dataSort={true} isKey={true}   dataFormat={this.instanceFormatter} > Name                  </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="suitability"      dataAlign="center" dataSort={true}                dataFormat={this.txtFormatter}      > Suitability           </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="assoc_animals"    dataAlign="left"                                  dataFormat={this.animalFormatter}   > Associated Animals    </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="assoc_countries"  dataAlign="left"                                  dataFormat={this.countryFormatter}  > Associated Countries  </TableHeaderColumn>
          </BootstrapTable>

          <h4> Countries </h4>
           <BootstrapTable data={this.props.model['country']} striped={true} hover={true} ref='table' pagination={true} search={true} columnFilter={false} >
            <TableHeaderColumn width='200' dataField="image"            dataAlign="center"                                dataFormat={this.imageFormatter}    > Image                 </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="name"             dataAlign="center" dataSort={true} isKey={true}   dataFormat={this.instanceFormatter} > Name                  </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="suitability"      dataAlign="center" dataSort={true}                dataFormat={this.txtFormatter}      > Suitability           </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="assoc_animals"    dataAlign="left"                                  dataFormat={this.animalFormatter}   > Associated Animals    </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="assoc_countries"  dataAlign="left"                                  dataFormat={this.countryFormatter}  > Associated Countries  </TableHeaderColumn>
          </BootstrapTable>

          <h4> Threats </h4>
           <BootstrapTable data={this.props.model['threat']} striped={true} hover={true} ref='table' pagination={true} search={true} columnFilter={false} >
            <TableHeaderColumn width='200' dataField="image"            dataAlign="center"                                dataFormat={this.imageFormatter}    > Image                 </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="name"             dataAlign="center" dataSort={true} isKey={true}   dataFormat={this.instanceFormatter} > Name                  </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="suitability"      dataAlign="center" dataSort={true}                dataFormat={this.txtFormatter}      > Suitability           </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="assoc_animals"    dataAlign="left"                                  dataFormat={this.animalFormatter}   > Associated Animals    </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="assoc_countries"  dataAlign="left"                                  dataFormat={this.countryFormatter}  > Associated Countries  </TableHeaderColumn>
          </BootstrapTable>


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  },
});

export default class HomePage extends React.Component {

  handleClick(e) {
    this.setState({
      lgModalShow : !this.state.lgModalShow
    });
    console.log('lgModalShow', this.state.lgModalShow);
  }

  constructor(props) {
    super(props);

    this.state = {
      lgModalShow: false,
      type: "animal",
      model: {}
    }

     var that = this;

    var copy =  {'animal':[], 'threat': [], 'habitat':[], 'country': []};
    var model_types = ['animal','threat','habitat','country'];


    axios.create({
      baseURL: 'https://swe-endangered-animals.appspot.com/',
      headers: {"Access-Control-Allow-Origin": "*"}
    }).get('/all_animal_data')
      .then(function (data) {
        copy['animal'] = data.data;
        console.log('copy', copy);
        that.setState({
          model: copy
        });
      });

    axios.create({
      baseURL: 'https://swe-endangered-animals.appspot.com/',
      headers: {"Access-Control-Allow-Origin": "*"}
    }).get('/all_threat_data')
      .then(function (data) {
        copy['threat'] = data.data;
        console.log('copy', copy);
        that.setState({
          model: copy
        });
      });

    axios.create({
      baseURL: 'https://swe-endangered-animals.appspot.com/',
      headers: {"Access-Control-Allow-Origin": "*"}
    }).get('/all_habitat_data')
      .then(function (data) {
        copy['habitat'] = data.data;
        console.log('copy', copy);
        that.setState({
          model: copy
        });
      });

    axios.create({
      baseURL: 'https://swe-endangered-animals.appspot.com/',
      headers: {"Access-Control-Allow-Origin": "*"}
    }).get('/all_country_data')
      .then(function (data) {
        copy['country'] = data.data;
        console.log('copy', copy);
        that.setState({
          model: copy
        });
      });

  };

  render() {
    let lgClose = () => this.setState({ lgModalShow: false });

    return (
      <div>
        <NavMain activePage="home"/>

          <FormGroup>
          </FormGroup>
          {' '}
          <Button type="submit" onClick={ ()=> {this.handleClick()}} >
            Search
          </Button>
          <MyLargeModal show={this.state.lgModalShow} onHide={lgClose} model={this.state.model} />

        <div>
          <Carousel>
            <Carousel.Item>
              <img className={"carousel"} src="http://animals.sandiegozoo.org/sites/default/files/2016-10/animals_hero_penguin_02_1.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="http://www.cambridgeblog.org/wp-content/uploads/2015/05/What-is-an-Animal.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="http://animals.sandiegozoo.org/sites/default/files/2016-11/animals_hero_african_spurred_tortoise.jpg" />
            </Carousel.Item>
          </Carousel>
        </div>
        
      </div>
    );
  }
}
