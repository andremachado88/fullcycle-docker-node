const express = require('express');

const app = express();

const port = 3000;

const config = {
    host : 'db-mysql',
    user : 'root',
    password : 'root',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

// comment

app.get('/', (req, res) => 
{
    const sqlInsert = "INSERT INTO people (name) VALUES ('Usuário1')";
    
    connection.query(sqlInsert, (err, results) => 
    {
        if (err) {
            console.error('❌ Error insert data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
    })

    const sql = "SELECT name FROM people";
    
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('❌ Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log('Query results:', results);

        // Convert results array into a list of names
        const names = results.map(row => row.name).join(', ');

        res.send(`<h1>Full Cycle Rocks!</h1> <p>Lista: ${names}</p>`);
    });
});


app.listen(port, () => {
    console.log('rodando na porta: '+ port);
})