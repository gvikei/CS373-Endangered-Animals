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
      	console.log('heroes data',data);
      	var type = that.state.heroes;
      	var name_attr = "hero_name";

      	type["children"] = [];
      	var items = data.data;
      	if (items.length > 1) {
      	  for (var i in items) {
            type.children.push({
              "name": items[i][name_attr]
            });
          }
        }

      });

    //PLAYERS
    getter.get('/overwatch_all_top_players')
      .then(function(data) {
        console.log('players data',data);
        var type = that.state.players;
        var name_attr = "top_player_name";

        type["children"] = [];
      	var items = data.data;
      	if (items.length > 1) {
      	  for (var i in items) {
            type.children.push({
              "name": items[i][name_attr]
            });
          }
        }
      });

    //ACHIEVEMENTS
    getter.get('/overwatch_all_achievements')
      .then(function(data) {
        var type = that.state.achievements;
        var name_attr = "achievement_name";

      	type["children"] = [];
      	var items = data.data;
      	if (items.length > 1) {
      	  for (var i in items) {
            type.children.push({
              "name": items[i][name_attr]
            });
          }
        }
      });


    //SKINS
    getter.get('/overwatch_all_skins')
      .then(function(data) {
        var type = that.state.skins;
        var name_attr = "skin_name";

      	type["children"] = [];
      	var items = data.data;
      	if (items.length > 1) {
      	  for (var i in items) {
            type.children.push({
              "name": items[i][name_attr]
            });
          }
        }
      });

    //ITEMS
    getter.get('/overwatch_all_items')
      .then(function(data) {
        var type = that.state.items;
        var name_attr = "item_name";

      	type["children"] = [];
      	var items = data.data;
      	if (items.length > 1) {
      	  for (var i in items) {
      	  type.children.push({
  	    		"name": items[i][name_attr]
  	    	});
          }
        }
      });

    this.state.data.children.push(this.state.heroes);
    this.state.data.children.push(this.state.players);
    this.state.data.children.push(this.state.achievements);
    this.state.data.children.push(this.state.skins);
    this.state.data.children.push(this.state.items);
  };

  render() {
  	if(!this.state.data.children.length)
  		return ( <div /> );

    return (
      <div>
      	<NavMain activePage={this.state.type} />

        <D3Tree treeData={this.state.data}/>

        <PageFooter />
      </div>
  	);
  }
}

export default Visualization;
