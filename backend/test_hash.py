from pprint import pprint
from app.services.analysis_pipeline import AnalysisPipeline

pipeline = AnalysisPipeline()

result = pipeline.run(
    r"C:\Users\ASUS\FileXray\README.md"
)

pprint(result)