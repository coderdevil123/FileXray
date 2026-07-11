from app.services.analysis_service import AnalysisService
from app.services.risk_engine import RiskEngine
from app.utils.timer import Timer
from app.core.engine import (
    ENGINE_NAME,
    ENGINE_VERSION
)

class AnalysisPipeline:

    def __init__(self):
        self.analysis_service = AnalysisService()
        self.risk_engine = RiskEngine()

    def run(self, file_path: str):
        timer = Timer()
        timer.begin()
        results = self.analysis_service.analyze(file_path)
        risk = self.risk_engine.calculate(
            results["analysis"]
        )
        results["risk"] = risk
        results["execution_time"] = timer.stop()
        results["engine"] = {
            "name": ENGINE_NAME,
            "version": ENGINE_VERSION
        }
        return results