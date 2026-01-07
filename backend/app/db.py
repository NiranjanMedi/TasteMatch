from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Enum, PrimaryKeyConstraint
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime
from pgvector.sqlalchemy import Vector

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autoflush=False, autocommit=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer(), primary_key=True)
    anon_id = Column(String(100), nullable=False, unique=True)
    taste_vector = Column(Vector(384), nullable = False)
    created_at = Column(DateTime(), default = datetime.utcnow)
    swipes = relationship("Swipe", back_populates = "user", cascade = "all, delete-orphan")

class Dish(Base):
    __tablename__ = "dishes"

    dish_id = Column(Integer(), primary_key=True)
    dish_name = Column(String, unique=True, nullable=False)
    cuisine = Column(String)
    ingredients = Column(Text)
    flavour_mappings = Column(JSONB)
    description = Column(Text)
    image = Column(String)
    sentence_embedding = Column(Vector(384), nullable = False)
    swipes = relationship("Swipe", back_populates = "dish", cascade = "all, delete-orphan")


class Swipe(Base):
    __tablename__ = "swipes"

    dish_id = Column(Integer(), ForeignKey("dishes.dish_id"))
    user_id = Column(Integer, ForeignKey("users.dishes_id"))
    status = Column(Enum("liked", "disliked", "skipped", name = "swipe_status"), nullable=False)
    source = Column(Enum("seed", "rec", name="swipe_source"), nullable=False)
    timestamp = Column(DateTime(), default = datetime.utcnow())
    user = relationship("User", back_populates = "swipes")
    dish = relationship("Dish", back_populates = "swipes")

    __tableargs__ = {
        PrimaryKeyConstraint("dish_id", "user_id", name = "swipe_pk")
    }

Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()




