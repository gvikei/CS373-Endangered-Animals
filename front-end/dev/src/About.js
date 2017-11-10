  import React from 'react';

  import NavMain from './NavMain';
  import PageHeader from './PageHeader';
  import PageFooter from './PageFooter';
  import Row from '../../components/Row';
  import Col from '../../components/Col';
  import Thumbnail from '../../components/Thumbnail';

  var axios = require('axios');

  export default class Page extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        stats: [],
        ids: ["gvikei", "shivavelingker", "datvu2110", "bryanlng", "mantunguyen"]
      };
      
      var id;
      for (id in this.state.ids) {
        var github_id = this.state.ids[id]
        this.state.stats[github_id] = 0;
      }

      var that = this;
      axios.get('https://api.github.com/repos/gvikei/idb/contributors')
        .then(function(data) {

          var member;
          var my_stats = [];
          for (id in data.data) {
            member = data.data[id];
            my_stats[member["login"]]= member["contributions"];
          }

          that.setState({
            stats: my_stats
          });
        });
    }

    shouldComponentUpdate() {
      return true;
    }

    render() {
      return (
        <div>
          <NavMain activePage="about" />

          <PageHeader
            title="About Us"
            subTitle="The issue of endangered animals and species extinction has always been a major concern of animal conservationists and environmentalists alike. Unfortunately, throughout the years, there has been less and less care and concern for the protection and preservation of endangered animals. We chose this topic in order to promote and spread awareness of this issue. This task will be accomplished by making information about endangered animals and their threats more widely available."/>

            <div className="container bs-docs-container bs-docs-single-col-container">
              <div className="bs-docs-section">
                <h2> Our Team </h2>
            
                { /* Profiles */ }
                <Row>
                  <Col sm={4}>
                    <Thumbnail src="https://raw.githubusercontent.com/bryanlng/jekyll-now/master/images/IMG_9269.JPG" alt="242x200">
                    <h3>Bryan Leung</h3>
                      <div class="card-body">
                        <h6 class="card-subtitle mb-3 text-muted">Worked on back-end &amp; database</h6>
                        <p class="card-text">
                          I’m currently a third year CS major at UT, who enjoys coding and playing super smash bros.
                        </p>
                        <Row className="show-grid">
                          <Col xs={12} md={12}>Number of commits: {this.state.stats["bryanlng"]}</Col>
                          <Col xs={12} md={12}>Number of issues: 14</Col>
                          <Col xs={12} md={12}>Number of unit tests: 0</Col>
                        </Row>
                      </div>
                    </Thumbnail>
                  </Col>

                  <Col sm={4}>
                    <Thumbnail src="https://scontent.fftw1-1.fna.fbcdn.net/v/t1.0-9/13516299_10207873551411360_9045318712286918375_n.jpg?oh=9c880396ff5c8a8ac48c991637b732c1&oe=5A49092A" alt="242x200">
                    <h3>Khuyen Duong</h3>
                      <div class="card-body">
                        <h6 class="card-subtitle mb-3 text-muted">Worked full-stack</h6>
                        <p class="card-text">
                          I’m a senior in CS at UT Austin. <br/><br/> I worked at Oklahoma State University (2013), Google (2014 & 2015), Ecole Polytechnique Fédérale de Lausanne (2016) and Dun & Bradstreet (2017).
                        </p>
                        <Row className="show-grid">
                          <Col xs={12} md={12}>Number of commits: {this.state.stats["gvikei"]}</Col>
                          <Col xs={12} md={12}>Number of issues: 5</Col>
                          <Col xs={12} md={12}>Number of unit tests: 0</Col>
                        </Row>
                      </div>
                    </Thumbnail>
                  </Col>

                  <Col sm={4}>
                    <Thumbnail src="https://shivavelingker.files.wordpress.com/2017/09/headshot.jpg" alt="242x200">
                    <h3>Shiva Velingker</h3>
                      <div class="card-body">
                        <h6 class="card-subtitle mb-3 text-muted">Worked on front-end</h6>
                        <p class="card-text">
                          I’m a junior in Computer Science and Humanities (a design-your-own major) at The University of Texas at Austin.  <br/><br/>
                          Check out my portfolio!
                          <br/>
                          <a href="https://shivavelingker.github.io" target="_blank">https://shivavelingker.github.io</a>
                        </p>
                        <Row className="show-grid">
                          <Col xs={12} md={12}>Number of commits: {this.state.stats["shivavelingker"]}</Col>
                          <Col xs={12} md={12}>Number of issues: 5</Col>
                          <Col xs={12} md={12}>Number of unit tests: 0</Col>
                        </Row>
                      </div>
                    </Thumbnail>
                  </Col>

                  <Col sm={4}>
                    <Thumbnail src="https://i2.wp.com/mantunguyen.files.wordpress.com/2017/09/dsc_0221.jpg" alt="242x200">
                    <h3>Mantu Nguyen</h3>
                      <div class="card-body">
                        <h6 class="card-subtitle mb-3 text-muted">Worked on front-end</h6>
                        <p class="card-text">
                          Senior CS major.
                        </p>
                        <Row className="show-grid">
                          <Col xs={12} md={12}>Number of commits: {this.state.stats["mantunguyen"]}</Col>
                          <Col xs={12} md={12}>Number of issues: 5</Col>
                          <Col xs={12} md={12}>Number of unit tests: 0</Col>
                        </Row>
                      </div>
                    </Thumbnail>
                  </Col>

                  <Col sm={4}>
                    <Thumbnail src="https://scontent-dft4-1.xx.fbcdn.net/v/t1.0-9/1506886_753512884678059_561446582_n.jpg?oh=5923ed9975b1e3bcda90fd59e4dcd0b1&oe=5A12E93B" alt="242x200">
                    <h3>Dat Vu</h3>
                      <div class="card-body">
                        <h6 class="card-subtitle mb-3 text-muted">Worked on back-end & database.</h6>
                        <p class="card-text">
                          I’m a Senior CS major at UT Austin.
                        </p>
                        <Row className="show-grid">
                          <Col xs={12} md={12}>Number of commits: {this.state.stats["datvu2110"]}</Col>
                          <Col xs={12} md={12}>Number of issues: 15</Col>
                          <Col xs={12} md={12}>Number of unit tests: 0</Col>
                        </Row>
                      </div>
                    </Thumbnail>
                  </Col>
                </Row>

                { /* Tools */ }
                <Row>
                  <Col sm={4}>
                    <h2> Tools </h2>
                      <p><a href="http://www.apiary.io" target="_blank">Apiary</a>: Documentation tool for our RESTful API, used to document our RESTful API. <a href="http://docs.endangeredanimals.apiary.io/" target="_blank">Link to our API documentation.</a></p>
                      <p><a href="http://www.trello.com" target="_blank">Trello</a>: Project management tool used to track tasks and issues. <a href="https://trello.com/b/9W2VbqWT/part-1" target="_blank">Link to our Trello</a></p>
                      <p><a href="http://www.planitpoker.com" target="_blank">PlanItPoker</a>: Project management tool used to estimate the amount of time a task would take to complete.</p>
                      <p><a href="http://www.nc.me" target="_blank">Namecheap</a>: Domain name registration site used to obtain a name for our website.</p>
                      <p><a href="http://flask.pocoo.org/" target="_blank">Flask</a>: Web microframework for backend Python that was used to connect our HTML templates to our URL address, as well as develop a RESTful API.</p>
                      <p><a href="http://www.github.com" target="_blank">Github</a>: Web-based Git version control software that was used to maintain the source code. <a href="https://github.com/gvikei/idb/" target="_blank">Link to our Github repo</a></p>
                      <p><a href="http://getbootstrap.com/" target="_blank">Bootstrap</a>: Front-end framework used to design our webpages.</p>
                  </Col>

                  <Col sm={4}>
                    <h2> Data Sources </h2>
                      <a class="text-justify" href="http://apiv3.iucnredlist.org/api/v3/docs">IUCN Red List API - v3</a>
                      <p>This API was used to pull the majority of our data on endangered animals. Data was scraped by calling the provided URLs using our provided REST service.</p>
                  
                      <a class="text-justify" href="https://developers.google.com/youtube/v3/docs/search/list">Youtube Data API</a>
                      <p>This API was used to pull video data for each of the endangered animals. Data was scraped by calling the provided URLs using our provided REST service.</p>

                      <a class="text-justify" href="https://developers.google.com/maps/documentation/geocoding/start">Google Geocoding API</a>
                      <p>This API was used to pull location and coordinate data for habitats.  Data was scraped by calling the provided URLs using our provided REST service.</p>

                      <a class="text-justify" href="https://azure.microsoft.com/en-us/services/cognitive-services/bing-image-search-api/">Bing Image Search</a>
                      <p>This API was used to pull image data for the endangered animals.  Data was scraped by calling the provided URLs using our provided REST service.</p>
                  </Col>

                  <Col sm={4}>
                    <h2> Additional Information </h2>
                    <p><a href="https://utexas.app.box.com/s/sjecumzujuh5kwsqn1vrkhfjjbwwgbwr">Technical​​ Report​​ for​​ Group​​ 22</a></p>
                    <p><a href="https://utexas.app.box.com/s/jt8v5blmmxemsq27f3s35tzo197qmosv">UML Design for Group​​ 22</a></p>
                  </Col>
                </Row>

              </div>
            </div>

          <PageFooter />
        </div>
    );
    }
  }
