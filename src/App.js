import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import './App.css';

class App extends Component {
	products = [
		{
			prod_id: '1',
			prod_name: 'Hamburger',
			prod_price: 3,
			prod_image: 'https://img.icons8.com/plasticine/2x/hamburger.png',
			prod_description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
		},
		{
			prod_id: '2',
			prod_name: 'Cake',
			prod_price: 3,
			prod_image: 'https://img.icons8.com/plasticine/2x/hamburger.png',
			prod_description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
		},
		{
			prod_id: '3',
			prod_name: 'Coffee',
			prod_price: 5,
			prod_image: 'https://img.icons8.com/plasticine/2x/hamburger.png',
			prod_description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
		},
		{
			prod_id: '4',
			prod_name: 'Hotdog',
			prod_price: 3,
			prod_image: 'https://img.icons8.com/plasticine/2x/hamburger.png',
			prod_description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
		},
		{
			prod_id: '5',
			prod_name: 'Cupcake',
			prod_price: 7,
			prod_image: 'https://img.icons8.com/plasticine/2x/hamburger.png',
			prod_description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
		},
		{
			prod_id: '6',
			prod_name: 'Pie',
			prod_price: 8,
			prod_image: 'https://img.icons8.com/plasticine/2x/hamburger.png',
			prod_description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
		},
		{
			prod_id: '7',
			prod_name: 'Pizza',
			prod_price: 4,
			prod_image: 'https://img.icons8.com/plasticine/2x/hamburger.png',
			prod_description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
		},
		{
			prod_id: '8',
			prod_name: 'Bun',
			prod_price: 2,
			prod_image: 'https://img.icons8.com/plasticine/2x/hamburger.png',
			prod_description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
		}
	];

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Navbar />
					<Products products={this.products} />
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
