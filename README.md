## MySQL Status Demo App

Simple Node.js/Express app that connects to MySQL. The MySQL dependency is **required** logically, but the app is resilient: if the database is down or the connection fails, the HTTP server still runs and `/` shows that MySQL is **not connected** instead of crashing.

### Setup

1. **Install dependencies**

   ```bash
   cd D:\xxx\test-db-mongo-app
   npm install
   ```

2. **Create `.env` file**

   In the project root, create a file named `.env` based on `env.example`:

   ```bash
   copy env.example .env
   ```

   Then edit `.env` and set your real MySQL connection values:

   ```text
   PORT=3000
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=yourpassword
   MYSQL_DATABASE=yourdatabase
   ```

3. **Run the app**

   ```bash
   npm start
   ```

4. **Check the root endpoint**

   Visit `http://localhost:3000/` (or whatever `PORT` you configured). You should see JSON like:

   ```json
   {
     "message": "Hello World",
     "mysql": {
       "connected": true
     }
   }
   ```

   If MySQL is down or connection fails, you will see:

   ```json
   {
     "message": "Hello World",
     "mysql": {
       "connected": false
     }
   }
   ```

