//var storeValidate = require('src/validate/store');

module.exports = [
	{
		method: 'GET',
		path: '/stores',
		config: {
			handler: (request, reply) => {
				const db = request.getDb('pholo_db');
	      const Store = db.getModel('store');
				Store.findAll().then((stores) => {reply(stores)});
			},
			//validate : storeValidate.find
		}
	},
	{
		method: 'GET',
		path: '/stores/{store_id}',
		config: {
			handler: (request, reply) => {
				const db = request.getDb('pholo_db');
	      const Store = db.getModel('store');
	      reply(Store.findById(request.params.store_id));
			},
			//validate: storeValidate.findByID
		}
	},
	{
		method: 'POST',
		path: '/stores',
		config: {
			handler: (request, reply) => {
				const db = request.getDb('pholo_db');
	      const Store = db.getModel('store');
				console.log(request.payload);
				reply(Store.create(request.payload));
			},
			//validate : storeValidate.insert
		}
	},
	{
		method: 'PUT',
		path: '/stores/{store_id}',
		config: {
			handler: (request, reply) => {
				const db = request.getDb('pholo_db');
	      const Store = db.getModel('store');
				reply(Store.findById(request.params.store_id).then((store)=>{store.update(request.payload);}));
			},
			//validate : storeValidate.update
		}
	},
	{
		method: 'DELETE',
		path: '/stores/{store_id}',
		config: {
			handler: (request, reply) => {
				const db = request.getDb('pholo_db');
	      const Store = db.getModel('store');
				Store.findById(request.params.store_id).then((store)=>{store.destroy();});
				reply('');
			},
			//validate : storeValidate.delete
		}
	}
];
