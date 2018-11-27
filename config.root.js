const config = {};
config.rootAPI = '/api/v1';
config.port = 3000;

exports.config = config;

const errorsMessage = {};
errorsMessage.WrongID = 'Wrong id value';
errorsMessage.ErrorToFindOne = 'Error to find one';
errorsMessage.ErrorToFindAll = 'Error to find all';
errorsMessage.WrongMaxValue = 'Wrong max value';
errorsMessage.WrongIdValue = 'Wrong id value';
errorsMessage.ErrorToInsert = 'error to insert';
errorsMessage.ErrorToReturnTheInserted = 'Error for return the inserted';
errorsMessage.ValueAlreadyExist = 'Value already Exist';
errorsMessage.NoValue = 'No value';
errorsMessage.ErrorToUpdate = 'Error to update';
errorsMessage.ErrorToDelete = 'Error to delete';

exports.errorsMessage = errorsMessage;
