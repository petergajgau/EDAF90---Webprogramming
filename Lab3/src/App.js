import React, { Component } from 'react'
import './App.css';
import inventory from './inventory.ES6';
import ViewOrder from './ViewOrder'
import ComposeSalad from './ComposeSalad';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import NotFound from './NotFound';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { salads: [] };

    this.createSalad = this.createSalad.bind(this);
    this.removeOrder = this.removeOrder.bind(this)
  }

  createSalad(e) {
    console.log("app fick", e);
    let temp = { ...e };
    temp.id = uuidv4();
    temp.price = this.calculatePrice(e);
    const salad = [...this.state.salads, temp];
    this.setState({ salads: salad })
  }

  calculatePrice(e) {
    let price =
      inventory[e.foundation].price +
      inventory[e.dressing].price +
      e.proteins.concat(e.extras).reduce((sum, curr) => {
        return sum + inventory[curr].price;
      }, 0);

    return price;
  }

  removeOrder() {
    this.setState({ salads: [] })
  }

  render() {
    console.log(this.state)
    const composeSalad = (...params) => <ComposeSalad inventory={inventory} newSalad={this.createSalad}/>
    const viewOrder= (...params) => <ViewOrder order={this.state.salads} handleClear={this.removeOrder}/>
    return (
      <Router>
        <div>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="nav-link" to='/composeSalad'> Komponera din egen sallad</Link>
            </li>
              <Link className="nav-link" to='/viewOrder'>Se din order</Link>
          </ul>
          <div className="jumbotron text-center">
            <h1>My Own Salad Bar</h1>
            <p>Here you can order custom made salads!</p>
          </div>
          <Switch>
            <Route path="/composeSalad" render={composeSalad} />
            <Route path="/viewOrder" render={viewOrder} />
            <Route component={NotFound} />
          </Switch>
      </div>
    </Router >
    );
  }
}

export default App;
