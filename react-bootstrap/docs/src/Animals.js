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

  const axios = require('axios');
  const animals = {
                    "Accipiter gentilis": {
                      "threats": [
                        "Wood & pulp plantations",
                        "Agro-industry plantations",
                        "Renewable energy",
                        "Hunting & trapping terrestrial animals",
                        "Intentional use (species is the target)",
                        "Persecution/control",
                        "Agricultural & forestry effluents",
                        "Herbicides and pesticides"
                      ],
                      "video_url": "https://www.youtube.com/watch?v=58gmF85FOGA",
                      "countries": [
                        "Andorra",
                        "United Arab Emirates",
                        "Afghanistan",
                        "Albania",
                        "Armenia",
                        "Austria",
                        "Azerbaijan",
                        "Bosnia and Herzegovina",
                        "Bangladesh",
                        "Belgium",
                        "Bulgaria",
                        "Bermuda",
                        "Bhutan",
                        "Belarus",
                        "Canada",
                        "Switzerland",
                        "China",
                        "Cyprus",
                        "Czech Republic",
                        "Germany",
                        "Denmark",
                        "Algeria",
                        "Estonia",
                        "Egypt",
                        "Spain",
                        "Finland",
                        "France",
                        "United Kingdom",
                        "Georgia",
                        "Gibraltar",
                        "Greece",
                        "Hong Kong",
                        "Croatia",
                        "Hungary",
                        "Ireland",
                        "Israel",
                        "India",
                        "Iraq",
                        "Iran, Islamic Republic of",
                        "Italy",
                        "Jordan",
                        "Japan",
                        "Kyrgyzstan",
                        "Korea, Democratic People's Republic of",
                        "Korea, Republic of",
                        "Kuwait",
                        "Kazakhstan",
                        "Lao People's Democratic Republic",
                        "Lebanon",
                        "Liechtenstein",
                        "Lithuania",
                        "Luxembourg",
                        "Latvia",
                        "Libya",
                        "Morocco",
                        "Moldova",
                        "Montenegro",
                        "Macedonia, the former Yugoslav Republic of",
                        "Myanmar",
                        "Mongolia",
                        "Mexico",
                        "Netherlands",
                        "Norway",
                        "Nepal",
                        "Oman",
                        "Pakistan",
                        "Poland",
                        "Saint Pierre and Miquelon",
                        "Palestinian Territory, Occupied",
                        "Portugal",
                        "Romania",
                        "Serbia",
                        "Russian Federation",
                        "Saudi Arabia",
                        "Sweden",
                        "Slovenia",
                        "Slovakia",
                        "Syrian Arab Republic",
                        "Thailand",
                        "Tajikistan",
                        "Turkmenistan",
                        "Tunisia",
                        "Turkey",
                        "Taiwan, Province of China",
                        "Ukraine",
                        "United States",
                        "Uzbekistan",
                        "Viet Nam"
                      ],
                      "web_link": "http://apiv3.iucnredlist.org/api/v3/website/Accipiter gentilis",
                      "habitats": [
                        "Forest - Boreal",
                        "Forest - Temperate",
                        "Artificial/Terrestrial - Urban Areas",
                        "Artificial/Terrestrial - Urban Areas",
                        "Grassland - Tundra"
                      ],
                      "citation_link": "BirdLife International 2016. Accipiter gentilis. The IUCN Red List of Threatened Species 2016: e.T22695683A93522852. http://dx.doi.org/10.2305/IUCN.UK.2016-3.RLTS.T22695683A93522852.en",
                      "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/81/Northern_Goshawk_ad_M2.jpg",
                      "common_name": "Northern Goshawk",
                      "conservation_measures": "Species recovery",
                      "vulnerability_status": "Least Concern"
                      },
                    "Acanthocybium solandri": {
                      "threats": [
                        "Fishing & harvesting aquatic resources",
                        "Unintentional effects: (large scale) [harvest]"
                      ],
                      "video_url": "https://www.youtube.com/watch?v=3uLYJuN_FOA",
                      "countries": [
                        "Antigua and Barbuda",
                        "Anguilla",
                        "Albania",
                        "Australia",
                        "Aruba",
                        "Bosnia and Herzegovina",
                        "Barbados",
                        "Bermuda",
                        "Bonaire, Sint Eustatius and Saba",
                        "Brazil",
                        "Bahamas",
                        "Belize",
                        "Cocos (Keeling) Islands",
                        "Cook Islands",
                        "Cameroon",
                        "China",
                        "Colombia",
                        "Costa Rica",
                        "Cuba",
                        "Cape Verde",
                        "Christmas Island",
                        "Cyprus",
                        "Dominica",
                        "Dominican Republic",
                        "Algeria",
                        "Ecuador",
                        "Egypt",
                        "Spain",
                        "Fiji",
                        "Micronesia, Federated States of ",
                        "France",
                        "Grenada",
                        "French Guiana",
                        "Guadeloupe",
                        "Equatorial Guinea",
                        "Greece",
                        "Guatemala",
                        "Guam",
                        "Guyana",
                        "Hong Kong",
                        "Honduras",
                        "Croatia",
                        "Haiti",
                        "Indonesia",
                        "Israel",
                        "India",
                        "Italy",
                        "Jamaica",
                        "Japan",
                        "Kenya",
                        "Kiribati",
                        "Comoros",
                        "Saint Kitts and Nevis",
                        "Cayman Islands",
                        "Lebanon",
                        "Saint Lucia",
                        "Sri Lanka",
                        "Libya",
                        "Morocco",
                        "Monaco",
                        "Saint Martin (French part)",
                        "Madagascar",
                        "Marshall Islands",
                        "Northern Mariana Islands",
                        "Martinique",
                        "Mauritania",
                        "Montserrat",
                        "Malta",
                        "Mauritius",
                        "Maldives",
                        "Mexico",
                        "Malaysia",
                        "Mozambique",
                        "New Caledonia",
                        "Nigeria",
                        "Nicaragua",
                        "Oman",
                        "Panama",
                        "Peru",
                        "French Polynesia",
                        "Papua New Guinea",
                        "Philippines",
                        "Pakistan",
                        "Puerto Rico",
                        "Palau",
                        "Saudi Arabia",
                        "Solomon Islands",
                        "Seychelles",
                        "Saint Helena, Ascension and Tristan da Cunha",
                        "Slovenia",
                        "Somalia",
                        "Suriname",
                        "El Salvador",
                        "Sint Maarten (Dutch part)",
                        "Syrian Arab Republic",
                        "Turks and Caicos Islands",
                        "Tokelau",
                        "Tunisia",
                        "Tonga",
                        "Turkey",
                        "Trinidad and Tobago",
                        "Tuvalu",
                        "Taiwan, Province of China",
                        "Tanzania, United Republic of",
                        "United States",
                        "Saint Vincent and the Grenadines",
                        "Venezuela, Bolivarian Republic of",
                        "Virgin Islands, British",
                        "Virgin Islands, U.S.",
                        "Viet Nam",
                        "Vanuatu",
                        "Samoa",
                        "Yemen",
                        "South Africa"
                      ],
                      "web_link": "http://apiv3.iucnredlist.org/api/v3/website/Acanthocybium solandri",
                      "habitats": [
                        "Marine Oceanic - Epipelagic (0-200m)",
                        "Marine Neritic - Pelagic"
                      ],
                      "citation_link": "Collette, B., Acero, A., Amorim, A.F., Boustany, A., Canales Ramirez, C., Cardenas, G., Carpenter, K.E., de Oliveira Leite Jr., N., Di Natale, A., Die, D., Fox, W., Fredou, F.L., Graves, J., Guzman-Mora, A., Viera Hazin, F.H., Hinton, M., Juan Jorda, M., Kada, O., Minte Vera, C., Miyabe, N., Montano Cruz, R., Nelson, R., Oxenford, H., Restrepo, V., Salas, E., Schaefer, K., Schratwieser, J., Serra, R., Sun, C., Teixeira Lessa, R.P., Pires Ferreira Travassos, P.E., Uozumi, Y. & Yanez, E. 2011. Acanthocybium solandri. The IUCN Red List of Threatened Species 2011: e.T170331A6750961. http://dx.doi.org/10.2305/IUCN.UK.2011-2.RLTS.T170331A6750961.en",
                      "image_url": "https://www.delphfishing.com/wp-content/gallery/wahoo/wahoo_IMG_6094.jpg",
                      "common_name": "Wahoo",
                      "conservation_measures": "Species recovery",
                      "vulnerability_status": "Least Concern"
                      },
                    "Acanthurus blochii": {
      "threats": [
        "Fishing & harvesting aquatic resources",
        "Intentional use: (subsistence/small scale) [harvest]"
      ],
      "video_url": "https://www.youtube.com/watch?v=HLg-o4i-f-Q",
      "countries": [
        "American Samoa",
        "Australia",
        "Brunei Darussalam",
        "Cocos (Keeling) Islands",
        "Cook Islands",
        "Christmas Island",
        "Djibouti",
        "Disputed Territory",
        "Fiji",
        "Micronesia, Federated States of ",
        "Guam",
        "Indonesia",
        "British Indian Ocean Territory",
        "Japan",
        "Kenya",
        "Kiribati",
        "Comoros",
        "Madagascar",
        "Marshall Islands",
        "Northern Mariana Islands",
        "Mauritius",
        "Malaysia",
        "Mozambique",
        "New Caledonia",
        "Nauru",
        "Niue",
        "French Polynesia",
        "Papua New Guinea",
        "Philippines",
        "Palau",
        "Solomon Islands",
        "Seychelles",
        "Somalia",
        "French Southern Territories",
        "Tokelau",
        "Timor-Leste",
        "Tonga",
        "Tuvalu",
        "United States Minor Outlying Islands",
        "United States",
        "Viet Nam",
        "Vanuatu",
        "Wallis and Futuna",
        "Samoa",
        "Yemen",
        "Mayotte",
        "South Africa"
      ],
      "web_link": "http://apiv3.iucnredlist.org/api/v3/website/Acanthurus blochii",
      "habitats": [
        "Outer Reef Channel",
        "Back Slope",
        "Foreslope (Outer Reef Slope)",
        "Lagoon",
        "Inter-Reef Soft Substrate",
        "Inter-Reef Rubble Substrate",
        "Marine Neritic - Seagrass (Submerged)"
      ],
      "citation_link": "Choat, J.H., Abesamis, R., Clements, K.D., McIlwain, J., Myers, R., Nanola, C., Rocha, L.A., Russell, B. & Stockwell, B. 2012. Acanthurus blochii. The IUCN Red List of Threatened Species 2012: e.T177971A1507181. http://dx.doi.org/10.2305/IUCN.UK.2012.RLTS.T177971A1507181.en",
      "image_url": "http://images.fineartamerica.com/images-medium-large/ringtail-surgeonfish-michael-peychich.jpg",
      "common_name": "Ringtail Surgeonfish",
      "conservation_measures": "Species recovery",
      "vulnerability_status": "Least Concern"
    },
                    "Abudefduf taurus": {
      "threats": [
        "Fishing & harvesting aquatic resources",
        "Intentional use: (subsistence/small scale) [harvest]"
      ],
      "video_url": "https://www.youtube.com/watch?v=upNPQWrhMWQ",
      "countries": [
        "Antigua and Barbuda",
        "Anguilla",
        "Angola",
        "Aruba",
        "Barbados",
        "Benin",
        "Bahamas",
        "Belize",
        "Congo, The Democratic Republic of the",
        "Congo",
        "Cameroon",
        "Colombia",
        "Costa Rica",
        "Cuba",
        "Cape Verde",
        "Dominica",
        "Dominican Republic",
        "Gabon",
        "Grenada",
        "French Guiana",
        "Ghana",
        "Gambia",
        "Guinea",
        "Guadeloupe",
        "Equatorial Guinea",
        "Guatemala",
        "Guinea-Bissau",
        "Guyana",
        "Honduras",
        "Haiti",
        "Jamaica",
        "Saint Kitts and Nevis",
        "Cayman Islands",
        "Saint Lucia",
        "Liberia",
        "Martinique",
        "Montserrat",
        "Mexico",
        "Nigeria",
        "Nicaragua",
        "Panama",
        "Puerto Rico",
        "Sierra Leone",
        "Senegal",
        "Suriname",
        "Turks and Caicos Islands",
        "Togo",
        "Trinidad and Tobago",
        "United States",
        "Saint Vincent and the Grenadines",
        "Venezuela, Bolivarian Republic of",
        "Virgin Islands, British",
        "Virgin Islands, U.S."
      ],
      "web_link": "http://apiv3.iucnredlist.org/api/v3/website/Abudefduf taurus",
      "habitats": [
        "Marine Intertidal - Rocky Shoreline",
        "Marine Intertidal - Tidepools",
        "Marine Neritic - Subtidal Rock and Rocky Reefs"
      ],
      "citation_link": "Rocha, L.A. & Myers, R. 2015. Abudefduf taurus. The IUCN Red List of Threatened Species 2015: e.T188434A1874356. http://dx.doi.org/10.2305/IUCN.UK.2015-4.RLTS.T188434A1874356.en",
      "image_url": "https://i1.wp.com/www.mexican-fish.com/wp-content/uploads/F245-Night-Sergeant.jpg",
      "common_name": "Night Sergeant",
      "conservation_measures": "Species recovery",
      "vulnerability_status": "Least Concern"
    },
                    "Acanthochelys pallidipectoris": {
      "threats": [
        "Droughts",
        "Temperature extremes",
        "Annual & perennial non-timber crops",
        "Agro-industry farming",
        "Livestock farming & ranching",
        "Agro-industry grazing, ranching or farming",
        "Fishing & harvesting aquatic resources",
        "Intentional use: (subsistence/small scale) [harvest]",
        "Problematic native species/diseases"
      ],
      "video_url": "https://www.youtube.com/watch?v=VbQfUFrQZ44",
      "countries": [
        "Argentina",
        "Bolivia, Plurinational States of",
        "Paraguay"
      ],
      "web_link": "http://apiv3.iucnredlist.org/api/v3/website/Acanthochelys pallidipectoris",
      "habitats": [
        "Artificial/Aquatic - Ponds (below 8ha)",
        "Grassland - Subtropical/Tropical Seasonally Wet/Flooded",
        "Wetlands (inland) - Shrub Dominated Wetlands",
        "Wetlands (inland) - Seasonal/Intermittent Freshwater Marshes/Pools (under 8ha)"
      ],
      "citation_link": "Vinke, T. & Vinke, S. 2016. Acanthochelys pallidipectoris. The IUCN Red List of Threatened Species 2016: e.T75A3139283. http://dx.doi.org/10.2305/IUCN.UK.2016-1.RLTS.T75A3139283.en",
      "image_url": "http://cdn2.arkive.org/media/87/8710949A-22FB-4CDC-A0F7-A29C0DD97F1A/Presentation.Large/chaco-side-necked-turtle.jpg",
      "common_name": "Chaco Side-necked Turtle",
      "conservation_measures": "Site/area protection",
      "vulnerability_status": "Endangered"
    },
                    "Abrawayaomys ruschii": {
      "threats": [
        "Logging & wood harvesting",
        "Motivation Unknown/Unrecorded"
      ],
      "video_url": "https://www.youtube.com/watch?v=Lqld9_4JG4A",
      "countries": [
        "Argentina",
        "Brazil"
      ],
      "web_link": "http://apiv3.iucnredlist.org/api/v3/website/Abrawayaomys ruschii",
      "habitats": [
        "Forest - Subtropical/Tropical Moist Montane"
      ],
      "citation_link": "Pardinas, U., Teta, P. & Percequillo, A. 2016. Abrawayaomys ruschii. The IUCN Red List of Threatened Species 2016: e.T47760825A22335735. http://dx.doi.org/10.2305/IUCN.UK.2016-2.RLTS.T47760825A22335735.en",
      "image_url": "http://cdn1.arkive.org/media/1B/1BDE8340-59B0-49EC-A664-5766C2113A29/Presentation.Large/Ruschis-rat-specimen-close-up-of-foot.jpg",
      "common_name": "Ruschi's Rat",
      "conservation_measures": "Species recovery",
      "vulnerability_status": "Least Concern"
    }
                  }

  export default class Animals extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          open: true,
      };
    }

    shouldComponentUpdate() {
      return true;
    }

    renderAnimals(animals, keyName) {
      return (
        <Col sm={6} className="bs-docs-body" >
          <Thumbnail src={animals[keyName].image_url}>
            <h3>{keyName}</h3>
            <p>Common name: {animals[keyName].common_name}</p>
            <p>Vulnerability Status: {animals[keyName].vulnerability_status}</p>
            <p>Threats: {animals[keyName].threats}</p>
            Video:

            <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
              Video
            </Button>
            <Collapse in={this.state.open}>

              <Well>
                {animals[keyName].video_url}
              </Well>

            </Collapse>





            <p>Countries: {animals[keyName].countries} {" "}</p>
            <p>Habitats: {animals[keyName].habitats} {" "}</p>
          </Thumbnail>
        </Col>


      );
    };

    render() {
      return (
        <div>
          <NavMain activePage="animals" />

           <PageHeader
            title="Animals"
            subTitle=""/>

            <div className="container-fluid">


            
                { /* Animals */ }

                <Row className="container-fluid">
                  {


                    Object.keys(animals).map(function(keyName, keyIndex) {
                      return this.renderAnimals(animals, keyName);
                    }.bind(this))



                  }


                </Row>


            </div>

          <PageFooter />
        </div>
    );
    }
  }
