

from pydantic import BaseModel, ConfigDict
from typing import Optional


# Base compartida
class ProductBase(BaseModel):
    name: str
    price: float
    stock: int
    image_url: Optional[str] = None


# Datos requeridos al crear un producto
class ProductCreate(ProductBase):
    pass


# Formato de respuesta de la API
class ProductResponse(ProductBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

