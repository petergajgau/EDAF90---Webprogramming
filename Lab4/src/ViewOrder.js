import React, { Component } from "react";
import "./ViewOrder.css";
import { Link } from 'react-router-dom';

class ViewOrder extends Component {

	render() {
		return (
			<div>
				<ul className="list-group order-list">
					{this.props.order.map((salad, index) => (
						<li key={salad.id} className="list-group-item">
							{index + 1 + ": " + salad.foundation + ", " + salad.proteins.join(", ") + ", " +
								salad.extras.join(", ") + ", " + salad.dressing}
							<span className="price">{salad.price + " kr"}</span>
						</li>
					))}
				</ul>
				{this.props.order.length > 0 ? (
					<>
						<Link
							to="/composeSalad" 
							className="btn btn-danger clear"
							onClick={this.props.handleClear}
						>
							Rensa
            </Link>
						<Link 
							to="/composeSalad" 
							className="btn btn-primary placeOrder" 
							onClick={this.props.placeOrder}
						>
							Lägg din beställning
						</Link>
					</>
				) : (
						<p >Börja din beställning genom att komponera din egen sallad.</p>
					)}
			</div>
		);
	};
};

export default ViewOrder;