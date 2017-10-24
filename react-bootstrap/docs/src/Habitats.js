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

const habitats = [{"imageUrl": "http://thumb1.shutterstock.com/display_pic_with_logo/1771478/323878760/stock-photo-small-artificial-decorative-pond-with-rocks-and-plants-on-the-backyard-in-summer-323878760.jpg", "suitability": "Suitable", "name": "Artificial/Aquatic - Ponds (below 8ha)"}, {"imageUrl": "https://www.polyworld.com.au/wp-content/uploads/2015/03/16000L-Poly-Pool1.jpg", "suitability": "Suitable", "name": "Artificial/Aquatic - Water Storage Areas (over 8ha)"}, {"imageUrl": "http://zipcodezoo.com/images/thumb/b/ba/Rhizophora_racemosa_1.jpg/300px-Rhizophora_racemosa_1.jpg", "suitability": "Suitable", "name": "Artificial/Marine - Mari/Brackishculture Ponds"}, {"imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Risks_aquaculture_550.jpg/450px-Risks_aquaculture_550.jpg", "suitability": "Suitable", "name": "Artificial/Marine - Mariculture Cages"}, {"imageUrl": "http://upload.wikimedia.org/wikipedia/commons/e/e8/Arable_land%2C_Hambleden_-_geograph.org.uk_-_1050821.jpg", "suitability": "Suitable", "name": "Artificial/Terrestrial - Arable Land"}, {"imageUrl": "http://www.oiseaux.net/photos/henrik.gronvold/images/rale.ypecaha.hegr.0p.jpg", "suitability": "Suitable", "name": "Artificial/Terrestrial - Pastureland"}, {"imageUrl": "http://www.oiseaux.net/photos/frederic.pelsy/images/lori.tricolore.frpe.2g.jpg", "suitability": "Suitable", "name": "Artificial/Terrestrial - Plantations"}, {"imageUrl": "https://usercontent1.hubstatic.com/11906574_f520.jpg", "suitability": "Suitable", "name": "Artificial/Terrestrial - Rural Gardens"}, {"imageUrl": "http://www.oiseaux.net/maps/images/elenie.olivatre.1.275.w.png", "suitability": "Suitable", "name": "Artificial/Terrestrial - Subtropical/Tropical Heavily Degraded Former Forest"}, {"imageUrl": "https://www.eea.europa.eu/articles/analysing-and-managing-urban-growth/intensityartificiallandtake.png/image_large", "suitability": "Suitable", "name": "Artificial/Terrestrial - Urban Areas"}, {"imageUrl": "http://www.fao.org/docrep/X0622E/x0622e1o.gif", "suitability": "Marginal", "name": "Back Slope"}, {"imageUrl": "http://s3.amazonaws.com/rapgenius/filepicker/sFCTedRrS6eErJ7b0cwY_hot_desert.jpg", "suitability": "Marginal", "name": "Desert - Hot"}, {"imageUrl": "http://img-aws.ehowcdn.com/600x600p/photos.demandstudios.com/getty/article/251/168/87776061.jpg", "suitability": "Marginal", "name": "Desert - Temperate"}, {"imageUrl": "http://slideplayer.com/9101211/27/images/16/Barrier+Reefs+Back+-+reef+slope+%28inner+slope%29+is+protected.jpg", "suitability": "Marginal", "name": "Foreslope (Outer Reef Slope)"}, {"imageUrl": "http://cgf3m-2albertaoilsands.wikispaces.com/file/view/Boreal_Forest.jpg/207145204/Boreal_Forest.jpg", "suitability": "Marginal", "name": "Forest - Boreal"}, {"imageUrl": "http://ichef.bbci.co.uk/naturelibrary/images/ic/credit/640x395/t/tr/tropical_and_subtropical_dry_broadleaf_forests/tropical_and_subtropical_dry_broadleaf_forests_1.jpg", "suitability": "Marginal", "name": "Forest - Subtropical/Tropical Dry"}, {"imageUrl": "http://www.oiseaux.net/photos/loic.epelboin/images/paroare.masque.loep.1g.jpg", "suitability": "Marginal", "name": "Forest - Subtropical/Tropical Mangrove Vegetation Above High Tide Level"}, {"imageUrl": "http://m3.i.pbase.com/o3/18/884818/1/133754633.QpDAvhQY.DSCN9669a.jpg", "suitability": "Marginal", "name": "Forest - Subtropical/Tropical Moist Lowland"}, {"imageUrl": "http://img.readtiger.com/wkp/en/Subtropical_semi-evergreen_seasonal_forest_in_Northern_Thailand.JPG", "suitability": "Marginal", "name": "Forest - Subtropical/Tropical Moist Montane"}, {"imageUrl": "http://bioimages.cas.vanderbilt.edu/bioimages/biohires/ecoregions/h70106alakai-swamp04627.jpg", "suitability": "Marginal", "name": "Forest - Subtropical/Tropical Swamp"}, {"imageUrl": "http://upload.wikimedia.org/wikipedia/commons/b/b4/Temperate_rainforest_in_Great_Otway_National_Park%2C_Victoria.JPG", "suitability": "Marginal", "name": "Forest - Temperate"}, {"imageUrl": "http://www.cas.vanderbilt.edu/bioimages/biohires/ecoregions/h70701mauna-loa04225.jpg", "suitability": "Suitable", "name": "Grassland - Subtropical/Tropical Dry"}, {"imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Circus_buffoni1.jpg", "suitability": "Suitable", "name": "Grassland - Subtropical/Tropical Seasonally Wet/Flooded"}, {"imageUrl": "http://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Grasslands-menggu.JPG/800px-Grasslands-menggu.JPG", "suitability": "Suitable", "name": "Grassland - Temperate"}, {"imageUrl": "http://3.bp.blogspot.com/-DCgtlbfDJas/T6U7eKuBFZI/AAAAAAAAS9M/LyNavxiCE-s/s1600/800px-Road_dip_caused_by_melting_permafrost.jpg", "suitability": "Suitable", "name": "Grassland - Tundra"}, {"imageUrl": "http://commondatastorage.googleapis.com/aimscoral/images/largest/0123_C1_03.jpg", "suitability": "Suitable", "name": "Inter-Reef Rubble Substrate"}, {"imageUrl": "http://commondatastorage.googleapis.com/aimscoral/images/largest/0133_C1_01.jpg", "suitability": "Suitable", "name": "Inter-Reef Soft Substrate"}, {"imageUrl": "http://upload.wikimedia.org/wikipedia/commons/7/75/Blue_Lagoon.JPG", "suitability": "Marginal", "name": "Lagoon"}, {"imageUrl": "http://s0.geograph.org.uk/geophotos/02/88/65/2886501_92ee5398.jpg", "suitability": "Suitable", "name": "Marine Coastal/Supratidal - Coastal Freshwater Lakes"}, {"imageUrl": "http://img04.deviantart.net/acc4/i/2012/224/a/e/coastal_sand_dunes_painting_by_artsaus-d5atcqv.jpg", "suitability": "Suitable", "name": "Marine Coastal/Supratidal - Coastal Sand Dunes"}, {"imageUrl": "http://ashdown4628.clients.cmdwebsites.com/blog/wp-content/uploads/2015/08/Image-3_c-Ashdown-1024x664.jpg", "suitability": "Suitable", "name": "Marine Intertidal - Mangrove Submerged Roots"}, {"imageUrl": "http://slideplayer.com/6219874/20/images/4/Intertidal+zonation+%28rocky+shore%29.jpg", "suitability": "Suitable", "name": "Marine Intertidal - Rocky Shoreline"}, {"imageUrl": "http://www.lajollabluebook.com/blog/wp-content/uploads/2016/02/Tidepools-20140313-DEZ-585x393.jpg", "suitability": "Suitable", "name": "Marine Intertidal - Tidepools"}, {"imageUrl": "https://sciencewithmsbarton.files.wordpress.com/2015/03/ocean-zones-diagram-1.jpg", "suitability": "Suitable", "name": "Marine Neritic - Estuaries"}, {"imageUrl": "http://media.opencurriculum.org/articles_manual/ck12_biology/aquatic-biomes/1.png", "suitability": "Suitable", "name": "Marine Neritic - Pelagic"}, {"imageUrl": "http://oceans.mit.edu/wp-content/uploads/http-www.photolib.noaa_.gov700ssanc0213.jpg", "suitability": "Suitable", "name": "Marine Neritic - Seagrass (Submerged)"}, {"imageUrl": "http://n7.alamy.com/zooms/031265ef3acb42838c7a925c29ba2c4f/rounded-pebble-stones-cement-on-the-walkway-en0jjt.jpg", "suitability": "Suitable", "name": "Marine Neritic - Subtidal Loose Rock/pebble/gravel"}, {"imageUrl": "https://www.for.gov.bc.ca/hts/risc/pubs/coastal/estuary/assets/estuary-4.jpg", "suitability": "Suitable", "name": "Marine Neritic - Subtidal Muddy"}, {"imageUrl": "https://s-media-cache-ak0.pinimg.com/originals/de/2e/c2/de2ec2270cba17d0d0e9fa1d2594e82b.jpg", "suitability": "Suitable", "name": "Marine Neritic - Subtidal Rock and Rocky Reefs"}, {"imageUrl": "https://s-media-cache-ak0.pinimg.com/originals/de/2e/c2/de2ec2270cba17d0d0e9fa1d2594e82b.jpg", "suitability": "Suitable", "name": "Marine Neritic - Subtidal Sandy"}, {"imageUrl": "https://razottoli.files.wordpress.com/2011/10/zonation-rocky-intertidal-lubec-jetty-aug1.jpg", "suitability": "Suitable", "name": "Marine Neritic - Subtidal Sandy-Mud"}, {"imageUrl": "http://slideplayer.com/7987686/25/images/15/The+Ocean+Divisions+There+are+two+basic+divisions+of+the+ocean%3A.jpg", "suitability": "Suitable", "name": "Marine Oceanic - Epipelagic (0-200m)"}, {"imageUrl": "https://thumb9.shutterstock.com/display_pic_with_logo/2287103/338605952/stock-photo-outer-reef-channel-passage-great-barrier-reef-whitsundays-338605952.jpg", "suitability": "Suitable", "name": "Outer Reef Channel"}, {"imageUrl": "http://files.ornithologiki.gr/images/iba/photos/gr079_AChristopoulos.jpg", "suitability": "Marginal", "name": "Rocky areas (eg. inland cliffs, mountain peaks)"}, {"imageUrl": "https://groceries.morrisons.com/productImages/119/119434011_0_640x640.jpg?identifier=31d2324e82bf7bb05f2e0e7dc74cc680", "suitability": "Suitable", "name": "Savanna - Dry"}, {"imageUrl": "http://www.geog.cam.ac.uk/research/projects/mediterraneanecosystem/5.jpg", "suitability": "Suitable", "name": "Shrubland - Mediterranean-type Shrubby Vegetation"}, {"imageUrl": "https://barajas707.files.wordpress.com/2013/11/tropical_and_subtropical_dry_broadleaf_forests_1.jpg", "suitability": "Suitable", "name": "Shrubland - Subtropical/Tropical Dry"}, {"imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/04/Hylocharis_cyanus_2.jpg", "suitability": "Suitable", "name": "Shrubland - Subtropical/Tropical Moist"}, {"imageUrl": "http://upload.wikimedia.org/wikipedia/commons/8/88/Starr_010831-0016_Morella_faya.jpg", "suitability": "Suitable", "name": "Shrubland - Temperate"}, {"imageUrl": "http://www.warnerbros.com/sites/default/files/styles/juicebox_medium/public/unknown_posterlarge_1-796659102.jpg?itok=kKVT7EfX", "suitability": "Suitable", "name": "Unknown"}, {"imageUrl": "http://ww1.hdnux.com/photos/40/02/44/8399132/5/rawImage.jpg", "suitability": "Suitable", "name": "Wetlands (inland) - Freshwater Springs and Oases"}, {"imageUrl": "http://people.deu.edu.tr/melis.somay/resimler/swamps.jpg", "suitability": "Suitable", "name": "Wetlands (inland) - Permanent Freshwater Lakes (over 8ha)"}, {"imageUrl": "http://www.oiseaux.net/photos/daniel.pernet/images/aigrette.ardoisee.dape.2p.jpg", "suitability": "Suitable", "name": "Wetlands (inland) - Permanent Freshwater Marshes/Pools (under 8ha)"}, {"imageUrl": "http://ih3.redbubble.net/image.10333072.9230/flat,800x800,070,f.jpg", "suitability": "Suitable", "name": "Wetlands (inland) - Permanent Rivers/Streams/Creeks (includes waterfalls)"}, {"imageUrl": "http://www.oiseaux.net/photos/jacques.buvat/images/chouette-pecheuse.de.pel.jabu.1p.200.w.jpg", "suitability": "Suitable", "name": "Wetlands (inland) - Seasonal/Intermittent Freshwater Marshes/Pools (under 8ha)"}, {"imageUrl": "http://people.deu.edu.tr/melis.somay/resimler/swamps.jpg", "suitability": "Suitable", "name": "Wetlands (inland) - Seasonal/Intermittent/Irregular Rivers/Streams/Creeks"}, {"imageUrl": "http://www.inlandbays.org/wp-content/images/freshwater_wetlands_tributaries.jpg", "suitability": "Suitable", "name": "Wetlands (inland) - Shrub Dominated Wetlands"}]

export default class Habitats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  shouldComponentUpdate() {
    return true;
  }

  renderHabitats(habitat) {
    return (

      <Col sm={6} className="bs-docs-body">
        <Thumbnail src={ habitat.imageUrl } width="100%" height="33%">
          <h3>{ habitat.name }</h3>
          <p>Suitability: {habitat.suitability}</p>

        </Thumbnail>
      </Col>
    );
  };

  render() {
    return (
      <div>
        <NavMain activePage="habitats" />

        <PageHeader
          title="Habitats"
          subTitle=""/>

        <div className="container-fluid">

          { /* Habitats */ }

          <Row className="container-fluid">
            {

              habitats.map(function(habitat, i){
                return this.renderHabitats(habitat);
              }.bind(this))

            }


          </Row>


        </div>

        <PageFooter />
      </div>
    );
  }
}
