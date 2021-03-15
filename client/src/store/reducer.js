import * as actionTypes from './actions';

// =========== GLOBAL STATE ===========
const initialState = {
	selectedItems: [], // contains a list of objects
	totalPrice: 0,
	tableId: 5
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_TO_CART: {
			// Default value of quantity is 1 when cart is empty
			if (state.selectedItems.length === 0) {
				action.product.prod_quantity = 1;
			}

			// if item has already been added to shopping cart, only updates the quantity
			if (state.selectedItems.some((item) => item.prod_id === action.product.prod_id)) {
				const itemIndex = state.selectedItems.findIndex((item) => {
					return item.prod_id === action.product.prod_id;
				});

				const itemObj = {
					...state.selectedItems[itemIndex]
				};

				itemObj.prod_quantity += 1;

				const itemArray = [ ...state.selectedItems ];
				itemArray[itemIndex] = itemObj;

				return {
					...state,
					selectedItems: itemArray
				};
			} else {
				// Adding new items to shopping cart
				action.product.prod_quantity = 1;
				let array = [ ...state.selectedItems ];
				array.push(action.product);

				return {
					...state,
					selectedItems: array
				};
			}
		}

		case actionTypes.INCREASE_QUANTITY: {
			// index value of item
			const itemIndex = state.selectedItems.findIndex((item) => {
				return item.prod_id === action.prod_obj.prod_id;
			});

			const itemObj = {
				...state.selectedItems[itemIndex]
			};

			itemObj.prod_quantity += 1;

			const itemArray = [ ...state.selectedItems ];
			itemArray[itemIndex] = itemObj;

			return {
				...state,
				selectedItems: itemArray
			};
		}

		case actionTypes.DECREASE_QUANTITY: {
			// index value of item
			const itemIndex = state.selectedItems.findIndex((item) => {
				return item.prod_id === action.prod_obj.prod_id;
			});

			const itemObj = {
				...state.selectedItems[itemIndex]
			};

			itemObj.prod_quantity -= 1;

			// If quantity is zero, remove item from cart
			if (itemObj.prod_quantity === 0) {
				const itemArray = [ ...state.selectedItems ];
				itemArray.splice(itemIndex, 1);
				return {
					...state,
					selectedItems: itemArray
				};
			}

			const itemArray = [ ...state.selectedItems ];
			itemArray[itemIndex] = itemObj;

			return {
				...state,
				selectedItems: itemArray
			};
		}

		case actionTypes.CALCULATE_TOTAL_PRICE: {
			return {
				...state,
				totalPrice: action.total_price
			};
		}
	}

	return state;
};

export default reducer;
