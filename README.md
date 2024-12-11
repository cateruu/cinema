# Cinema - management system

This API is designed to manage a cinema's operations, including handling movies, room configurations, and reservations. It enables seamless movie scheduling, room allocation, and booking management, providing an efficient solution for cinema administrators to maintain an organized, user-friendly experience for customers.

## Tech used
- Java
- Spring Boot
- PostgreSQL
- AWS (S3)
- Cloudflare (CDN)
- JWT

### User authentication

This API provides user authentication with JWT.

<summary><code>POST</code> <code><b>/v1/auth/register</b></code> <code>register user in database</code></summary>
<summary><code>POST</code> <code><b>/v1/auth/login</b></code> <code>get JWT token for user</code></summary>

### Users

<summary><code>GET</code> <code><b>/v1/users</b></code> <code>get all users</code></summary>
<summary><code>GET</code> <code><b>/v1/users/{id}</b></code> <code>get user by id</code></summary>
<summary><code>PATCH</code> <code><b>/v1/users/{id}</b></code> <code>update user information</code></summary>

### Rooms

<summary><code>POST</code> <code><b>/v1/rooms</b></code> <code>add new room</code></summary>
<summary><code>GET</code> <code><b>/v1/rooms</b></code> <code>get all rooms</code></summary>
<summary><code>GET</code> <code><b>/v1/rooms/{id}</b></code> <code>get room by id</code></summary>
<summary><code>GET</code> <code><b>/v1/rooms/{id}/reservations</b></code> <code>get all reservations made for the room</code></summary>
<summary><code>PATCH</code> <code><b>/v1/rooms/{id}</b></code> <code>update room</code></summary>
<summary><code>DELETE</code> <code><b>/v1/rooms/{id}</b></code> <code>remove room</code></summary>

### Movies

<summary><code>POST</code> <code><b>/v1/movies</b></code> <code>add new movie</code></summary>
<summary><code>GET</code> <code><b>/v1/movies</b></code> <code>get all movies</code></summary>
<summary><code>GET</code> <code><b>/v1/movies/{id}</b></code> <code>get movie by id</code></summary>
<summary><code>PATCH</code> <code><b>/v1/movies/{id}</b></code> <code>update movie</code></summary>
<summary><code>DELETE</code> <code><b>/v1/movies/{id}</b></code> <code>remove movie</code></summary>

### Reservations

<summary><code>POST</code> <code><b>/v1/reservations</b></code> <code>add new reservation</code></summary>
<summary><code>GET</code> <code><b>/v1/reservations</b></code> <code>get all reservations</code></summary>
<summary><code>GET</code> <code><b>/v1/reservations/{id}</b></code> <code>get reservation by id</code></summary>
<summary><code>PATCH</code> <code><b>/v1/reservations/{id}</b></code> <code>update reservation</code></summary>

### Uploads

<summary><code>POST</code> <code><b>/v1/upload</b></code> <code>upload an image to the S3 bucket</code></summary>
