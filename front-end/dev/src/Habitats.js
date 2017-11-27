import React from 'react';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

var axios = require('axios');

class Habitats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        open: true,
        model: [],
        pages: null,
        loading: true,
        type: "habitat",
        typeProper: "Habitats",
        subTitle: "Witness the beauty of nature"
    };
    this.instanceFormatter  = this.instanceFormatter.bind(this);
    this.txtFormatter       = this.txtFormatter.bind(this);
    this.animalFormatter    = this.animalFormatter.bind(this);
    this.countryFormatter   = this.countryFormatter.bind(this);

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

  highlight(data) {
    var item = document.querySelector('.form-group.form-group-sm.react-bs-table-search-form>input');
    if (item && item.value && data) {
      var keyword = item.value;
      var regex = new RegExp(keyword, 'ig');
      return {__html: data.replace(regex, function(match){ return '<b><u>' + match + '</u></b>' }) }
    }
    return {__html: data}
  };

  animalFormatter(list){
    var type = "animal";

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

  imageFormatter(data){
    return <img src={ data } height="250px" width="250px" />;
  };

  instanceFormatter(data, row, type){
    if(typeof type == "undefined")
      type = this.state.type;
    return <a onClick={ () => { this.changeURL(type, data) } } dangerouslySetInnerHTML={this.highlight(data)}></a>;
  };

  txtFormatter(data){
    return <p dangerouslySetInnerHTML={this.highlight(data)}></p>;
  };

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

    if(!this.state.model.length)
      return ( <div /> )

    return (
      <div>
        <NavMain activePage={this.state.type} />

         <PageHeader
          title={this.state.typeProper}
          subTitle={this.state.subTitle}/>

           <BootstrapTable data={this.state.model} striped={true} hover={true} ref='table' pagination={true} search={true} columnFilter={true} options={options}>
            <TableHeaderColumn width='200' dataField="image"            dataAlign="center"                                dataFormat={this.imageFormatter}    > Image                 </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="name"             dataAlign="center" dataSort={true} isKey={true}   dataFormat={this.instanceFormatter} > Name                  </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="suitability"      dataAlign="center" dataSort={true}                dataFormat={this.txtFormatter}      > Suitability           </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="assoc_animals"    dataAlign="left"                                  dataFormat={this.animalFormatter}   > Associated Animals    </TableHeaderColumn>
            <TableHeaderColumn width='200' dataField="assoc_countries"  dataAlign="left"                                  dataFormat={this.countryFormatter}  > Associated Countries  </TableHeaderColumn>

          </BootstrapTable>

        <PageFooter />
      </div>
  );
  }
}

Habitats.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Habitats;
