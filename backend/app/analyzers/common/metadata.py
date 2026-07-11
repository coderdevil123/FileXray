import os
from datetime import datetime

import magic

from app.analyzers.base import BaseAnalyzer


class MetadataAnalyzer(BaseAnalyzer):

    def analyze(self, file_path: str):

        stats = os.stat(file_path)

        return {

            "name": "Metadata Analyzer",

            "status": "success",

            "risk_score": 0,

            "data": {

                "filename": os.path.basename(file_path),

                "extension": os.path.splitext(file_path)[1],

                "size": stats.st_size,

                "mime_type": magic.from_file(
                    file_path,
                    mime=True
                ),

                "magic": magic.from_file(file_path),

                "created": datetime.fromtimestamp(
                    stats.st_ctime
                ).isoformat(),

                "modified": datetime.fromtimestamp(
                    stats.st_mtime
                ).isoformat(),

                "accessed": datetime.fromtimestamp(
                    stats.st_atime
                ).isoformat()

            }

        }