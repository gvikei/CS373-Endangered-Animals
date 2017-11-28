import React from 'react';

import NavMain from './NavMain';
import PageFooter from './PageFooter';
import Grid from '../../components/Grid';
import Alert from '../../components/Alert';
import Glyphicon from '../../components/Glyphicon';
import Label from '../../components/Label';
import Carousel from '../../components/Carousel';
import Modal from '../../components/Modal';
import FormControl from '../../components/FormGroup';
import FormGroup from '../../components/FormControl';
import Button from '../../components/Button';


const MyLargeModal = React.createClass({
  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Wrapped Text</h4>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  },
});



export default class HomePage extends React.Component {

  handleClick(e) {
    this.setState({
      lgModalShow : !this.state.lgModalShow
    });
    console.log('lgModalShow', this.state.lgModalShow);
  }

  constructor(props) {
    super(props);
    this.state = {
      lgModalShow: false
    }
  }

  render() {
    let lgClose = () => this.setState({ lgModalShow: false });

    return (
      <div>
        <NavMain activePage="home"/>

          <FormGroup>
          </FormGroup>
          {' '}
          <Button type="submit" onClick={ ()=> {this.handleClick()}} >
            Search
          </Button>
          <MyLargeModal show={this.state.lgModalShow} onHide={lgClose} />

        <div>
          <Carousel>
            <Carousel.Item>
              <img className={"carousel"} src="http://animals.sandiegozoo.org/sites/default/files/2016-10/animals_hero_penguin_02_1.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="http://www.cambridgeblog.org/wp-content/uploads/2015/05/What-is-an-Animal.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="http://animals.sandiegozoo.org/sites/default/files/2016-11/animals_hero_african_spurred_tortoise.jpg" />
            </Carousel.Item>
          </Carousel>
        </div>
        
      </div>
    );
  }
}
