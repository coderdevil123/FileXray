from app.core.logger import setup_logger
from app.analyzers.common.hash import HashAnalyzer

logger = setup_logger(
    "AnalysisEngine"
)
hash_analyzer = HashAnalyzer()


class AnalysisService:


    def analyze(
            self,
            file_path: str
    ):


        logger.info(
            f"Starting analysis: {file_path}"
        )


        hash_result = HashAnalyzer().analyze(file_path)
        results = {
            "file": file_path,
            "analysis": {
                "hash": hash_result
            }
        }
        # Future analyzers connect here
        logger.info(
            "Analysis completed"
        )


        return results