require('babel-register');

const { errorsMessage } = require('../../config.root');

let connection;

const Students = class {

    static getByID(id) {
        return new Promise((resolve, reject) => {
            const resultQuery = 'SELECT * FROM students WHERE id = ?;';
            connection.query(resultQuery, id, (err, result) => {
                if(err) 
                    reject(new Error(`${errorsMessage.ErrorToFindOne} student`));
                else 
                    if (result[0] !== undefined) 
                        resolve(result[0]);
                    else 
                        reject(new Error(`${errorsMessage.WrongID} ${id}`));
            })    
        });
    }

    static getAll(max) {
        return new Promise((resolve, reject) => {        
            if (max != undefined && max > 0) {
                const resultQuery = 'SELECT * FROM students LIMIT ?;';       
                connection.query(resultQuery, parseInt(max), (err, result) => {
                    if(err)
                        reject(new Error(`${errorsMessage.ErrorToFindAll} students with a limit`));                  
                    else
                        resolve(result);
                })
            }
            else if(max != undefined)
                reject(new Error(errorsMessage.WrongMaxValue));                  
            else {
                const resultQuery = 'SELECT * FROM students;';
                connection.query(resultQuery, (err, result) => {
                    if(err) 
                        reject(new Error(`${errorsMessage.ErrorToFindAll} students`));                  
                    else
                        resolve(result);
                })
            }
        });
    }

    static add(name) {
        return new Promise((resolve, reject) => {
            if (name && name.trim().length) {
                name = name.trim();
                let resultQuery = `INSERT INTO students (name)
                SELECT * FROM (SELECT ?) AS tmp
                WHERE NOT EXISTS (
                    SELECT name FROM students WHERE name = ?
                ) LIMIT 1;`;
                connection.query(resultQuery, [name, name], (err, result) => {
                    if(err) 
                        reject(new Error(`${errorsMessage.ErrorToInsert} the name : ${name}`));
                    else {                    
                        if (result.insertId) {
                            // returns an object representing the added student
                            resultQuery = 'SELECT * FROM students WHERE id = ?;';
                            connection.query(resultQuery, result.insertId, (err, result) => {
                                if(err) 
                                    reject(new Error(`${errorsMessage.ErrorToReturnTheInserted} student`));
                                else {
                                    if (result[0] !== undefined)
                                        resolve(result);
                                    else
                                        reject(new Error(`${WrongIdValue} ${result.insertId}`));
                                }
                            })
                        }
                        else
                            reject(new Error(errorsMessage.ValueAlreadyExist));
                    }
                })
            }
            else
                reject(new Error(errorsMessage.NoValue));
        });
    }

    static update(id, name) {
        return new Promise ((resolve, reject) => {
            if(name && name.trim().length && id)  {
                name = name.trim();
                const resultQuery = 'UPDATE students SET name = ? WHERE id = ?;';
                connection.query(resultQuery, [name, id], (error, result) => {
                    if(error) 
                        reject(new Error(`${errorsMessage.ErrorToUpdate} the student: ${id}`));
                    else
                        resolve(true);
                })
            }
            else
                reject(new Error(errorsMessage.NoValue));
        });
    }
    
    static delete(id) {
        return new Promise((resolve, reject) => {
            const resultQuery = 'DELETE FROM students WHERE id = ?;';
            connection.query(resultQuery, id, (error, result) => {           
                if(error) 
                    reject(`${errorsMessage.ErrorToDelete} the student: ${id}`);
                else
                    resolve(true);
            })
        });
    }
};


module.exports = (_connection) => {
    connection = _connection;
    return Students;
};