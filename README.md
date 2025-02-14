# Book-SHOW

# Backend Routes

# /auth endpoints

# /auth/signup - POST

Auth Signup
This endpoint allows users to sign up by providing their name, email, and password.
Request Body
name (string): The name of the user.
password (string): The password for the user account.
email (string): The email address of the user.

Response
Upon successful signup, the server responds with a status code of 201 and a JSON object containing the user data and a token.
userData (object): An object containing user information including id, name, email, role, booked tickets, creation and update timestamps, and version.
token (string): A token for authentication and authorization.

User Routes

# /auth/login - POST

Auth Login
This endpoint is used to authenticate and login a user.
Request Body
email (text, required): The email of the user.
password (text, required): The password of the user.

Response
Status: 200
Content-Type: application/json
message (string): A message from the server.
userData (object): An object containing user data.
\_id: The unique identifier of the user.
name: The name of the user.
email: The email of the user.
role: The role of the user.
bookedTickets: An array of booked tickets by the user.
createdAt: The timestamp of user creation.
updatedAt: The timestamp of user data update.
\_\_v: Version control field.

token (string): The authentication token for the user.

# /auth/logout -POST

This enpoint is used to logout a user.
Token based authentication
The authentication is performed through jwt token in cookie of user browser.

Resonse:200
message: logout successful

# /auth/getuserdata - GET

This endpoint is used to get user data.
Token based authentication
The authentication is performed through jwt token in cookie of user browser.

Response:200
userData (object): An object containing user data.
\_id: The unique identifier of the user.
name: The name of the user.
email: The email of the user.
role: The role of the user.
profilePic: The profile picture Steing of the user.
bookedTickets: An array of booked tickets by the user.
createdAt: The timestamp of user creation.
updatedAt: The timestamp of user data update.
\_\_v: Version control field.

# /media/movies - GET

This enpoint is used to get all the movies.

Response:200
movies (array): An array of movie objects.
\_id: The unique identifier of the movie.
title: The title of the movie.
description: The description of the movie.
releaseDate: The release date of the movie.
duration: The duration of the movie.
language: The language of the movie.
genre: The genre of the movie.
rating: The rating of the movie.
posterUrl: The poster of the movie.

# /media/shows - GET

This enpoint is used to get all the shows.

Response:200
shows (array): An array of show objects.
\_id: The unique identifier of the show.
title: The title of the show.
description: The description of the show.

                    ------************--------

/auth/admin endpoints

# Admin Routes:

The admin routes are protected via middle where which checks the user token and role based access is given.

# /auth/admin/alldetails - GET

This endpoint is used to get all the details such as total number of the movies, users, shows and theatres.
Response:200
movies (number): The total number of movies.
users (number): The total number of users.
theatres (number): The total number of theatres.
shows (number): The total number of shows.

# /auth/admin/movie/add - POST

This endpoint is used to add a movie.
Request Body
title (string): The title of the movie.
description (string): The description of the movie.
genere (string): The genre of the movie.
releaseDate (string): The release date of the movie.
language (string): The language of the movie.
duration (number): The duration of the movie.
rating (number): The rating of the movie.
posterUrl (string): The poster URL of the movie.

Response:200

# /auth/admin/movie/update- PUT

# /auth/admin/movie/delete- DELETE
