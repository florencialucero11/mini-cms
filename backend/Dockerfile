# 🔹 Imagen base
FROM python:3.11-slim

# 🔹 Seteo del directorio de trabajo
WORKDIR /app

# 🔹 Copiar requirements
COPY requirements.txt .

# 🔹 Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# 🔹 Copiar el resto del proyecto
COPY . .

# 🔹 Puerto
EXPOSE 8000

# 🔹 Comando para correr la app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
