import React, { Component } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import * as utils from '../../../utils';

import InputField from '../../InputField';

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrors: false,
    };
    autobind(this);
  }
  handleSubmit() {
    if (!this.state.hasErrors) {
      this.props.handleSubmit();
    }
  }
  validation({ type, value, customRegExp }) {
    let result = true;
    if (value === '') result = true;
    if (utils.validateExp({ type, value })) result = false;
    if (customRegExp) {
      if (utils.validateExp({ type, value, customRegExp })) result = false;
    }
    this.setState({
      hasErrors: result,
    });
    return result;
  }
  render() {
    const { investorInfo, onChangeField } = this.props;
    const inputFields = [{
      id: 1,
      placeholder: 'Nombre *',
      errorMessage: 'Campo requerido, digite solamente caracteres',
      customClass: 'name',
      onChangeField,
      name: 'name',
      defaultValue: investorInfo.name,
      isRequired: true,
      validation: value => this.validation({ value, type: 'text' }),
    },
    {
      id: 2,
      placeholder: 'Apellido *',
      errorMessage: 'Campo requerido, digite solamente caracteres',
      onChangeField,
      name: 'lastName',
      defaultValue: investorInfo.lastName,
      isRequired: true,
      validation: value => this.validation({ value, type: 'text' }),
    },
    {
      id: 3,
      placeholder: 'Cédula *',
      errorMessage: 'Campo requerido. Nacional: #-####-####',
      onChangeField,
      name: 'identification',
      defaultValue: investorInfo.identification,
      isRequired: true,
      validation: value => this.validation({ value, type: 'identification' }),
    },
    {
      id: 4,
      placeholder: 'Teléfono *',
      errorMessage: 'Campo requerido. Formato de teléfono ####-#### ó ########',
      inputType: 'tel',
      onChangeField,
      name: 'phone',
      defaultValue: investorInfo.phone,
      isRequired: true,
      validation: value => this.validation({ value, type: 'phone' }),
    },
    {
      id: 5,
      placeholder: 'Celular *',
      errorMessage: 'Campo requerido. Formato de celular ####-#### ó ########',
      inputType: 'tel',
      onChangeField,
      name: 'cellphone',
      defaultValue: investorInfo.cellphone,
      isRequired: true,
      validation: value => this.validation({ value, type: 'phone' }),
    },
    {
      id: 6,
      placeholder: 'Email * (Este va ser su usuario)',
      errorMessage: 'Campo requerido. Formato de email inválido.',
      inputType: 'email',
      customClass: 'email',
      onChangeField,
      name: 'email',
      defaultValue: investorInfo.email,
      isRequired: true,
      validation: value => this.validation({ value, type: 'email' }),
    }];
    return (
      <div className="investor-subscription step1">
        <Form onSubmit={this.handleSubmit}>
          {
            inputFields.map(inputField => (
              <Form.Field key={inputField.id} className={inputField.customClass ? inputField.customClass : ''}>
                <InputField
                  placeholder={inputField.placeholder}
                  validation={inputField.validation}
                  errorMessage={inputField.errorMessage}
                  inputType={inputField.inputType}
                  onChangeField={inputField.onChangeField}
                  name={inputField.name}
                  defaultValue={inputField.defaultValue}
                  isRequired={inputField.isRequired}
                />
              </Form.Field>
            ))
          }
          <button
            type="submit"
            className="btn default"
          >
            {this.props.btnText}
          </button>
          <span>Campos obligatorios **</span>
        </Form>
      </div>
    );
  }
}

Step1.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onChangeField: PropTypes.func.isRequired,
  investorInfo: PropTypes.object.isRequired,
  btnText: PropTypes.string.isRequired,
};

export default Step1;
