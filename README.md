<!DOCTYPE html>
<html>
<body>
	<h1>Documentation for GitHub MEAN App Goodreads Clone</h1>
  <h2>Introduction:</h2>
<p>This documentation aims to provide an overview of the Goodreads Clone App built using the MEAN stack and hosted on GitHub. This app allows users to create an account, search and add books to their reading list, view and review books, and interact with other users through comments and book recommendations.</p>

<h2>Prerequisites:</h2>
<p>Before running the app, you should have the following installed:</p>
<ol>
	<li>Node.js</li>
	<li>MongoDB</li>
	<li>Angular CLI</li>
</ol>

<h2>Running the App:</h2>
<p>To run the app locally, follow the below steps:</p>
<ol>
	<li>Clone the repository to your local machine using <code>git clone &lt;repository-url&gt;</code></li>
	<li>Navigate to the project directory using <code>cd goodreads-clone</code></li>
	<li>Install the dependencies using <code>npm install</code></li>
	<li>Start the backend server using <code>npm run start:server</code></li>
	<li>Open a new terminal window, navigate to the project directory, and start the frontend server using <code>npm run start:client</code></li>
	<li>Open your web browser and navigate to <code>http://localhost:4200</code></li>
</ol>

<h2>App Features:</h2>
<ol>
	<li>User Authentication: Users can create a new account, login, and logout. The authentication process is managed by JSON Web Tokens (JWTs).</li>
	<li>Book Search and Adding to Reading List: Users can search for books using the Google Books API and add them to their reading list.</li>
	<li>Book Details and Reviews: Users can view the details of a book, including its description, author, and reviews. Users can also add their own reviews and ratings.</li>
	<li>User Interaction: Users can comment on books and recommend books to other users.</li>
	<li>User Profile: Users can view their own profile, which includes their reading list and book reviews.</li>
</ol>

<h2>Code Structure:</h2>
<ol>
	<li><code>client</code> directory: This directory contains the Angular frontend code. It includes components, services, and models used to build the user interface.</li>
	<li><code>server</code> directory: This directory contains the Node.js backend code. It includes routes, controllers, and models used to handle user requests, interact with the database, and perform business logic.
	Backend latest version repo link: [a link](https://github.com/nadaezzat-99/Bookary-API)
	</li>
	<li><code>package.json</code> file: This file contains the dependencies and scripts used to build and run the app.</li>
</ol>

<h2>Conclusion:</h2>
<p>The Goodreads Clone App is an example of a full-stack web application built using the MEAN stack. Its features include user authentication, book search, book details and reviews, user interaction, and user profiles. The app's code is structured into the client and server directories, with the package.json file containing the dependencies and scripts.</p>
</body>
</html>
