import json
import os
from datetime import datetime

class JSONGenerator:
    def generate(self, analysis):
        os.makedirs("reports", exist_ok=True)
        filename = (
            f"report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        )
        path = os.path.join("reports", filename)
        with open(path, "w", encoding="utf-8") as file:
            json.dump(
                {
                    "filexray": {
                        "version": "1.0.0",
                        "generated_at": datetime.now().isoformat(),
                        "generator": "FileXray Report Engine"
                    },
                    "report": report
                },
                file,
                indent=4
            )
        return path