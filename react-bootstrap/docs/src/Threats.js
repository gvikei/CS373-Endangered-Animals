import React from 'react';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

var axios = require('axios');

class Threats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        open: true,
        model: [],
        pages: null,
        loading: true,
        type: "threat",
        typeProper: "Threats",
        subTitle: "Understanding danger is key for protection"
    };
    this.instanceFormatter = this.instanceFormatter.bind(this);
    this.animalFormatter = this.animalFormatter.bind(this);
    this.habitatFormatter = this.habitatFormatter.bind(this);

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
      type = this.state.type;
    return <a onClick={ () => { this.changeURL(type, data) } } >{ data }</a>;
  };

  linkFormatter(data){
    return <a href={ data } target="_blank">{ data }</a>
  };

  render() {
    if(!this.state.model.length)
      return ( <div /> )

    return (
      <div>
        <NavMain activePage={this.state.type} />

         <PageHeader
          title={this.state.typeProper}
          subTitle={this.state.subTitle}/>

           <BootstrapTable data={this.state.model} striped={true} hover={true} ref='table' pagination={true} search={true} columnFilter={true}>
            <TableHeaderColumn dataField="image"            dataAlign="center"                                dataFormat={this.imageFormatter}    > Image                 </TableHeaderColumn>
            <TableHeaderColumn dataField="name"             dataAlign="center" dataSort={true} isKey={true}   dataFormat={this.instanceFormatter} > Name                  </TableHeaderColumn>
            <TableHeaderColumn dataField="severity"         dataAlign="center" dataSort={true}                                                    > Severity              </TableHeaderColumn>
            <TableHeaderColumn dataField="timing"           dataAlign="center" dataSort={true}                                                    > Timing                </TableHeaderColumn>
            <TableHeaderColumn dataField="assoc_animals"    dataAlign="center"                                dataFormat={this.animalFormatter}   > Associated Animals    </TableHeaderColumn>
            <TableHeaderColumn dataField="assoc_habitats"   dataAlign="center"                                dataFormat={this.habitatFormatter}  > Associated Habitats   </TableHeaderColumn>
          </BootstrapTable>

        <PageFooter />
      </div>
  );
  }
}

Threats.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Threats;
