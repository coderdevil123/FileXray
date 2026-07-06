from app.database.base import Base
from app.database.session import engine

from app.models import Scan


def create_database():

    Base.metadata.create_all(
        bind=engine
    )