const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'react-kiosk-db'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Notes
// req means getting data from front-end
// res means sending a response to server

app.post('/api/insert-customer-order', (req, res) => {
	// Getting data from front end
	const prod_name = req.body.prod_name;
	const prod_desc = req.body.prod_desc;
	const prod_price = req.body.prod_price;
	const prod_quantity = req.body.prod_quantity;
	const table_id = req.body.table_id;

	const sqlInsert =
		'INSERT INTO cart_item (prod_name, prod_desc, prod_price, prod_quantity, table_id) VALUES (?,?,?,?,?)';
	db.query(sqlInsert, [ prod_name, prod_desc, prod_price, prod_quantity, table_id ], (err, result) => {
		console.log(result);
		console.log(err);
	});
});

app.listen(3001, () => {
	console.log('running on port 3001');
});
