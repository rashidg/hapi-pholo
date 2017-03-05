var storeController = require('src/controllers/store');
var storeValidate = require('src/validate/store');

module.exports = [
	{
		method: 'GET',
		path: '/stores/{store_id}',
		config : {
			handler: storeController.findByID,
			validate: storeValidate.findByID
		}
	},
	{
		method: 'GET',
		path: '/stores',
		config : {
			handler: storeController.find,
			validate : storeValidate.find
		}
	},
	{
		method: 'POST',
		path: '/stores',
		config : {
			handler : storeController.insert,
			validate : storeValidate.insert
		}
	},
	{
		method: 'PUT',
		path: '/stores/{store_id}',
		config : {
			handler: storeController.update,
			validate : storeValidate.update
		}
	},
	{
		method: 'DELETE',
		path: '/stores/{store_id}',
		config : {
			handler: storeController.delete,
			validate : storeValidate.delete
		}
	}
];
