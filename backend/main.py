from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

import json
import strawberry
from auth_utils import verify_password, create_access_token, decode_access_token

from strawberry.fastapi import GraphQLRouter

app = FastAPI()

# Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Archivo donde se guardan los artículos
DATA_FILE = "articles.json"

# Funciones para leer/escribir
def load_articles():
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_articles(articles):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(articles, f, indent=4)

# Modelo de datos
class Article(BaseModel):
    id: int
    title: str
    content: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    token: str

# ======================
# 🔹 Usuarios cargados desde JSON
# ======================
def load_users():
    with open("users.json", "r") as f:
        return json.load(f)
    
# ======================
# 🔹 Autenticación
# ======================
@app.post("/login", response_model=dict)
def login(user: UserLogin):
    users = load_users()
    u = next((u for u in users if u["username"] == user.username), None)
    if not u or not verify_password(user.password, u["password"]):
        raise HTTPException(status_code=401, detail="Usuario o contraseña incorrectos")

    token = create_access_token({"sub": u["username"]})
    return {"access_token": token, "token_type": "bearer"}

def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token inválido")
    token = authorization.split(" ")[1]
    user = decode_access_token(token)
    if not user:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    return user

# Rutas REST
@app.get("/")
def root():
    return {"message": "Mini CMS API is running"}

@app.get("/articles", response_model=List[Article])
def get_articles():
    return load_articles()

@app.post("/articles", response_model=Article)
def create_article(article: Article, current_user: dict = Depends(get_current_user)):
    articles = load_articles()
    new_id = max([a["id"] for a in articles], default=0) + 1
    new_article = {"id": new_id, "title": article.title, "content": article.content}
    articles.append(new_article)
    save_articles(articles)
    return new_article



@app.put("/articles/{article_id}", response_model=Article)
def update_article(article_id: int, updated_article: Article):
    articles = load_articles()
    for idx, art in enumerate(articles):
        if art["id"] == article_id:
            articles[idx] = updated_article.dict()
            save_articles(articles)
            return updated_article
    raise HTTPException(status_code=404, detail="Article not found")

@app.delete("/articles/{article_id}")
def delete_article(article_id: int, current_user: dict = Depends(get_current_user)):
    articles = load_articles()
    new_articles = [art for art in articles if art["id"] != article_id]
    if len(new_articles) == len(articles):
        raise HTTPException(status_code=404, detail="Article not found")
    save_articles(new_articles)
    return {"message": "Article deleted"}

# GraphQL
@strawberry.type
class ArticleType:
    id: int
    title: str
    content: str

@strawberry.type
class Query:
    @strawberry.field
    def articles_list(self) -> list[ArticleType]:
        return [ArticleType(**a) for a in load_articles()]

@strawberry.type
class Mutation:
    @strawberry.field
    def add_article(self, id: int, title: str, content: str) -> ArticleType:
        article = {"id": id, "title": title, "content": content}
        articles = load_articles()
        articles.append(article)
        save_articles(articles)
        return ArticleType(**article)

schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema)

app.include_router(graphql_app, prefix="/graphql")
