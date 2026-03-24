# 📝 Mini CMS – Content Management Application

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
