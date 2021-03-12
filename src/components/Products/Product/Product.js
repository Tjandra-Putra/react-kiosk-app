import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions';
import './Product.css';

const product = (props) => {
	const [ show, setShow ] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<React.Fragment>
			<Card className="text-center my-3 card" onClick={handleShow}>
				<Card.Img
					variant="top"
					src={props.product.prod_image}
					style={{ width: '5rem' }}
					className="mx-auto pt-4"
				/>
				<Card.Body>
					<Card.Title>{props.product.prod_name}</Card.Title>
				</Card.Body>
			</Card>

			<Modal show={show} onHide={handleClose} centered className="text-center p-5 modal">
				<Card.Img
					variant="top"
					src={props.product.prod_image}
					style={{ width: '10rem' }}
					className="mx-auto pt-4"
				/>
				<Modal.Title className="mx-auto">{props.product.prod_name}</Modal.Title>

				<Modal.Body className="m-0 p-0 text-primary">$ {props.product.prod_price}</Modal.Body>

				<Modal.Body className="mt-3 p-0">$ {props.product.prod_description}</Modal.Body>

				{/* <div className="d-flex justify-content-center">
					<div className="p-2 bd-highlight">
						<Button variant="secondary" size="sm" onClick={() => props.decreaseQuantity(props.product)}>
							-
						</Button>
					</div>
					<div className="p-2 bd-highlight">{props.data.map((item) => <p>{item.prod_quantity}</p>)}</div>
					<div className="p-2 bd-highlight">
						<Button variant="secondary" size="sm" onClick={() => props.increaseQuantity(props.product)}>
							+
						</Button>
					</div>
				</div> */}
				<Modal.Footer className="border-0">
					<Button variant="primary mb-3 mt-3" onClick={() => props.addToCart(props.product)} block>
						Add to Cart
					</Button>
				</Modal.Footer>
				<ul>
					{props.data.map((item) => (
						<li>
							{item.prod_name}, {item.prod_quantity}
						</li>
					))}
				</ul>
			</Modal>
		</React.Fragment>
	);
};

// STORE
const mapStateToProps = (global_state) => {
	return {
		data: global_state.selectedItems
	};
};

// ACTION
const mapDispatchToProps = (dispatch) => {
	return {
		addToCart: (item) =>
			dispatch({
				type: actionTypes.ADD_TO_CART,
				product: item
			}),
		increaseQuantity: (prod_obj) =>
			dispatch({
				type: actionTypes.INCREASE_QUANTITY,
				prod_obj: prod_obj
			}),
		decreaseQuantity: (prod_obj) =>
			dispatch({
				type: actionTypes.DECREASE_QUANTITY,
				prod_obj: prod_obj
			})
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(product);
