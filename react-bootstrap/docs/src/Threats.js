import React from 'react';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import Row from '../../src/Row';
import Col from '../../src/Col';
import Thumbnail from '../../src/Thumbnail';
import Image from '../../src/Image';
import Panel from '../../src/Panel';
import Button from '../../src/Button';
import Collapse from '../../src/Collapse';
import Well from '../../src/Well';

const axios = require('axios');

const threats = [{"timing": "ongoing", "score": 4.6, "name": "Annual & perennial non-timber crops"}, {"timing": "ongoing", "score": 1.17, "name": "Invasive non-native/alien species/diseases (Vulpes vulpes)"}, {"timing": "ongoing", "score": 3.0, "name": "Dams (size unknown)"}, {"timing": "ongoing", "score": 4.6, "name": "Intentional use: (subsistence/small scale) [harvest]"}, {"timing": "ongoing", "score": 3.0, "name": "Tourism & recreation areas"}, {"timing": "ongoing", "score": 1.17, "name": "Invasive non-native/alien species/diseases (Abudefduf vaigiensis)"}, {"timing": "ongoing", "score": 3.0, "name": "Habitat shifting & alteration"}, {"timing": "ongoing", "score": 4.5, "name": "Problematic native species/diseases"}, {"timing": "ongoing", "score": 6.333333333333333, "name": "Droughts"}, {"timing": "ongoing", "score": 4.0, "name": "Mining & quarrying"}, {"timing": "ongoing", "score": 6.666666666666667, "name": "Abstraction of ground water (agricultural use)"}, {"timing": "ongoing", "score": 1.17, "name": "Other impacts"}, {"timing": "ongoing", "score": 5.0, "name": "Increase in fire frequency/intensity"}, {"timing": "ongoing", "score": 3.9, "name": "Fishing & harvesting aquatic resources"}, {"timing": "ongoing", "score": 3.6666666666666665, "name": "Small-holder grazing, ranching or farming"}, {"timing": "ongoing", "score": 1.17, "name": "Abstraction of ground water (unknown use)"}, {"timing": "ongoing", "score": 4.5, "name": "Large dams"}, {"timing": "ongoing", "score": 5.0, "name": "Abstraction of surface water (unknown use)"}, {"timing": "ongoing", "score": 3.857142857142857, "name": "Logging & wood harvesting"}, {"timing": "ongoing", "score": 5.0, "name": "Herbicides and pesticides"}, {"timing": "ongoing", "score": 1.17, "name": "Named species (Abudefduf vaigiensis)"}, {"timing": "ongoing", "score": 1.17, "name": "Earthquakes/tsunamis"}, {"timing": "ongoing", "score": 5.222222222222222, "name": "Dams & water management/use"}, {"timing": "ongoing", "score": 4.0, "name": "Unintentional effects (species is not the target)"}, {"timing": "ongoing", "score": 4.666666666666667, "name": "Unintentional effects: (subsistence/small scale) [harvest]"}, {"timing": "ongoing", "score": 4.0, "name": "Scale Unknown/Unrecorded"}, {"timing": "ongoing", "score": 1.17, "name": "Work & other activities"}, {"timing": "ongoing", "score": 3.0, "name": "Garbage & solid waste"}, {"timing": "ongoing", "score": 5.0, "name": "Sewage"}, {"timing": "ongoing", "score": 3.0, "name": "Intentional use: (large scale) [harvest]"}, {"timing": "ongoing", "score": 1.17, "name": "Nutrient loads"}, {"timing": "ongoing", "score": 4.5, "name": "Hunting & trapping terrestrial animals"}, {"timing": "ongoing", "score": 3.0, "name": "Type Unknown/Unrecorded"}, {"timing": "ongoing", "score": 4.125, "name": "Livestock farming & ranching"}, {"timing": "ongoing", "score": 3.0, "name": "Soil erosion, sedimentation"}, {"timing": "ongoing", "score": 4.0, "name": "Fire & fire suppression"}, {"timing": "ongoing", "score": 4.5, "name": "Agro-industry grazing, ranching or farming"}, {"timing": "ongoing", "score": 4.5, "name": "Small-holder farming"}, {"timing": "ongoing", "score": 4.5, "name": "Agro-industry farming"}, {"timing": "ongoing", "score": 5.5, "name": "Wood & pulp plantations"}, {"timing": "ongoing", "score": 3.3333333333333335, "name": "Roads & railroads"}, {"timing": "ongoing", "score": 4.0, "name": "Unintentional effects: (large scale) [harvest]"}, {"timing": "ongoing", "score": 1.17, "name": "Abstraction of ground water (domestic use)"}, {"timing": "ongoing", "score": 3.0, "name": "Other ecosystem modifications"}, {"timing": "ongoing", "score": 1.17, "name": "Storms & flooding"}, {"timing": "ongoing", "score": 1.17, "name": "Abstraction of surface water (domestic use)"}, {"timing": "ongoing", "score": 4.0, "name": "Temperature extremes"}, {"timing": "ongoing", "score": 5.0, "name": "Small dams"}, {"timing": "ongoing", "score": 1.17, "name": "Named species (Vulpes vulpes)"}, {"timing": "ongoing", "score": 1.17, "name": "War, civil unrest & military exercises"}, {"timing": "ongoing", "score": 4.666666666666667, "name": "Intentional use (species is the target)"}, {"timing": "ongoing", "score": 3.0, "name": "Motivation Unknown/Unrecorded"}, {"timing": "ongoing", "score": 1.17, "name": "Named species (Felis catus)"}, {"timing": "ongoing", "score": 3.0, "name": "Trend Unknown/Unrecorded"}, {"timing": "ongoing", "score": 5.5, "name": "Agro-industry plantations"}, {"timing": "ongoing", "score": 1.17, "name": "Recreational activities"}, {"timing": "ongoing", "score": 4.0, "name": "Commercial & industrial areas"}, {"timing": "ongoing", "score": 3.0, "name": "Industrial & military effluents"}, {"timing": "ongoing", "score": 5.5, "name": "Shifting agriculture"}, {"timing": "ongoing", "score": 4.0, "name": "Agricultural & forestry effluents"}, {"timing": "ongoing", "score": 4.2, "name": "Housing & urban areas"}, {"timing": "ongoing", "score": 5.0, "name": "Domestic & urban waste water"}, {"timing": "ongoing", "score": 6.5, "name": "Abstraction of surface water (agricultural use)"}, {"timing": "ongoing", "score": 5.0, "name": "Renewable energy"}, {"timing": "ongoing", "score": 4.0, "name": "Nomadic grazing"}, {"timing": "ongoing", "score": 1.17, "name": "Invasive non-native/alien species/diseases (Felis catus)"}, {"timing": "ongoing", "score": 5.0, "name": "Persecution/control"}]

export default class Threats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  shouldComponentUpdate() {
    return true;
  }

  renderThreats(threat) {
    return (

      <Col sm={6} className="bs-docs-body">
        <h4>Name: {threat.name}</h4>
        <p>Score: {threat.score}</p>
        <p>Timing: { threat.timing}</p>
      </Col>

    );
  };

  render() {
    return (
      <div>
        <NavMain activePage="threats" />

        <PageHeader
          title="Threats"
          subTitle=""/>

          <div className="container-fluid">

          { /* Threats */ }

          <Row className="container-fluid">
            {

                threats.map(function(threat, i){
                return this.renderThreats(threat);
              }.bind(this))

            }


          </Row>


        </div>

        <PageFooter />
      </div>
    );
  }
}
