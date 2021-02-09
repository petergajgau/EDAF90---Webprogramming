import React, { Component } from 'react';


class ProteinCheckbox extends Component {
  render() {
    const inventory = this.props.inventory;
    const proteins = this.props.proteins;

    return(
      <div>
      {proteins.map(name => 
        <div key={name} className="form-check">
            <input className="form-check-input" type="checkbox" value={name} name={this.props.type}
              checked={this.props.itemList.includes(name) || false} onChange={this.props.handleChange}/> 
            <label>
              {name} {"+"} {inventory[name].price} {"kr"}
            </label>
        </div>
      )}
      </div>
    );
  }
}

export default ProteinCheckbox;