# Configuring a simple CICD pipeline with unit and integration testing using Node.js and PostgreSQL

- Create a simple CRUD application with the necessary endpoints/middlewares/ORM.
- Connext to PostgreSQL database using docker on the local machine.
- Write test cases for the endpoints using chai and mocha
- Configure a github action workflow to test the end-points every time there is a push to a specific branch or a pull request.
- Configure the branch protection rules in the repository similar to this:
 ![Screenshot from 2022-03-13 09-23-24](https://user-images.githubusercontent.com/30868587/158044367-373a3e4d-930e-4b7a-b5a5-a58786422004.png)
- Now whenever the action is triggered and all checks pass, it will look something like this:
 ![Screenshot from 2022-03-12 20-31-26](https://user-images.githubusercontent.com/30868587/158044403-ead9a475-8e73-4c57-adc0-415807de2bf2.png)

# Command to run postgres on docker for local development:
```docker run -d -p 5432:5432 --name node-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=node_postgres_cicd -e POSTGRES_USER=postgres postgres```

# This is what the .env file to be included in the project root:
```DB_USER=<db_username>
DB_HOST=<db_host> (localhost)
DATABASE=<db_name>
DB_HMAC=<db_password>
DB_PORT=5432 (according to docker command above)
DB_DIALECT="postgres"
DB_POOL_CONNECTION_LIMIT=10 (say)
DB_POOL_IDLE_TIMEOUT=30000 (say)
APP_PORT=3000
```
