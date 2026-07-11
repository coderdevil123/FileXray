from app.services.analysis_service import AnalysisService

engine = AnalysisService()

result = engine.analyze("C:\\Users\\ASUS\\FileXray\\README.md")

print(result)