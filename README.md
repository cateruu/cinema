# Cinema - management system 🎬

A comprehensive full-stack solution for managing cinema operations, enabling efficient movie scheduling, room management, and ticket reservations.

### Overview

This project consists of two main components:

- robust REST API backend for managing core cinema operations
- modern, responsive frontend application for both administrators and customers

## Tech Stack

- **Backend**
  - Java
  - Spring Boot
  - PostgreSQL
  - AWS (S3)
  - Cloudflare (CDN)
  - JWT
- **Frontend**
  - Next.js 15 (App Router)
  - React 19
  - TailwindCSS

## Endpoints

<details>
<summary>User authentication</summary>

<summary><code>POST</code> <code><b>/v1/auth/register</b></code> <code>register user in database</code></summary>
<summary><code>POST</code> <code><b>/v1/auth/login</b></code> <code>get JWT token for user</code></summary>
</details>

<details>
<summary>Users</summary>

<summary><code>GET</code> <code><b>/v1/users</b></code> <code>get all users</code></summary>
<summary><code>GET</code> <code><b>/v1/users/{id}</b></code> <code>get user by id</code></summary>
<summary><code>PATCH</code> <code><b>/v1/users/{id}</b></code> <code>update user information</code></summary>
</details>

<details>
<summary>Rooms</summary>

<summary><code>POST</code> <code><b>/v1/rooms</b></code> <code>add new room</code></summary>
<summary><code>GET</code> <code><b>/v1/rooms</b></code> <code>get all rooms</code></summary>
<summary><code>GET</code> <code><b>/v1/rooms/{id}</b></code> <code>get room by id</code></summary>
<summary><code>GET</code> <code><b>/v1/rooms/{id}/reservations</b></code> <code>get all reservations made for the room</code></summary>
<summary><code>PATCH</code> <code><b>/v1/rooms/{id}</b></code> <code>update room</code></summary>
<summary><code>DELETE</code> <code><b>/v1/rooms/{id}</b></code> <code>remove room</code></summary>
</details>

<details>
<summary>Movies</summary>

<summary><code>POST</code> <code><b>/v1/movies</b></code> <code>add new movie</code></summary>
<summary><code>GET</code> <code><b>/v1/movies</b></code> <code>get all movies</code></summary>
<summary><code>GET</code> <code><b>/v1/movies/{id}</b></code> <code>get movie by id</code></summary>
<summary><code>PATCH</code> <code><b>/v1/movies/{id}</b></code> <code>update movie</code></summary>
<summary><code>DELETE</code> <code><b>/v1/movies/{id}</b></code> <code>remove movie</code></summary>
</details>

<details>
<summary>Reservations</summary>

<summary><code>POST</code> <code><b>/v1/reservations</b></code> <code>add new reservation</code></summary>
<summary><code>GET</code> <code><b>/v1/reservations</b></code> <code>get all reservations</code></summary>
<summary><code>GET</code> <code><b>/v1/reservations/{id}</b></code> <code>get reservation by id</code></summary>
<summary><code>PATCH</code> <code><b>/v1/reservations/{id}</b></code> <code>update reservation</code></summary>
</details>

<details>
<summary>Uploads</summary>

<summary><code>POST</code> <code><b>/v1/upload</b></code> <code>upload an image to the S3 bucket</code></summary>
</details>
