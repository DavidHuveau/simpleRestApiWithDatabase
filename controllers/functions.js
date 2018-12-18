const STATUS_SUCCESS = 'success';
const STATUS_ERROR = 'error';

const success = res => {
  return {
    status: STATUS_SUCCESS,
    result: res
  };
};

const error = msg => {
  return {
    status: STATUS_ERROR,
    message: msg
  };
};

exports.success = success;
exports.error = error;
