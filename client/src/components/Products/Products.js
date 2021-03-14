import React from 'react';
import Product from './Product/Product';

import { Row, Col } from 'react-bootstrap';

const products = (props) => {
	return (
		<React.Fragment>
			<h4 className="mt-3">Menu</h4>
			<Row>
				{props.products.map((product, index) => (
					<Col md={3} sm={6} key={index}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</React.Fragment>
	);
};

export default products;
