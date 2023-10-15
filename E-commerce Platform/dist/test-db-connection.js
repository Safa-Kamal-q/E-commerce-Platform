import mysql from 'mysql2/promise';
// Replace these with your actual database connection details
const dbConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};
async function testDatabaseConnection() {
    try {
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);
        // Attempt to connect
        await connection.connect();
        console.log('Connected to the database');
        // Close the connection
        await connection.end();
    }
    catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}
// Call the function to test the database connection
testDatabaseConnection();
//# sourceMappingURL=test-db-connection.js.map