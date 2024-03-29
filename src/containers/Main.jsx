import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import scrollToComponent from 'react-scroll-to-component';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Section from '../components/Home/Section';
import PointerMenu from '../components/Home/PointerMenu';
import ContactUsComponent from '../components/ContactUs';

import * as MainActionCreators from '../actions/';
import * as ContactUs from '../actions/ContactUs';

import '../style/animate.min.css'; // eslint-disable-line
import acercaNosotrosImg from '../images/portada-revista-costa-rica-ef-elfima-20131008-0015-1.jpg';
import inviertaImg from '../images/portada-revista-costa-rica-ef-elfima-20131008-0015-2.jpg';
import solicitudPrestamoImg from '../images/portada-revista-costa-rica-ef-elfima-20131008-0015-3.jpg';
import contactenosImg from '../images/portada-revista-costa-rica-ef-elfima-20131008-0015-4.jpg';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollAnimation: {
        offset: 0,
        align: 'top',
        duration: 1000,
        ease: 'inCirc',
      },
      acercaNosotrosSelected: true,
      invertirSelected: false,
      solicitudCreditoSelected: false,
      contactenosSelected: false,
      isAuth: false,
      redirectTo: '',
    };
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators({
      MainActionCreators,
      ContactUs,
    }, dispatch);
  }
  componentWillMount() {
    if (this.props.authData.data !== null) {
      const { isAuth } = this.props.authData;
      const { roleId } = this.props.authData.data;
      let redirectTo = roleId === 1 ? '/cliente/dashboard' : '';
      redirectTo = roleId === 2 ? '/inversionista/dashboard' : redirectTo;
      this.setState({
        isAuth,
        redirectTo,
      });
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', () => {
      this.last_known_scroll_position = window.pageYOffset;
      if (this.changeBulletState) {
        this.changeBulletState(this.last_known_scroll_position);
      }
    });
    if (this.props.authData.data === null) {
      const { dispatch } = this.props;
      dispatch(MainActionCreators.toggleMenuState(true));
      dispatch(MainActionCreators.toggleMenuHideState(false));
    }
    scrollToComponent(this.acercaNosotros, this.state.scrollAnimation);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', () => {});
  }
  changeBulletState(windowScrollPos) {
    const aboutScrollPos = document.querySelector('#acerca-de-nosotros');
    const investScrollPos = document.querySelector('#invertir');
    const creditRequestScrollPos = document.querySelector('#solicitud-de-credito');
    const contactUsScrollPos = document.querySelector('#contactenos');
    if (aboutScrollPos && (windowScrollPos >= aboutScrollPos.offsetTop ||
      windowScrollPos === aboutScrollPos.offsetTop) && windowScrollPos < investScrollPos.offsetTop) {
      this.setState({
        acercaNosotrosSelected: true,
        invertirSelected: false,
        solicitudCreditoSelected: false,
        contactenosSelected: false,
      });
    } else if (investScrollPos && (windowScrollPos >= investScrollPos.offsetTop ||
      windowScrollPos === investScrollPos.offsetTop) && windowScrollPos <= creditRequestScrollPos.offsetTop - 1) {
      this.setState({
        acercaNosotrosSelected: false,
        invertirSelected: true,
        solicitudCreditoSelected: false,
        contactenosSelected: false,
      });
    } else if (creditRequestScrollPos && (windowScrollPos >= creditRequestScrollPos.offsetTop ||
      windowScrollPos === creditRequestScrollPos.offsetTop) && windowScrollPos <= contactUsScrollPos.offsetTop - 1) {
      this.setState({
        acercaNosotrosSelected: false,
        invertirSelected: false,
        solicitudCreditoSelected: true,
        contactenosSelected: false,
      });
    } else if (contactUsScrollPos && (windowScrollPos >= contactUsScrollPos.offsetTop || windowScrollPos === contactUsScrollPos.offsetTop)) {
      this.setState({
        acercaNosotrosSelected: false,
        invertirSelected: false,
        solicitudCreditoSelected: false,
        contactenosSelected: true,
      });
    }
  }
  menuItemsOnClick(reference, id) {
    scrollToComponent(reference, this.state.scrollAnimation);
    if (id === 1) {
      this.setState({
        acercaNosotrosSelected: true,
        invertirSelected: false,
        solicitudCreditoSelected: false,
        contactenosSelected: false,
      });
    } else if (id === 2) {
      this.setState({
        acercaNosotrosSelected: false,
        invertirSelected: true,
        solicitudCreditoSelected: false,
        contactenosSelected: false,
      });
    } else if (id === 3) {
      this.setState({
        acercaNosotrosSelected: false,
        invertirSelected: false,
        solicitudCreditoSelected: true,
        contactenosSelected: false,
      });
    } else if (id === 4) {
      this.setState({
        acercaNosotrosSelected: false,
        invertirSelected: false,
        solicitudCreditoSelected: false,
        contactenosSelected: true,
      });
    }
  }
  handleSendMessage(data) {
    const { dispatch } = this.props;
    dispatch(ContactUs.sendMsgEmail(data));
  }
  render() {
    if (this.state.isAuth) {
      return <Redirect to={this.state.redirectTo} />;
    }
    const menuItems = [
      {
        anchor: '/#acerca-de-nosotros',
        id: 1,
        isSelected: this.state.acercaNosotrosSelected,
        onClick: () => this.menuItemsOnClick(this.acercaNosotros, 1),
      },
      {
        anchor: '/#invertir',
        id: 2,
        isSelected: this.state.invertirSelected,
        onClick: () => this.menuItemsOnClick(this.invertir, 2),
      },
      {
        anchor: '/#solicitud-de-credito',
        id: 3,
        isSelected: this.state.solicitudCreditoSelected,
        onClick: () => this.menuItemsOnClick(this.solicitudCredito, 3),
      },
      {
        anchor: '/#contactenos',
        id: 4,
        isSelected: this.state.contactenosSelected,
        onClick: () => this.menuItemsOnClick(this.contactenos, 4),
      },
    ];
    return (
      <div className="main">
        <PointerMenu
          menuItems={menuItems}
        />
        <Container fluid>
          <div ref={(section) => { this.acercaNosotros = section; }}>
            <Section
              bgImg={acercaNosotrosImg}
              title="Somos la primera comunidad de crédito “peer to peer” de Costa Rica"
              content="Nuestro enfoque de desarrollo basado en una nueva economía que acerca a ambas partes del proceso de crédito, reduciendo costos y trámites, a diferencia de los tradicionales sectores de crédito formal o préstamos entre particulares." // eslint-disable-line
              buttonText="Más acerca de nosotros"
              buttonType="large"
              buttonTo="/acercadenosotros"
              itemId="acerca-de-nosotros"
              scrollTo="#invertir"
            />
          </div>
          <div ref={(section) => { this.invertir = section; }}>
            <Section
              bgImg={inviertaImg}
              title="Invierta con tranquilidad"
              content="La inversión tradicional tiene pocos rendimientos o es inestable, por eso hemos diseñado un sistema que permite ganar hasta un 43% de su inversión inicial, manteniendo en control su operación y eligiendo los proyectos de su preferencia." // eslint-disable-line
              buttonText="Invertir"
              buttonType="large"
              buttonTo="/invierta"
              itemId="invertir"
              scrollTo="#solicitud-de-credito"
            />
          </div>
          <div ref={(section) => { this.solicitudCredito = section; }}>
            <Section
              bgImg={solicitudPrestamoImg}
              title="CRÉDITO PARA SU DEUDA"
              content="Si los pagos en la casa de empeño, la tarjeta de crédito o el prestamista no le permiten avanzar, no baja la deuda y la relación se volvió un círculo vicioso de nunca acabar, es hora de formar parte del Club de Préstamos y dar un giro a su vida." // eslint-disable-line
              buttonText="Solicitar Préstamo"
              buttonType="large"
              buttonTo="/prestamos"
              itemId="solicitud-de-credito"
              scrollTo="#contactenos"
            />
          </div>
          <div ref={(section) => { this.contactenos = section; }}>
            <section
              className="home-section"
              style={{ backgroundImage: `url(${contactenosImg})` }}
              id="contactenos"
            >
              <ContactUsComponent
                handleSendMessage={this.handleSendMessage}
                sent={this.props.sent}
              />
            </section>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authData: state.user,
  sent: state.contactUs.sent,
});

export default withRouter(connect(mapStateToProps)(Main));
