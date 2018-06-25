import React, { Component } from 'react'
import Label from '../Label'
import Input from '../Input'
import GenderSelector from '../GenderSelector'
import Usuario from '../../models/Usuario'

export default class NovoUsuario extends Component {
  state = { 
    usuario: new Usuario(),
    validacao: {
      nomeInvalido: false,
      generoInvalido: false
    }
  };
  
  atualizarNome = (e) => {
    let usuario = this.state.usuario;
    usuario.nome = e.target.value;
    this.setState({
      usuario: usuario
    });
  }

  atualizarGenero = (e, genero) => {
    e.preventDefault();
    let usuario = this.state.usuario;
    usuario.genero = genero;
    this.setState({
      usuario: usuario
    });
  }

  render() {
    return (
      <div className="center">
        <form className="pure-form pure-form-stacked">
          <Label  htmlFor="nome" texto="Quem é você?" isInvalido={this.state.validacao.nomeInvalido} />
          <Input
            id="nome"
            placeholder="Digite seu nome"
            maxLength="40"
            readOnly={false}
            isInvalido={this.state.validacao.nomeInvalido}
            defaultValue={this.state.usuario.nome}
            onChange={this.atualizarNome}
          />
          <Label
            texto="Seu gênero:"
            valorInvalido={this.state.validacao.generoInvalido}
          />
          <GenderSelector
            isInvalido={this.state.validacao.generoInvalido}
            genero={this.state.usuario.genero}
            atualizarGenero={this.atualizarGenero.bind(this)}
          />
        </form>
      </div>
    )
  }
}
