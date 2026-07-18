from app.services.analysis_service import AnalysisService
from app.services.risk_engine import RiskEngine
from app.utils.timer import Timer
from app.utils.validator import validate_file
from app.core.engine import (
    ENGINE_NAME,
    ENGINE_VERSION
)
from app.core.logger import logger

class AnalysisPipeline:
    logger.info("Starting file analysis.")
    def __init__(self):
        self.analysis_service = AnalysisService()
        self.risk_engine = RiskEngine()

    def run(self, file_path: str):
        timer = Timer()
        timer.begin()
        validate_file(file_path)
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
    logger.info("Analysis completed successfully.")