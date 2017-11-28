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

	    events: {
	    	"name": "Events"
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
      baseURL: 'http://overwatchglamour.me/api',
      headers: {"Access-Control-Allow-Origin": "*"}
    });

    //HEROES
    getter.get('/heroes/')
      .then(function(data) {
      	console.log('heroes data',data);
      	var type = that.state.heroes;
      	var name_attr = "hero_name";

      	type["children"] = [];
      	// data.forEach(function(instance){
  	    // 	type.children.push({
  	    // 		"name": instance.attributes[name_attr]
  	    // 	});
	      // });
      });

    //PLAYERS
    getter.get('/players/')
      .then(function(data) {
        console.log('players data',data);
        var type = that.state.players;
        var name_attr = "top_player_name";

        type["children"] = [];
        // data.forEach(function(instance){
        //  type.children.push({
        //    "name": instance.attributes[name_attr]
        //  });
        // });
      });

    //ACHIEVEMENTS
    getter.get('/achievements/')
      .then(function(data) {
        console.log('achievements data',data);
        var type = that.state.achievements;
        var name_attr = "achievement_name";

        type["children"] = [];
        // data.forEach(function(instance){
        //  type.children.push({
        //    "name": instance.attributes[name_attr]
        //  });
        // });
      });

    //EVENTS
    getter.get('/events/')
      .then(function(data) {
        console.log('heroes data',data);
        var type = that.state.heroes;
        var name_attr = "hero_name";

        type["children"] = [];
        // data.forEach(function(instance){
        //  type.children.push({
        //    "name": instance.attributes[name_attr]
        //  });
        // });
      });

    //SKINS
    getter.get('/skins/')
      .then(function(data) {
        console.log('skins data',data);
        var type = that.state.skins;
        var name_attr = "skin_name";

        type["children"] = [];
        // data.forEach(function(instance){
        //  type.children.push({
        //    "name": instance.attributes[name_attr]
        //  });
        // });
      });

    //ITEMS
    getter.get('/items/')
      .then(function(data) {
        console.log('items data',data);
        var type = that.state.items;
        var name_attr = "item_name";

        type["children"] = [];
        // data.forEach(function(instance){
        //  type.children.push({
        //    "name": instance.attributes[name_attr]
        //  });
        // });
      });

    this.state.data.children.push(this.state.heroes);
    this.state.data.children.push(this.state.players);
    this.state.data.children.push(this.state.achievements);
    this.state.data.children.push(this.state.events);
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
