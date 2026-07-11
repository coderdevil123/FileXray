import hashlib
import os

from app.analyzers.base import BaseAnalyzer


class HashAnalyzer(BaseAnalyzer):

    CHUNK_SIZE = 8192


    def calculate_hash(self, file_path: str, algorithm: str):

        hasher = hashlib.new(algorithm)

        with open(file_path, "rb") as file:

            while chunk := file.read(self.CHUNK_SIZE):
                hasher.update(chunk)

        return hasher.hexdigest()


    def analyze(self, file_path: str):

        return {

            "name": "Hash Analyzer",

            "status": "success",

            "risk_score": 0,

            "data": {

                "size": os.path.getsize(file_path),

                "md5": self.calculate_hash(file_path, "md5"),

                "sha1": self.calculate_hash(file_path, "sha1"),

                "sha256": self.calculate_hash(file_path, "sha256")

            }

        }