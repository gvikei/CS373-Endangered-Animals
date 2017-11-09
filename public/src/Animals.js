import React from 'react';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

var axios = require('axios');

class Animals extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        open: true,
        model: [],
        pages: null,
        loading: true,
        type: "animal",
        typeProper: "Animals",
        subTitle: "Explore the diversity of our world"
    };
    this.instanceFormatter = this.instanceFormatter.bind(this);
    this.countryFormatter = this.countryFormatter.bind(this);
    this.habitatFormatter = this.habitatFormatter.bind(this);
    this.threatFormatter = this.threatFormatter.bind(this);

    var that = this;
    axios.create({
      baseURL: 'https://swe-endangered-animals.appspot.com/',
      headers: {"Access-Control-Allow-Origin": "*"}
    }).get('/all_'+this.state.type+'_data')
      .then(function(data) {
        that.setState({
          model: data.data
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

  countryFormatter(list){
    var type = "country";

    var links = list.map(function(x, i){
      return ( <li key={type+x+i}> { this.instanceFormatter(x, null, type) } </li> );
    }.bind(this));

    return (
      <div>
        <ul>
          { links }
        </ul>
      </div>
    );
  };

  habitatFormatter(list){
    var type = "habitat";
    
    var links = list.map(function(x, i){
      return ( <li key={type+x+i}> { this.instanceFormatter(x, null, type) } </li> );
    }.bind(this));

    return (
      <div>
        <ul>
          { links }
        </ul>
      </div>
    );
  };

  imageFormatter(data){
    return <img src={ data } height="250px" width="250px" />;
  };

  instanceFormatter(data, row, type){
    if(typeof type == "undefined")
      type = this.state.type;
    return <a onClick={ () => { this.changeURL(type, data) } } >{ data }</a>;
  };

  linkFormatter(data){
    return <a href={ data } target="_blank">{ data }</a>
  };

  threatFormatter(list){
    var type = "threat";
    
    var links = list.map(function(x, i){
      return ( <li key={type+x+i}> { this.instanceFormatter(x, null, type) } </li> );
    }.bind(this));

    return (
      <div>
        <ul>
          { links }
        </ul>
      </div>
    );
  };

  render() {
        const options = {
      page: 1,      
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: '20', value: 20
      } ], 
      sizePerPage: 5,  
      pageStartIndex: 1, 
      paginationSize: 3,  
      prePage: 'Prev', 
      nextPage: 'Next', 
      firstPage: 'First', 
      lastPage: 'Last', 
      paginationShowsTotal: this.renderShowsTotal,  
      paginationPosition: 'top' 
    };

    if(!this.state.model.length)
      return ( <div /> )

    return (
      <div class="container">
        <NavMain activePage={this.state.type} />

         <PageHeader
          title={this.state.typeProper}
          subTitle={this.state.subTitle}/>

           <BootstrapTable data={this.state.model} striped={true} hover={true} ref='table' pagination={true} search={true} columnFilter={true} options={ options }  >
            <TableHeaderColumn dataField="imageLink"            dataAlign="center"                  dataFormat={this.imageFormatter}    width="250"> Image                </TableHeaderColumn>
            <TableHeaderColumn dataField="name"                 dataAlign="center" dataSort={true}  dataFormat={this.instanceFormatter} width='250'> Name                 </TableHeaderColumn>
            <TableHeaderColumn dataField="scientificName"       dataAlign="center" dataSort={true}  isKey={true}                        height="10"> Scientific Name      </TableHeaderColumn>
            <TableHeaderColumn dataField="vulnerability"        dataAlign="center" dataSort={true}                                      > Vulnerability        </TableHeaderColumn>
            <TableHeaderColumn dataField="videoLink"            dataAlign="center" dataSort={true}  dataFormat={this.linkFormatter}     > Video                </TableHeaderColumn>
            <TableHeaderColumn dataField="citationLink"         dataAlign="center" dataSort={true}                                      > Citation             </TableHeaderColumn>
            <TableHeaderColumn dataField="conservationMeasure"  dataAlign="center" dataSort={true}                                      > Conservation Measure </TableHeaderColumn>
            <TableHeaderColumn dataField="webLink"              dataAlign="center" dataSort={true}  dataFormat={this.linkFormatter}     > Source               </TableHeaderColumn>
            <TableHeaderColumn dataField="assoc_threats"        dataAlign="center"                  dataFormat={this.threatFormatter}   > Associated Threats   </TableHeaderColumn>
            <TableHeaderColumn dataField="assoc_habitats"       dataAlign="center"                  dataFormat={this.habitatFormatter}  > Associated Habitats  </TableHeaderColumn>
            <TableHeaderColumn dataField="assoc_countries"      dataAlign="center"                  dataFormat={this.countryFormatter}  > Associated Countries </TableHeaderColumn>
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
