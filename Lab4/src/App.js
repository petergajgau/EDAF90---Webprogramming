import React, { Component } from 'react'
import './App.css';
//import inventory from './inventory.ES6';
import ViewOrder from './ViewOrder'
import ComposeSalad from './ComposeSalad';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import NotFound from './NotFound';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { salads: [] ,  inventory: {} };

    this.createSalad = this.createSalad.bind(this);
    this.removeOrder = this.removeOrder.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    let saladOrder = JSON.parse(localStorage.getItem('saladOrders'))
    if (saladOrder != null) {
      this.setState({ salads: saladOrder })
    }

    let inventory = {};
    let baseURL = 'http://localhost:8080/';
    let typeURLS = ['foundations', 'proteins', 'extras', 'dressings'];

    Promise.all(typeURLS.map(typeURL => {
      return fetch(baseURL + typeURL)
        .then(response => response.json())
        .then(items => {
          return Promise.all(items.map(item => {
            return fetch(baseURL + typeURL + '/' + item)
              .then(response => response.json())
              .then(data => inventory[item] = data)
          }))
        })
    }))
      .then(() => this.setState({inventory}));
      console.log(inventory);
  }

  createSalad(e) {
    console.log("app fick", e);
    let temp = { ...e };
    temp.id = uuidv4();
    temp.price = this.calculatePrice(e);
    //const salad = [...this.state.salads, temp];
    this.setState({ salads: [...this.state.salads, temp] }, () =>
      {window.localStorage.setItem('salads', JSON.stringify(this.state.salads))}
    ); 
  }

  calculatePrice(e) {
    let price =
      this.state.inventory[e.foundation].price +
      this.state.inventory[e.dressing].price +
      e.proteins.concat(e.extras).reduce((sum, curr) => {
        return sum + this.state.inventory[curr].price;
      }, 0);

    return price;
  }

  removeOrder() {
    this.setState({ salads: [] })
  }

  placeOrder(){
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.salads)
    };
    fetch('http://localhost:8080/orders/', options);

    this.setState({ salads: [] })
  }

  render() {

    console.log("local storage");
    for (let i = 0; i < localStorage.length; i++)  {
      console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
    }


    const composeSalad = (...params) => <ComposeSalad inventory={this.state.inventory} newSalad={this.createSalad}/>
    const viewOrder= (...params) => <ViewOrder order={this.state.salads} handleClear={this.removeOrder} placeOrder={this.placeOrder}/>
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
