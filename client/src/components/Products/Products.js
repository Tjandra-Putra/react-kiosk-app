import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Axios from 'axios';

import Product from './Product/Product';

const products = (props) => {
	// Retrieving current order summary from database
	const [ products, setProducts ] = useState([]);

	useEffect(() => {
		Axios.get('http://localhost:3001/api/retrieve-product-listing').then((response) => {
			setProducts(response.data);
			console.log(response.data);
		});
	}, []);

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

export default products;
