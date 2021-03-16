import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Axios from 'axios';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import Product from './Product/Product';

const products = (props) => {
	// Retrieving current order summary from database
	// const [ products, setProducts ] = useState([]);

	useEffect(() => {
		Axios.get('http://localhost:3001/api/retrieve-product-listing').then((response) => {
			// setProducts(response.data);

			// Save to global state
			props.onSaveProductListing(response.data);
		});
	}, []);

	let products = props.productsGlobal;

	if (props.searchInputValue.length > 0) {
		let filteredItems = products.filter((item) => item.prod_name.toLowerCase().includes(props.searchInputValue));
		products = filteredItems;
	}

	return (
		<React.Fragment>
			<h4 className="mt-3">Menu</h4>
			<Row>
				{products.map((product, index) => (
					<Col md={3} sm={6} key={index}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</React.Fragment>
	);
};

// STORE
const mapStateToProps = (global_state) => {
	return {
		data: global_state.selectedItems,
		searchInputValue: global_state.searchInputValue,
		productsGlobal: global_state.products
	};
};

// ACTION
const mapDispatchToProps = (dispatch) => {
	return {
		onSaveProductListing: (prod_db) => dispatch({ type: actionTypes.ALL_PRODUCT_LISTING, products: prod_db })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(products);
