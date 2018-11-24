require('babel-register');
let connection;

const Students = class {

    static getByID(id) {
        return new Promise((resolve, reject) => {
            const resultQuery = 'SELECT * FROM students WHERE id = ?;';
            connection.query(resultQuery, id, (err, result) => {
                if(err) 
                    reject(new Error('Error to find one student'));
                else 
                    if (result[0] !== undefined) 
                        resolve(result[0]);
                    else 
                        reject(new Error(`Wrong id value ${id}`));
            })    
        });

    }

    static getAll(max) {
        return new Promise((resolve, reject) => {        
            if (max != undefined && max > 0) {
                const resultQuery = 'SELECT * FROM students LIMIT ?;';       
                connection.query(resultQuery, parseInt(max), (err, result) => {
                    if(err)
                        reject(new Error('Error to find all students with a limit'));                  
                    else
                        resolve(result);
                })
            }
            else if(max != undefined)
                reject(new Error('Wrong max value'));                  
            else {
                const resultQuery = 'SELECT * FROM students;';
                connection.query(resultQuery, (err, result) => {
                    if(err) 
                        reject(new Error('Error to find all students'));                  
                    else
                        resolve(result);
                })
            }
        })
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
                        reject(new Error(`error to insert the name : ${name}`));
                    else {                    
                        if (result.insertId) {
                            // returns an object representing the added student
                            resultQuery = 'SELECT * FROM students WHERE id = ?;';
                            connection.query(resultQuery, result.insertId, (err, result) => {
                                if(err) 
                                    reject(new Error('Error for return the inserted student'));
                                else {
                                    if (result[0] !== undefined)
                                        resolve(result);
                                    else
                                        reject(new Error(`Wrong id value ${result.insertId}`));
                                }
                            })
                        }
                        else
                            reject(new Error('Name already Exist'));
                    }
                })
            }
            else
                reject(new Error('No Name value'));
        })
    }
};


module.exports = (_connection) => {
    connection = _connection;
    return Students;
};