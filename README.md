# 📝 Mini CMS – Content Management Application

A full-stack content management application developed with Python, FastAPI, Strawberry GraphQL, HTML, CSS, and JavaScript.

This project explores REST API development, GraphQL integration, JSON-based data handling, and frontend-backend communication through a dynamic user interface.

## 🚀 Features

- **REST API:** Create, retrieve, update, and delete articles.
- **GraphQL API:** Query articles and create new content using Strawberry.
- **JSON data handling:** Read, parse, and manipulate article data.
- **Dynamic frontend:** Interact with the backend using JavaScript Fetch API.
- **Responsive interface:** Dark theme, flexible layouts, and CSS animations.
- **Docker support:** Containerization configuration for the backend.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| FastAPI | REST API development |
| Strawberry GraphQL | GraphQL queries and mutations |
| HTML5 | Frontend structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend interactions and API requests |
| JSON | Data storage and manipulation |
| Docker | Backend containerization |

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/articles` | Retrieve all articles |
| POST | `/articles` | Create a new article |
| PUT | `/articles/{id}` | Update an existing article |
| DELETE | `/articles/{id}` | Delete an article |

> These endpoints describe the intended API. Their implementation and behavior should be verified against the current source code.

## 🔎 GraphQL

The project integrates Strawberry GraphQL to explore an alternative approach to querying and modifying content.

Planned operations include:

- Query articles.
- Create articles through mutations.

GraphQL operations depend on the schema implemented in the project.

## 🖥️ Frontend

The frontend is built with HTML, CSS, and vanilla JavaScript.

It is designed to provide:

- A form for creating articles.
- A dynamic article listing.
- Communication with the backend through HTTP requests.
- A dark interface with responsive layouts and animations.

## 🏗️ Architecture

The application follows a simple frontend-backend architecture:

1. The user interacts with the frontend.
2. JavaScript sends an HTTP request to the backend.
3. FastAPI processes the request.
4. The application handles the article data.
5. The backend returns a response.
6. The frontend updates the displayed content.

GraphQL provides an additional interface for supported queries and mutations.

## 🐳 Docker

The project includes Docker configuration intended to containerize the backend.

To build the image:

```bash
docker build -t mini-cms-backend .
## 📌 Descripción  
**Mini CMS** es una aplicación de gestión de contenidos desarrollada como proyecto fullstack.  
Permite **crear, listar, actualizar y eliminar artículos** mediante **API REST y GraphQL**, con un frontend en **HTML, CSS avanzado y JavaScript** que interactúa con el backend.  

El proyecto está **contenedorizado con Docker**, lo que facilita su despliegue en cualquier entorno.

---

## 🚀 Tecnologías utilizadas  
- **Backend:** Python (FastAPI), Strawberry GraphQL  
- **Frontend:** HTML, CSS (modo oscuro, grid/flex, animaciones), JavaScript (fetch API)  
- **Datos:** JSON (manejo, parsing y manipulación)  
- **Infraestructura:** Docker (contenedorización del backend)  

---

## ⚙️ Funcionalidades principales  
- **API REST (FastAPI):**
  - `GET /articles` → listar artículos  
  - `POST /articles` → crear un artículo  
  - `PUT /articles/{id}` → actualizar un artículo  
  - `DELETE /articles/{id}` → eliminar un artículo  

- **API GraphQL (Strawberry):**
  - **Query:** obtener lista de artículos  
  - **Mutation:** agregar artículos  

- **Frontend dinámico (HTML/CSS/JS):**
  - Formulario para crear artículos.  
  - Visualización en tiempo real de artículos creados.  
  - Estilos avanzados con **CSS responsive y animaciones**.  

---

## 🖥️ Flujo de la aplicación  
1. El usuario abre la web (frontend en `index.html`).  
2. Completa un formulario → se envía al backend en formato **JSON**.  
3. El backend procesa la petición y responde con los datos.  
4. El frontend actualiza la lista de artículos dinámicamente.  
5. Alternativamente, el usuario puede usar **GraphQL Playground** para consultas y mutaciones.  

---

## 🐳 Dockerización
Para correr el proyecto con Docker:

```bash
# Construir la imagen
docker build -t mini-cms-backend .

# Ejecutar el contenedor
docker run -d -p 8000:8000 mini-cms-backend
