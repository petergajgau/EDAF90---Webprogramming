import React, { Component } from 'react';
import ProteinCheckbox from './ProteinCheckbox';
import ExtrasCheckbox from './ExtrasCheckbox';

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
    console.log(type)

    if (type === "foundation") {
      this.setState({ foundation: value });
    } else if (type === "dressing") {
      this.setState({ dressing: value });
    }
  }
  
  handleCheckboxes(e) {
    let type = e.target.name;
    let value = e.target.value;
    console.log(type)
    console.log(e.target.checked)

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

  }

  handleSubmit(e){
    e.preventDefault();
    this.props.onSubmit(this.state);
    //this.firstSelect.value = "";
    //this.secondSelect.value = "";
    this.setState({
      foundation: "",
      proteins: [],
      extras: [],
      dressing: ""
    });
  }

  render() {
    const inventory = this.props.inventory;
    const foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
    const proteins = Object.keys(inventory).filter(name => inventory[name].protein);
    const extras = Object.keys(inventory).filter(name => inventory[name].extra);
    const dressing = Object.keys(inventory).filter(name => inventory[name].dressing);
    console.log(this.state)

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container">
          <h5>Välj bas</h5>
          <div>
            <select ref={(ref) => this.firstSelect = ref} className="form-control" name="foundation" onChange={this.handleSelection} value={this.state.foundation}>
              <option hidden />
              {foundations.map(name => <option key={name} value={name}>
                {name} {"+"} {inventory[name].price} {"kr"}</option>)}
            </select>
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
          <h5>Välj dressing</h5>
          <div className="form-group">
            <select ref={(ref) => this.secondSelect = ref} className="form-control" name="dressing" onChange={this.handleSelection} value={this.state.dressing}>
              <option hidden />
              {dressing.map(name => <option key={name} value={name}>
                {name} {"+"} {inventory[name].price} {"kr"}</option>)}
            </select>
          </div>
        </div>
        <br />
        <div className="container">
          <button type="submit" className="btn btn-primary" >
            Lägg till salad
          </button>
          <button className="btn btn-secondary ml-3 " data-dismiss="modal">
             Stäng fönstret
          </button>
        </div>
      </form>
    );
  }
}

export default ComposeSalad;