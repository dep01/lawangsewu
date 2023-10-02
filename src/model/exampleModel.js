// HOW TO IMPORT ?
// const Convert = require('location/exampleModel.js'); 
// OR
// import Convert from 'location/exampleModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfexampleModel(data)
// FOR ARRAY
// const data = Convert.listOfexampleModel(data)
const modelOfDataexampleModel = {
	userId: 0,
	id: 0,
	title: '',
	completed: false
};
function listOfexampleModel(data = []) {
  var listData = [modelOfDataexampleModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				userId: val.userId ?? null,
				id: val.id ?? null,
				title: val.title ?? null,
				completed: val.completed ?? null
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfexampleModel(data = null) {
  var objectData = modelOfDataexampleModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.userId = data.userId ?? null;
		objectData.id = data.id ?? null;
		objectData.title = data.title ?? null;
		objectData.completed = data.completed ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfexampleModel: listOfexampleModel,
  objectOfexampleModel: objectOfexampleModel,
};




  