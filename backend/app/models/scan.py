from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import JSON
from datetime import datetime

from app.database.base import Base
class Scan(Base):
    __tablename__ = "scans"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    filename = Column(
        String,
        nullable=False
    )

    file_hash = Column(
        String,
        nullable=True
    )

    file_type = Column(
        String,
        nullable=True
    )

    risk_score = Column(
        Float,
        default=0
    )

    risk_level = Column(
        String,
        default="UNKNOWN"
    )

    report_path = Column(
        String,
        nullable=True
    )

    analysis_result = Column(
        JSON,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
