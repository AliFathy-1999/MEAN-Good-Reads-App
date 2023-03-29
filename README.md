MEAN-Good-Reads-App

Introduction:

This documentation aims to provide an overview of the Goodreads Clone App built using the MEAN stack and hosted on GitHub. This app allows users to create an account, search and add books to their reading list, view and review books, and interact with other users through comments and book recommendations.

Prerequisites:

Before running the app, you should have the following installed:

Node.js
MongoDB
Angular CLI
Running the App:

To run the app locally, follow the below steps:

Clone the repository to your local machine using git clone <repository-url>
Navigate to the project directory using cd goodreads-clone
Install the dependencies using npm install
Start the backend server using npm run start:server
Open a new terminal window, navigate to the project directory, and start the frontend server using npm run start:client
Open your web browser and navigate to http://localhost:4200
App Features:

User Authentication: Users can create a new account, login, and logout. The authentication process is managed by JSON Web Tokens (JWTs).

Book Search and Adding to Reading List: Users can search for books using the Google Books API and add them to their reading list.

Book Details and Reviews: Users can view the details of a book, including its description, author, and reviews. Users can also add their own reviews and ratings.

User Interaction: Users can comment on books and recommend books to other users.

User Profile: Users can view their own profile, which includes their reading list and book reviews.

Code Structure:

client directory: This directory contains the Angular frontend code. It includes components, services, and models used to build the user interface.

server directory: This directory contains the Node.js backend code. It includes routes, controllers, and models used to handle user requests, interact with the database, and perform business logic.

package.json file: This file contains the dependencies and scripts used to build and run the app.

Conclusion:

The Goodreads Clone App is an example of a full-stack web application built using the MEAN stack. Its features include user authentication, book search, book details and reviews, user interaction, and user profiles. The app's code is structured into the client and server directories, with the package.json file containing the dependencies and scripts.
