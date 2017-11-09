# react-tables

> React table component.

* React components
* Flux integration
* Scrollable with fixed headers
* Pagination
* Integrate with Bootstrap 3

### Installation

```bash
npm install react-tables
```

### Usage
```js
var React = require('react');
var Table = require('react-tables');
var RowInformation = require('./RowInformation');

var columns = [
  { title: 'Name', field: 'name' },
  { title: 'Info', field: 'information', component: RowInformation },
  { title: 'Id', field: 'id', formatter: function (value, row) {
      return '<a href="/user/'+value +'">' + value + '</a>';
    }
  }
];

var data = [
  { name: 'foo', information: { age: 12 }, id: 1 },
  { name: 'bar', information: { age: 11 }, id: 2 }, 
  { name: 'baz', information: { age: 10 }, id: 3 }
];

React.createClass({
  getData: function (params) {
    console.log(params); // { limit: 10, skip: 0 }

    var self = this;

    setTimeout(function () {
      self.setData();
    }, 1000);
  }

  setData: function () {
    return {
      rows: data,
      totalRows: 3
    };
  }

  render: function () {
    <div>
      <Table ref='table' columns={columns} getData={getData} >
    </div>,
  }
});
```

### API

| Param      | Type     | Description        |
| ---        | ---      | ---                |
| columns    | Array    | Columns config     |
| pageNumber | Number   | Init page: 1, 2, 3 |
| pageSize   | Numer    | Size table         |
| classes    | String   | Classname table    |
| getData    | Function | Fetch function     |

#### Columns

| Param     | Type     | Description                 |
| ---       | ---      | ---                         |
| title     | String   | Column title                |
| field     | String   | Field name                  |
| formatter | Function | The cell formatter function |
| Component | Object   | React component             |

### License
MIT 
