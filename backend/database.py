

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Obtener la URL de conexión a Supabase
DATABASE_URL = os.getenv("DATABASE_URL")

# Verificar que exista la configuración
if not DATABASE_URL:
    raise ValueError(
        "ERROR: No se encontró DATABASE_URL en el archivo .env"
    )

# Crear motor de conexión PostgreSQL
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

# Configurar sesiones
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base para los modelos
Base = declarative_base()


# Obtener sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

