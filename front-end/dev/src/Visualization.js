import React from 'react';
import D3Tree from './D3Tree';

import NavMain from './NavMain';
import PageFooter from './PageFooter';

var axios = require('axios');

class Visualization extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	type: "visualization",

    	data: {
    		"name": "Group 4",
    		"children": []
    	},
    
	    heroes: {
	    	"name": "Heroes"
	    },

	    players: {
	    	"name": "Top Players"
	    },

	    achievements: {
	    	"name": "Achievements"
	    },

	    skins: {
	    	"name": "Skins"
	    },

	    items: {
	    	"name": "Items"
	    }
    };

    var that = this;

    var getter = axios.create({
      baseURL: 'https://swe-endangered-animals.appspot.com',
      headers: {"Access-Control-Allow-Origin": "*"}
    });

    //HEROES
    getter.get('/overwatch_all_heroes')
      .then(function(data) {
      	var type = that.state.heroes;
      	var name_attr = "hero_name";

      	type["children"] = [];
      	var items = data.data;
        for(var i=0; i<items.length && i<10; i++){
          if(items[i][name_attr])
          type.children.push({
            "name": items[i][name_attr]
          });
        }
        type.children = (type.children.length ? type.children : null);
        that.state.data.children.push(type);
        that.setState({ "ready" : true });
      });

    //PLAYERS
    getter.get('/overwatch_all_top_players')
      .then(function(data) {
        var type = that.state.players;
        var name_attr = "top_player_name";

        type["children"] = [];
      	var items = data.data;
        for(var i=0; i<items.length && i<10; i++){
          if(items[i][name_attr])
          type.children.push({
            "name": items[i][name_attr]
          });
        }
        type.children = (type.children.length ? type.children : null);
        that.state.data.children.push(type);
        that.setState({ "ready" : true });
      });

    //ACHIEVEMENTS
    getter.get('/overwatch_all_achievements')
      .then(function(data) {
        var type = that.state.achievements;
        var name_attr = "achievement_name";

      	type["children"] = [];
      	var items = data.data;
        for(var i=0; i<items.length && i<10; i++){
          if(items[i][name_attr])
          type.children.push({
            "name": items[i][name_attr]
          });
        }
        type.children = (type.children.length ? type.children : null);
        that.state.data.children.push(type);
        that.setState({ "ready" : true });
      });


    //SKINS
    getter.get('/overwatch_all_skins')
      .then(function(data) {
        var type = that.state.skins;
        var name_attr = "skin_name";

      	type["children"] = [];
      	var items = data.data;
        for(var i=0; i<items.length && i<10; i++){
          if(items[i][name_attr])
          type.children.push({
            "name": items[i][name_attr]
          });
        }
        type.children = (type.children.length ? type.children : null);
        that.state.data.children.push(type);
        that.setState({ "ready" : true });
      });

    //ITEMS
    getter.get('/overwatch_all_items')
      .then(function(data) {
        var type = that.state.items;
        var name_attr = "item_name";

      	type["children"] = [];
      	var items = data.data;
        for(var i=0; i<items.length && i<10; i++){
          if(items[i][name_attr])
      	  type.children.push({
  	    		"name": items[i][name_attr]
  	    	});
        }
        type.children = (type.children.length ? type.children : null);
        that.state.data.children.push(type);
        that.setState({ "ready" : true });
      });
  };

  shouldComponentUpdate() {
    return true;
  };

  render() {
  	if(this.state.data.children.length < 5)
  		return (
        <div>
          <NavMain activePage={this.state.type} />

          <h3><center>This interactive tree diagram shows a simple representation of the data sets for Group 4.</center></h3>


        </div>
      );

    return (
      <div>
      	<NavMain activePage={this.state.type} />

        <h3><center>This interactive tree diagram shows a simple representation of the data sets for Group 4.</center></h3>

        <D3Tree treeData={this.state.data}/>

        <PageFooter />
      </div>
  	);
  }
}

export default Visualization;
