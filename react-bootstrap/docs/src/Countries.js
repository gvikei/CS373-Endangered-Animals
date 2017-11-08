import React from 'react';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

var axios = require('axios');

class Countries extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        open: true,
        countries: [],
        pages: null,
        loading: true
    };
    this.instanceFormatter = this.instanceFormatter.bind(this);
    this.animalFormatter = this.animalFormatter.bind(this);
    this.habitatFormatter = this.habitatFormatter.bind(this);
    this.threatFormatter = this.threatFormatter.bind(this);

    var that = this;
    axios.create({
      baseURL: 'https://swe-endangered-animals.appspot.com/',
      headers: {"Access-Control-Allow-Origin": "*"}
    }).get('/all_country_data')
      .then(function(data) {
        that.setState({
          countries: data.data
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
      type = "country";
    return <a onClick={ () => { this.changeURL(type, data) } } >{ data }</a>;
  };

  linkFormatter(data){
    return <a href={ data } target="_blank">{ data }</a>
  };

  mapFormatter(name){
    return (
      <iframe id="gmap_canvas" width="100%" src={ "https://maps.google.com/maps?q=" + name + "&t=k&z=6&ie=UTF8&iwloc=&output=embed" } frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
      </iframe>
    );
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
    if(!this.state.countries.length)
      return ( <div /> )

    return (
      <div>
        <NavMain activePage="countries" />

         <PageHeader
          title="Countries"
          subTitle="Click on a country to begin exploring its ecosystem."/>

           <BootstrapTable data={this.state.countries} striped={true} hover={true} ref='table' pagination={true} search={true} columnFilter={true}>
            <TableHeaderColumn dataField="flag"             dataAlign="center"                                dataFormat={this.imageFormatter}    > Image                </TableHeaderColumn>
            <TableHeaderColumn dataField="name"             dataAlign="center" dataSort={true} isKey={true}   dataFormat={this.instanceFormatter} > Name                 </TableHeaderColumn>
            <TableHeaderColumn dataField="assoc_animals"    dataAlign="center"                                dataFormat={this.animalFormatter}   > Associated Animals   </TableHeaderColumn>
            <TableHeaderColumn dataField="assoc_habitats"   dataAlign="center"                                dataFormat={this.habitatFormatter}  > Associated Habitats  </TableHeaderColumn>
            <TableHeaderColumn dataField="name"             dataAlign="center"                                dataFormat={this.mapFormatter}      > Map                  </TableHeaderColumn>
          </BootstrapTable>

        <PageFooter />
      </div>
  );
  }
}

Countries.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Countries;