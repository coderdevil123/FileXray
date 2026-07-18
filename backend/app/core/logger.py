import logging
import os

os.makedirs("logs",exist_ok=True)

logging.basicConfig(
    filename="logs/filexray.log",
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)

def setup_logger(name:str="filexray"):
    return logging.getLogger(name)

logger=setup_logger()