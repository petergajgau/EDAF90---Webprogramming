import React, { Component } from 'react';
import ProteinCheckbox from './ProteinCheckbox';
import ExtrasCheckbox from './ExtrasCheckbox';
import {withRouter} from 'react-router-dom'

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foundation: "",
      proteins: [],
      extras: [],
      dressing: ""
    };

    this.handleSelection = this.handleSelection.bind(this);
    this.handleCheckboxes = this.handleCheckboxes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelection(e) {
    let type = e.target.name;
    let value = e.target.value;

    if (type === "foundation") {
      this.setState({ foundation: value });
    } else if (type === "dressing") {
      this.setState({ dressing: value });
    }
    e.target.parentElement.classList.add("was-validated");
  }
  
  handleCheckboxes(e) {
    let type = e.target.name;
    let value = e.target.value;

    if (type === "protein") {
      if (e.target.checked) {
          this.setState({
              proteins: [...this.state.proteins, value]
          });
      } else {
          let index = this.state.proteins.indexOf(value);
          this.setState(this.state.proteins.splice(index, 1));
      }
    } else if(type === "extras"){
        if(e.target.checked) {
          this.setState({
              extras: [...this.state.extras, value]
          });
        } else {
          let index = this.state.extras.indexOf(value);
          this.setState(this.state.extras.splice(index, 1));
      }
    }
    e.target.parentElement.classList.add("was-validated");
  }

  handleSubmit(e){
    e.preventDefault();
    e.target.classList.add("was-validated");
    
    if (e.target.checkValidity() === true) {
      this.props.newSalad(this.state);
      this.props.history.push('/viewOrder');
      this.setState({
        foundation: "",
        proteins: [],
        extras: [],
        dressing: ""
      });
    }
  }

  render() {
    const inventory = this.props.inventory;
    const foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
    const proteins = Object.keys(inventory).filter(name => inventory[name].protein);
    const extras = Object.keys(inventory).filter(name => inventory[name].extra);
    const dressing = Object.keys(inventory).filter(name => inventory[name].dressing);
    
    return (
      <form onSubmit={this.handleSubmit}  noValidate>
        <div className="container">
          <div className="form-group">
            <label htmlFor="foundationSelect"><h5>Välj bas</h5></label>
            <select required className="form-control"  id="foundationSelect" name="foundation" onChange={this.handleSelection} value={this.state.foundation}>
              <option value='' disabled>-- Välj en bas --</option>
              {foundations.map(name => <option key={name} value={name}>
                {name} {"+"} {inventory[name].price} {"kr"}</option>)}
            </select>
            <div className="invalid-feedback">Du måste välja en bas.</div>
          </div>
        </div>
        <br />
        <div className="container">
          <h5>Välj protein</h5>
          <div>
            <ProteinCheckbox inventory={inventory} proteins={proteins} type="protein" 
              handleChange={this.handleCheckboxes} itemList={this.state.proteins}/>
          </div>
        </div>
        <br />
        <div className="container">
          <h5>Välj extras</h5>
          <div>
            <ExtrasCheckbox inventory={inventory} extras={extras} type="extras"
            handleChange={this.handleCheckboxes} itemList={this.state.extras}/>
          </div>
        </div>
        <br />
        <div className="container">
          <div className="form-group">
            <label htmlFor="dressingSelect"><h5>Välj dressing</h5></label>
            <select required className="form-control" id="dressingSelect" name="dressing" onChange={this.handleSelection} value={this.state.dressing}>
              <option value='' disabled>-- Välj en dressing --</option>
              {dressing.map(name => <option key={name} value={name}>
                {name} {"+"} {inventory[name].price} {"kr"}</option>)}
            </select>
            <div className="invalid-feedback">Du måste välja en dressing.</div>
          </div>
        </div>
        <br />
        <div className="container">
          <button type="submit" className="btn btn-primary" >
            Lägg till salad
          </button>
          {/*
          <button className="btn btn-secondary ml-3 " data-dismiss="modal">
             Stäng fönstret
          </button>
          */}
        </div>
      </form>
    );
  }
}

export default withRouter(ComposeSalad);