<!-- @format -->

# Gallery store api

This is a Node.js Express server application that provides authentication and image upload functionality.

The script first imports required dependencies:

    `dotenv` is used to load environment variables from a .env file.
    `express` is used to build the server and handle HTTP requests.
    `cors` is used to handle cross-origin resource sharing (CORS) requests.
    `mongoose` is used to connect to and perform operations on a MongoDB database.
    `jwt` is used to handle JSON Web Tokens (JWT) for authentication.
    `bcryptjs` is used to hash and compare passwords securely.
    `multer` is used to handle file uploads.

Then it defines an Express application, app, and sets up middlewares for handling incoming requests, such as JSON parsing and handling CORS. The script then connects to a MongoDB database using the MONGODB_URL environment variable.

The application provides several endpoints for authentication and image upload functionality:

    A `/register` endpoint to handle user registration and store user data in the MongoDB database.
    A `/login` endpoint to handle user login and generate a JWT to be sent back to the client.
    A `/update` endpoint to handle updating user information in the MongoDB database.
    A `/avatar` endpoint to handle uploading an avatar image and storing it in the MongoDB database.

The script makes use of MongoDB models to interact with the database, including `User`, `avatarImage`, `imageUpload`, and `imageCaption`. These models define the schema for the documents to be stored in the database.

In the file upload endpoint, a `multer middleware` is used to handle file uploads. The uploaded file is then stored as a new document in the MongoDB database using the `avatarImage` model.
