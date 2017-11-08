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


  changeURL(type, data){
    if(typeof data !== "undefined")
      global.instance = data;
    this.context.router.push('/'+type+".html/");
  };

  instanceFormatter(data){
    return <a onClick={ () => { that.changeURL("animal", data) } } >{ data }</a>;
  };

  imageFormatter(data){
    return <img src={ data } height="250px" width="250px" />;
  };

  linkFormatter(data){
    return <a href={ data } target="_blank">{ data }</a>
  };

  countriesFormatter(data){
    return;
  }

  render() {
    if(!this.state.animals.length)
      return ( <div /> )

    return (
      <div>
        <NavMain activePage="animals" />

         <PageHeader
          title="Animals"
          subTitle=""/>

           <BootstrapTable data={this.state.animals} striped={true} hover={true} ref='table' pagination={true} search={true} columnFilter={true}>
            <TableHeaderColumn dataField="imageLink"            dataAlign="center"                  dataFormat={this.imageFormatter}    > Image                </TableHeaderColumn>
            <TableHeaderColumn dataField="name"                 dataAlign="center" dataSort={true}  dataFormat={this.instanceFormatter} > Name                 </TableHeaderColumn>
            <TableHeaderColumn dataField="scientificName"       dataAlign="center" dataSort={true}  isKey={true}                        > Scientific Name      </TableHeaderColumn>
            <TableHeaderColumn dataField="vulnerability"        dataAlign="center" dataSort={true}                                      > Vulnerability        </TableHeaderColumn>
            <TableHeaderColumn dataField="videoLink"            dataAlign="center" dataSort={true}  dataFormat={this.linkFormatter}     > Video                </TableHeaderColumn>
            <TableHeaderColumn dataField="citationLink"         dataAlign="center" dataSort={true}                                      > Citation             </TableHeaderColumn>
            <TableHeaderColumn dataField="conservationMeasure"  dataAlign="center" dataSort={true}                                      > Conservation Measure </TableHeaderColumn>
            <TableHeaderColumn dataField="webLink"              dataAlign="center" dataSort={true}  dataFormat={this.linkFormatter}     > Source               </TableHeaderColumn>
            <TableHeaderColumn dataField="assoc_habitats"       dataAlign="center" dataSort={true}                                      > Associated Habitats  </TableHeaderColumn>
            <TableHeaderColumn dataField="assoc_threats"        dataAlign="center" dataSort={true}                                      > Associated Threats   </TableHeaderColumn>
            <TableHeaderColumn dataField="assoc_countries"      dataAlign="center" dataSort={true}                                      > Associated Countries </TableHeaderColumn>
          </BootstrapTable>

        <PageFooter />
      </div>
  );
  }
}

Animals.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Animals;
