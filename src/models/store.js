module.exports = function(sequelize, DataTypes){
  var Store = sequelize.define('store', {
    name: {
      type: DataTypes.STRING,
      //field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    address: {
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  });

  Store.sync().then(function () {
    // Table created
    return Store.create({
      name: 'Sash\'s pelmeni',
      address: 'This is the place'
    });
  }).catch(function(err){console.log(err);});

  return Store;
}
