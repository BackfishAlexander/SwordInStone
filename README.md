# Sword in Stone

Sword in Stone is an all-in-one application for managing Dungeons and Dragons campaigns. This system provides tools for character creation, inventory management, dice rolling, and more, facilitating an organized and immersive experience for both players and Dungeon Masters. The project features a decoupled frontend and backend, with the frontend powered by Angular and the backend by NestJS, both containerized for streamlined deployment.

## Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Running the Application](#running-the-application)
8. [License](#license)

---

## Features

- **Campaign Management**: Create and organize campaigns for easy management.
- **Character Management**: Tools for character creation and updates.
- **Inventory Management**: Built-in inventory system for characters and campaigns.
- **Dice Roller**: Simulate dice rolls within the application.
- **User Authentication**: Secure login and registration with role-based access control.

## Technology Stack

- **Frontend**: Angular, Tailwind CSS
- **Backend**: NestJS, Prisma ORM
- **Database**: PostgreSQL
- **Containerization**: Docker
- **Environment Management**: `.env` files for production configurations

## Architecture

The application follows a client-server model:

- **Frontend** (Angular): Handles the user interface and client-side logic, providing an engaging and interactive experience for managing D&D games.
- **Backend** (NestJS): Manages data processing, user authentication, and API interactions. The backend utilizes Prisma ORM to interact with the PostgreSQL database.
- **Database**: Stores all persistent data, including user information, campaign data, characters, and other relevant assets.

## Project Structure

```plaintext
.
├── Assets                   # Project images and other assets
├── Frontend                 # Angular frontend application
│   ├── src                  # Source code for the frontend
│   ├── Dockerfile           # Dockerfile for the frontend
│   └── nginx.conf           # Configuration for Nginx
├── nest-js                  # NestJS backend application
│   ├── src                  # Source code for the backend
│   ├── prisma               # Prisma migrations and schema
│   ├── Dockerfile           # Dockerfile for the backend
└── README.md                # Project README (this file)
```

## Installation

To get started, clone the repository:

```bash
git clone https://github.com/yourusername/sword-in-stone.git
cd sword-in-stone
```

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js & npm](https://nodejs.org/)

### Environment Configuration

For the production environment, create a `.env.prod` file in the root directory with the following variables:

```plaintext
DATABASE_URL="postgresql://username:password@IP:5432/swordandstone"
JWT_SECRET="your_jwt_secret"
ADMIN_PASSWORD="your_admin_password"
```

Ensure that this file is included during Docker image creation for environment-specific configuration.

## Configuration

The project relies on environment variables for critical configurations. Modify `.env.prod` for production configurations and `.env` for local development.

## Running the Application

### Docker Setup

The frontend and backend are containerized and run as separate services.

1. **Frontend**:
   Build the Docker image for the Angular frontend:

   ```bash
   docker build -t swordinfront ./Frontend
   ```

2. **Backend**:
   Build the Docker image for the NestJS backend:

   ```bash
   docker build -t swordinback ./nest-js
   ```

### Running with Docker Compose

A `docker-compose.yml` file can help manage multi-container applications. Here’s an example `docker-compose.yml`:

```yaml
version: "3.8"
services:
  frontend:
    image: swordinfront
    build:
      context: ./Frontend
    ports:
      - "80:80"

  backend:
    image: swordinback
    build:
      context: ./nest-js
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
      - ADMIN_PASSWORD=${ADMIN_PASSWORD}
    ports:
      - "3000:3000"
```

Start all services:

```bash
docker-compose up --build
```

### Accessing the Application

- **Frontend**: Navigate to `http://localhost` in your browser.
- **Backend API**: Access API endpoints at `http://localhost:3000`.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

**Sword in Stone** provides a comprehensive and easy-to-use solution for managing D&D campaigns, making it a valuable tool for tabletop RPG enthusiasts. Enjoy the adventure!
