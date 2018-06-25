import React, { Component } from 'react'
import Label from '../Label'
import Input from '../Input'
import GenderSelector from '../GenderSelector'
import Usuario from '../../models/Usuario'
import Button from '../Button'

export default class NovoUsuario extends Component {
  state = { 
    usuario: new Usuario(),
    validacao: {
      nomeInvalido: false,
      generoInvalido: false
    },
    primeiraVisaoCompleta: false
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

  validar = (e) => {
    e.preventDefault();
    let usuario = this.state.usuario;
    let validacao = this.state.validacao;
    let mensagem = '';
    let primeiraVisaoCompleta = false;

    validacao.nomeInvalido = ! usuario.validarNome();
    validacao.generoInvalido = ! usuario.validarGenero();
    
    if (validacao.nomeInvalido && validacao.generoInvalido) {
      mensagem = 'Os campos nome e gênero estão inválidos!'
    } else if (validacao.nomeInvalido) {
      mensagem = 'Seu nome está inválido!'
    } else if (validacao.generoInvalido) {
      mensagem = 'Selecione seu gênero!'
    } else {
      primeiraVisaoCompleta = true;
    }
    if (!primeiraVisaoCompleta) {
      this.props.erro(mensagem);
    }
    
    this.setState({
      validacao: validacao,
      primeiraVisaoCompleta: primeiraVisaoCompleta
    });  
  }

  renderizarNome = () => {
    return (
      <section>
        <Label
          htmlFor="nome"
          texto="Quem é você?"
          isInvalido={this.state.validacao.nomeInvalido}
        />
        <Input
          id="nome"
          placeholder="Digite seu nome"
          maxLength="40"
          readOnly={this.state.primeiraVisaoCompleta}
          isInvalido={this.state.validacao.nomeInvalido}
          defaultValue={this.state.usuario.nome}
          onChange={this.atualizarNome}
        />
      </section>
    )
  }

  renderizarGenero = () => {
    if (this.state.primeiraVisaoCompleta) {
      return null
    } else {
      return (
        <section>
          <Label
            texto="Seu gênero:"
            isInvalido={this.state.validacao.generoInvalido}
          />
          <GenderSelector
            isInvalido={this.state.validacao.generoInvalido}
            genero={this.state.usuario.genero}
            atualizarGenero={this.atualizarGenero}
          />
        </section>
      )
    }
  }

  renderizarBotoes = () => {
    if (this.state.primeiraVisaoCompleta) {
      return (
        <section>
          <Button
            texto="Voltar"
            onClick={e => {
              e.preventDefault();
              this.setState({
                primeiraVisaoCompleta: false
              });
            }}
          />
          <Button principal texto="Salvar" />
        </section>
      )
      } else {
        return (
          <section>
            <Button principal texto="Próximo" onClick={this.validar} />
          </section>
        )
      }
  }

  render() {
    return (
      <div className="center">
        <form className="pure-form pure-form-stacked">
        {this.renderizarNome()}
        {this.renderizarGenero()}
        {this.renderizarBotoes()}
        </form>
      </div>
    )
  }
}
