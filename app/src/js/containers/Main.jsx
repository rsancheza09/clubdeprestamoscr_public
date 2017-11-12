import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import scrollToComponent from 'react-scroll-to-component';

import Section from '../components/Home/Section';
import PointerMenu from '../components/Home/PointerMenu';

import '../../style/animate.min.css'; // eslint-disable-line

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
    };
  }
  componentDidMount() {
    scrollToComponent(this.acercaNosotros, this.state.scrollAnimation);
  }
  menuItemsOnClick(reference, id) {
    scrollToComponent(reference, this.state.scrollAnimation);
    if (id === 1) {
      this.setState({
        acercaNosotrosSelected: true,
        invertirSelected: false,
        solicitudCreditoSelected: false,
      });
    } else if (id === 2) {
      this.setState({
        acercaNosotrosSelected: false,
        invertirSelected: true,
        solicitudCreditoSelected: false,
      });
    } else if (id === 3) {
      this.setState({
        acercaNosotrosSelected: false,
        invertirSelected: false,
        solicitudCreditoSelected: true,
      });
    }
  }
  render() {
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
    ];
    return (
      <div className="main">
        <PointerMenu
          menuItems={menuItems}
        />
        <Container fluid>
          <div ref={(section) => { this.acercaNosotros = section; }}>
            <Section
              bgImg="images/portada-revista-costa-rica-ef-elfima-20131008-0015-1.jpg"
              title="Somos la primera comunidad de crédito “peer to peer” de Costa Rica"
              content="Nuestro enfoque de desarrollo basado en una nueva economía que acerca a ambas partes del proceso de crédito, reduciendo costos y trámites, a diferencia de los tradicionales sectores de crédito formal o préstamos entre particulares." // eslint-disable-line
              buttonText="Más acerca de nosotros"
              buttonType="large"
              buttonTo="/acercadenosotros"
              itemId="acerca-de-nosotros"
              scrollToOnClick={menuItems[1].onClick}
            />
          </div>
          <div ref={(section) => { this.invertir = section; }}>
            <Section
              bgImg="images/portada-revista-costa-rica-ef-elfima-20131008-0015-2.jpg"
              title="Invierta con tranquilidad"
              content="La inversión tradicional tiene pocos rendimientos o es inestable, por eso hemos diseñado un sistema que permite ganar hasta un 43% de su inversión inicial, manteniendo en control su operación y eligiendo los proyectos de su preferencia." // eslint-disable-line
              buttonText="Invertir"
              buttonType="large"
              buttonTo="/invertir"
              itemId="invertir"
              scrollToOnClick={menuItems[2].onClick}
            />
          </div>
          <div ref={(section) => { this.solicitudCredito = section; }}>
            <Section
              bgImg="images/portada-revista-costa-rica-ef-elfima-20131008-0015-3.jpg"
              title="CRÉDITO PARA SU DEUDA"
              content="Si los pagos en la casa de empeño, la tarjeta de crédito o el prestamista no le permiten avanzar, no baja la deuda y la relación se volvió un círculo vicioso de nunca acabar, es hora de formar parte del Club de Préstamos y dar un giro a su vida." // eslint-disable-line
              buttonText="Solicitar Préstamo"
              buttonType="large"
              buttonTo="/solicitudcredito"
              itemId="solicitud-de-credito"
              scrollToOnClick={menuItems[0].onClick}
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default Main;
