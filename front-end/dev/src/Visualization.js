import React from 'react';
import D3Tree from './D3Tree';

import NavMain from './NavMain';
import PageFooter from './PageFooter';

var axios = require('axios');

//DELETE ONCE DATA IS PULLED VIA API
var treeData = [
	{
      "attributes": {
        "aired": "Apr 3, 1998 to Apr 24, 1999",
        "genre": "Action, Adventure, Comedy, Drama, Sci-Fi, Space",
        "media_type": "TV",
        "num_episodes": 26,
        "picture": "https://myanimelist.cdn-dena.com/images/anime/4/19644.jpg",
        "rating": "R - 17+ (violence & profanity)",
        "score": 8.81,
        "status": "Finished Airing",
        "synopsis": "In the year 2071, humanity has colonized several of the planets and moons of the solar system leaving the now uninhabitable surface of planet Earth behind. The Inter Solar System Police attempts to keep peace in the galaxy, aided in part by outlaw bounty hunters, referred to as \"Cowboys.\" The ragtag team aboard the spaceship Bebop are two such individuals. Mellow and carefree Spike Spiegel is balanced by his boisterous, pragmatic partner Jet Black as the pair makes a living chasing bounties and collecting rewards. Thrown off course by the addition of new members that they meet in their travels—Ein, a genetically engineered, highly intelligent Welsh Corgi; femme fatale Faye Valentine, an enigmatic trickster with memory loss; and the strange computer whiz kid Edward Wong—the crew embarks on thrilling adventures that unravel each member's dark and mysterious past little by little. Well-balanced with high density action and light-hearted comedy, Cowboy Bebop is a space Western classic and an homage to the smooth and improvised music it is named after. [Written by MAL Rewrite]",
        "title": "Cowboy Bebop",
        "youtube_id": "qig4KOK2R2g"
      },
      "id": "1",
      "links": {
        "self": "http://weebmd.me/api/animes/1"
      },
      "relationships": {
        "actors": {
          "data": [
            {
              "id": "1041",
              "type": "actors"
            },
            {
              "id": "286",
              "type": "actors"
            },
            {
              "id": "220",
              "type": "actors"
            },
            {
              "id": "2",
              "type": "actors"
            },
            {
              "id": "1",
              "type": "actors"
            },
            {
              "id": "1042",
              "type": "actors"
            },
            {
              "id": "266",
              "type": "actors"
            },
            {
              "id": "213",
              "type": "actors"
            }
          ],
          "links": {
            "related": "/api/animes/1/actors",
            "self": "/api/animes/1/relationships/actors"
          }
        },
        "characters": {
          "data": [
            {
              "id": "1",
              "type": "characters"
            },
            {
              "id": "1572",
              "type": "characters"
            },
            {
              "id": "1573",
              "type": "characters"
            },
            {
              "id": "1574",
              "type": "characters"
            }
          ],
          "links": {
            "related": "/api/animes/1/characters",
            "self": "/api/animes/1/relationships/characters"
          }
        },
        "mangas": {
          "data": [
            {
              "id": "1",
              "type": "mangas"
            },
            {
              "id": "2",
              "type": "mangas"
            }
          ],
          "links": {
            "related": "/api/animes/1/mangas",
            "self": "/api/animes/1/relationships/mangas"
          }
        }
      },
      "type": "animes"
    },
    {
      "attributes": {
        "aired": "Sep 1, 2001",
        "genre": "Action, Space, Drama, Mystery, Sci-Fi",
        "media_type": "Movie",
        "num_episodes": 1,
        "picture": "https://myanimelist.cdn-dena.com/images/anime/6/14331.jpg",
        "rating": "R - 17+ (violence & profanity)",
        "score": 8.41,
        "status": "Finished Airing",
        "synopsis": "Another day, another bounty—such is the life of the often unlucky crew of the Bebop. However, this routine is interrupted when Faye, who is chasing a fairly worthless target on Mars, witnesses an oil tanker suddenly explode, causing mass hysteria. As casualties mount due to a strange disease spreading through the smoke from the blast, a whopping three hundred million woolong price is placed on the head of the supposed perpetrator. With lives at stake and a solution to their money problems in sight, the Bebop crew springs into action. Spike, Jet, Faye, and Edward, followed closely by Ein, split up to pursue different leads across Alba City. Through their individual investigations, they discover a cover-up scheme involving a pharmaceutical company, revealing a plot that reaches much further than the ragtag team of bounty hunters could have realized. [Written by MAL Rewrite]",
        "title": "Cowboy Bebop: Tengoku no Tobira",
        "youtube_id": null
      },
      "id": "2",
      "links": {
        "self": "http://weebmd.me/api/animes/2"
      },
      "relationships": {
        "actors": {
          "data": [
            {
              "id": "833",
              "type": "actors"
            },
            {
              "id": "1039",
              "type": "actors"
            },
            {
              "id": "3",
              "type": "actors"
            },
            {
              "id": "1040",
              "type": "actors"
            }
          ],
          "links": {
            "related": "/api/animes/2/actors",
            "self": "/api/animes/2/relationships/actors"
          }
        },
        "characters": {
          "data": [
            {
              "id": "1",
              "type": "characters"
            },
            {
              "id": "2",
              "type": "characters"
            },
            {
              "id": "1571",
              "type": "characters"
            },
            {
              "id": "1572",
              "type": "characters"
            },
            {
              "id": "1573",
              "type": "characters"
            },
            {
              "id": "1574",
              "type": "characters"
            }
          ],
          "links": {
            "related": "/api/animes/2/characters",
            "self": "/api/animes/2/relationships/characters"
          }
        },
        "mangas": {
          "data": [],
          "links": {
            "related": "/api/animes/2/mangas",
            "self": "/api/animes/2/relationships/mangas"
          }
        }
      },
      "type": "animes"
    }];

class Visualization extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	type: "visualization",

    	data: {
    		"name": "Group 23",
    		"children": []
    	},
    
	    anime: {
	    	"name": "Anime"
	    },

	    characters: {
	    	"name": "Characters"
	    },

	    manga: {
	    	"name": "Manga"
	    },

	    actors: {
	    	"name": "Actors"
	    }
    };

    var that = this;
    //LINK IS NOT WORKING
    axios.create({
      baseURL: 'https://weebmd.me/api',
      headers: {"Access-Control-Allow-Origin": "*"}
    }).get('/animes')
      .then(function(data) {
      	console.log("DATA RECEIVED DOESN'T MATCH APIARY")

      	var type = that.state.anime;

      	//REPLACE "treeData" WITH "data" ONCE API CALLS ARE VALID
      	type["children"] = [];
      	treeData.forEach(function(instance){
	    	type.children.push({
	    		"name": instance.attributes.title
	    	});
	    });
    });

    this.state.data.children.push(this.state.anime);
    this.state.data.children.push(this.state.characters);
    this.state.data.children.push(this.state.manga);
    this.state.data.children.push(this.state.actors);
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