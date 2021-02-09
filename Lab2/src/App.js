import React, { Component } from 'react'
import './App.css';
import inventory from './inventory.ES6';
import ViewOrder from './ViewOrder'
import ComposeSaladModal from './ComposeSaladModal';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { salads: []};

    this.createSalad = this.createSalad.bind(this);
    this.removeOrder = this.removeOrder.bind(this)
  }

  createSalad(e) {
    console.log("app fick", e);
    let temp = {...e};
    temp.id = uuidv4();
    temp.price = this.calculatePrice(e);
    const salad = [...this.state.salads, temp];

    this.setState({ salads: salad })
  }

  calculatePrice(e){
    let price = 
      inventory[e.foundation].price +
      inventory[e.dressing].price + 
      e.proteins.concat(e.extras).reduce((sum, curr) => {
        return sum + inventory[curr].price;
      }, 0);
    
    return price;
  }

  removeOrder(){
    this.setState({ salads: [] })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <div className="jumbotron text-center">
          <h1>My Own Salad Bar</h1>
          <p>Here you can order custom made salads!</p> 
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <ComposeSaladModal  inventory={inventory} onSubmit={this.createSalad}/>
            </div>
            <div className="col-sm">
              <ViewOrder order={this.state.salads} handleClear={this.removeOrder}/>
            </div>
          </div>
        </div>
    </div>
    );
  }   
}

export default App;
