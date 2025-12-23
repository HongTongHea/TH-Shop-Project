const msql = require('mysql');

const connection = msql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my_database'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    else { 
        console.log('Database connection successfully.');
    }
});

module.exports = connection;