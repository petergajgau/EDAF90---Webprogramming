import React, { Component } from 'react';

class ExtrasCheckbox extends Component {
  render() {
    const extras = this.props.extras;
    const inventory = this.props.inventory;
    
    return(
      <div>
      {extras.map(name => 
        <div key={name} className="form-check">
            <input className="form-check-input" type="checkbox" value={name} name={this.props.type}
              checked={this.props.itemList.includes(name) || false} onChange={this.props.handleChange}/>
          <label>
            {name} {"+"} {inventory[name].price} {"kr"}</label>
        </div>
      )}
      </div>
    );
  }
}

export default ExtrasCheckbox;