from app.core.logger import setup_logger
from app.analyzers.common.strings import StringsAnalyzer
from app.analyzers.common.hash import HashAnalyzer
from app.analyzers.common.metadata import MetadataAnalyzer
from app.analyzers.common.entropy import EntropyAnalyzer
from app.analyzers.common.ioc import IOCAnalyzer
from app.analyzers.executables.pe import PEAnalyzer
from app.services.risk_engine import RiskEngine

logger = setup_logger("AnalysisEngine")

class AnalysisService:

    def __init__(self):

        self.analyzers = [
            HashAnalyzer(),
            MetadataAnalyzer(),
            EntropyAnalyzer(),
            StringsAnalyzer(),
            IOCAnalyzer(),
            PEAnalyzer()
        ]

    def analyze(
        self,
        file_path: str
    ):

        logger.info(
            f"Starting analysis: {file_path}"
        )

        results = {

            "file": file_path,

            "analysis": {}

        }

        for analyzer in self.analyzers:

            result = analyzer.analyze(file_path)

            analyzer_name = result["name"] \
                .replace(" Analyzer", "") \
                .lower()

            results["analysis"][analyzer_name] = result

        risk = RiskEngine().calculate(
            results["analysis"]
        )

        results["risk"] = risk
        logger.info(
            "Analysis completed"
        )

        return results