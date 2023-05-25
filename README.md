## Full Stack Todo App
This is a full stack todo app built with Express.js, Sequelize, PostgreSQL, and React.js. The application allows users to create, update, and delete tasks, and manage their todo list.

### Requirements
<ul>
  <li>Node.js</li>
  <li>PostgreSQL database</li>
</ul>

### Installation
- Clone the repository:
```
git clone https://github.com/darkxdev/todo-app.git
```
- Navigate to the project directory:
```
cd todo-app
```

### Set up the PostgreSQL database
- Make sure PostgreSQL is installed and running on your machine.
- Create a new PostgreSQL database for the application.

### Running the server
- Navigate to the backend directory:
```
cd backend
```
- Install server dependencies:
```
npm install
```
- The application uses environment variables for configuration. Create a .env file in the project root directory and provide the following variables:
```
SECRET_KEY = your-secret-key
DB_LINK = postgres://username:password@host:port/database
```
- Start the Server:
```
node server.js
```
- Return to the project directory:
```
cd ..
```

### Running the Client
- Navigate to the frontend directory:
```
cd frontend
```
- Install server dependencies:
```
npm install
```
- The application uses environment variables for configuration. Create a .env file in the project root directory and provide the following variables:
```
REACT_APP_API_HOST=http://localhost:5000
```
- Start the server:
```
npm start
```

### Usage
- Open your browser and navigate to http://localhost:3000.
- Sign up for a new account or log in if you already have one.
  - If you are registering, you will need to log in to use the app.
- Create, update, or delete tasks from your todo list.
- Mark tasks as completed or pending.
- Log out when you're done.

### Technologies Used
<ul>
  <li>Express.js: Fast, unopinionated, minimalist web framework for Node.js.</li>
  <li>Sequelize: Promise-based ORM for Node.js that supports PostgreSQL.</li>
  <li>PostgreSQL: Powerful, open-source relational database system.</li>
  <liReact.js: JavaScript library for building user interfaces.></li>
  <li>Create React App: Set of tools and configuration for bootstrapping React applications.</li>
</ul>

### Folder Structure
/backend: Express.js server application w/ Sequelize ORM.

/fronted: React client application.

### Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

### License
This project is licensed under the MIT License.
