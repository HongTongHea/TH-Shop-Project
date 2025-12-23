const msql = require('mysql');

const connection = msql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_th_shop'
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