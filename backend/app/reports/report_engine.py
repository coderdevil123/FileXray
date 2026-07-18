from app.reports.generators.json_generator import JSONGenerator
from app.reports.generators.html_generator import HTMLGenerator
from app.reports.generators.pdf_generator import PDFGenerator

class ReportEngine:
    logger.info(
        f"Generating {format.upper()} report."
    )
    def __init__(self):
        self.generators = {
            "json": JSONGenerator(),
            "html": HTMLGenerator(),
            "pdf": PDFGenerator(),
        }
    def generate(self, analysis, format: str):
        generator = self.generators.get(format)
        if generator is None:
            raise ValueError(
                f"Unsupported report format: {format}"
            )
        return generator.generate(analysis)
    logger.info(
        f"{format.upper()} report generated successfully."
    )