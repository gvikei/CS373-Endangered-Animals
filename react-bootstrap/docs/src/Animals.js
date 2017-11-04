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
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import _ from "lodash";

var axios = require('axios');
var animals;

const requestData = (pageSize, page, sorted, filtered) => {
  return new Promise((resolve, reject) => {

    var filteredData;

    axios.create({
      baseURL: 'https://swe-endangered-animals.appspot.com/',
      headers: {"Access-Control-Allow-Origin": "*"}
    }).get('/all_animal_data')
      .then(function(data) {
        filteredData = data.data;

        const sortedData = _.orderBy(
          filteredData,
          sorted.map(sort => {
            return row => {
              if (row[sort.id] === null || row[sort.id] == undefined) {
                return -Infinity;
              }
              return typeof row[sort.id] === "string" ?
                row[sort.id].toLowerCase() : row[sort.id];
            }
          }),
          sorted.map(d => (d.desc ? "desc" : "asc"))
        );

        const res = {
          rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
          pages: Math.ceil(filteredData.length / pageSize)
        }

        return res;
      });
  });
};

class Animals extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        open: true,
        animals: [],
        pages: null,
        loading: true
    };

    // requestData(
    //   state.pageSize,
    //   state.page,
    //   state.sorted,
    //   state.filtered
    // ).then(res => {
    //   // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
    //   this.setState({
    //     animals: res.rows,
    //     pages: res.pages,
    //     loading: false
    //   });
    // });

    var that = this;
    axios.create({
      baseURL: 'https://swe-endangered-animals.appspot.com/',
      headers: {"Access-Control-Allow-Origin": "*"}
    }).get('/all_animal_data')
      .then(function(data) {
        that.setState({
          animals: data.data
        });
    });
  };

  shouldComponentUpdate() {
    return true;
  };


  changeURL(type, data) {
    if(typeof data !== "undefined")
      global.instance = data;
    this.context.router.push('/'+type+".html/");
  };

  renderAnimal(animal) {
    return (
      <Col sm={3} className="bs-docs-body" key={ animal.name }>
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

         <BootstrapTable data={this.state.animals} striped={true} hover={true}>
            <TableHeaderColumn dataField="name" isKey={true} dataAlign="center" dataSort={true}>Name</TableHeaderColumn>
            <TableHeaderColumn dataField="scientificName" isKey={true} dataAlign="center" dataSort={true}>Scientific Name</TableHeaderColumn>
            <TableHeaderColumn dataField="vulnerability" isKey={true} dataAlign="center" dataSort={true}>Vulnerability</TableHeaderColumn>
            <TableHeaderColumn dataField="citationLink" isKey={true} dataAlign="center" dataSort={true}>Citation Link</TableHeaderColumn> 
            <TableHeaderColumn dataField="conservationMeasure" isKey={true} dataAlign="center" dataSort={true}>Conservation Measure</TableHeaderColumn>
            <TableHeaderColumn dataField="videoLink" isKey={true} dataAlign="center" dataSort={true}>Video</TableHeaderColumn>
            <TableHeaderColumn dataField="imageLink" isKey={true} dataAlign="center" dataSort={true}>Image</TableHeaderColumn>
            <TableHeaderColumn dataField="webLink" isKey={true} dataAlign="center" dataSort={true}>Web Link</TableHeaderColumn>
            <TableHeaderColumn dataField="assoc_habitats" isKey={true} dataAlign="center" dataSort={true}>Associated Habitats</TableHeaderColumn> 
            <TableHeaderColumn dataField="assoc_threats" isKey={true} dataAlign="center" dataSort={true}>Associated Threats</TableHeaderColumn> 
            <TableHeaderColumn dataField="assoc_countries" isKey={true} dataAlign="center" dataSort={true}>Associated Countries</TableHeaderColumn> 
        </BootstrapTable>,

        <PageFooter />
      </div>
  );
  }
}

Animals.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Animals;
