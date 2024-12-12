
# Book API

Welcome to the **Book API** repository! This project provides a RESTful API for managing books and users. With it, you can **create, read, update, and delete** books, as well as handle user management.

## Features

- **CRUD Operations for Books**: Easily create, read, update, and delete book entries.
- **User Management**: Manage users for the application, ensuring secure and authenticated access.
- **MySQL Integration**: Leverages MySQL databases for reliable and efficient data persistence.
- **Test Suite**: Includes tests to verify functionality and integrity.

## Prerequisites

- **Node.js** (v14+ recommended)
- **MySQL** (Ensure you have a running MySQL instance)
- **npm** (comes with Node.js)

## Database Setup

1. Create two MySQL databases:  
   - `books_app`  
   - `books_app_test`

2. Set up environment variables to connect to these databases. Copy the provided `.env.example` file to `.env` and fill in the details:
   ```dotenv
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_DEV_NAME=books_app
   DB_TEST_NAME=books_app_test

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/CastroCastroCastro/book-api.git
   ```

2. **Navigate into the server directory**:
   ```bash
   cd book-api/server
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Server

To start the development server, run:
```bash
npm run dev
```
This will start the server on the configured port (check your `.env` file or server logs for details).

## Testing

To run the test suite, open a new terminal window and run:
```bash
npm run test
```
This will execute the test cases against your `books_app_test` database.

## Future Improvements

- **Frontend Integration**: In upcoming releases, a dedicated frontend application will be built to provide an intuitive and user-friendly interface for interacting with the Book API. This will include:
  - A user dashboard to manage books and user profiles
  - A responsive design compatible with various screen sizes
  - A streamlined user experience for book browsing, adding, and editing

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with any improvements or suggestions.
```
