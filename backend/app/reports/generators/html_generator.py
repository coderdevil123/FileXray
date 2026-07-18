import os
from datetime import datetime

class HTMLGenerator:
    def generate(self, report):
        os.makedirs("reports", exist_ok=True)

        filename = f"report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.html"

        path = os.path.join("reports", filename)

        template_path = os.path.join(
            "app", "reports", "templates", "report_template.html"
        )

        with open(template_path, "r", encoding="utf-8") as file:

            html = file.read()
        
        recommendations = ""
        for item in report["recommendations"]:
            recommendations += f"<li>{item}</li>"

        replacements = {
            "{{generated_at}}": datetime.now().strftime("%d %B %Y %H:%M"),
            "{{filename}}": report["summary"]["filename"],
            "{{risk}}": report["summary"]["risk"],
            "{{score}}": str(report["summary"]["score"]),
            "{{sha256}}": report["hashes"]["sha256"],
            "{{md5}}": report["hashes"]["md5"],
            "{{entropy}}": str(report["entropy"]["entropy"]),
            "{{filetype}}": report["metadata"]["file_type"],
            "{{filesize}}": str(report["metadata"]["size"]),
            "{{urls}}": ", ".join(report["ioc"]["urls"]) or "None",
            "{{emails}}": ", ".join(report["ioc"]["emails"]) or "None",
            "{{ips}}": ", ".join(report["ioc"]["ips"]) or "None",
            "{{recommendations}}": recommendations,
            "{{execution_time}}":str(report["execution_time"]),
        }

        for key, value in replacements.items():
            html = html.replace(key, value)
        with open(path, "w", encoding="utf-8") as file:
            file.write(html)

        return path
