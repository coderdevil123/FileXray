import math

from app.analyzers.base import BaseAnalyzer


class EntropyAnalyzer(BaseAnalyzer):

    def calculate_entropy(
        self,
        data: bytes
    ) -> float:

        if not data:
            return 0.0
        entropy = 0.0
        length = len(data)
        frequencies = {}
        for byte in data:
            frequencies[byte] = frequencies.get(byte, 0) + 1
        for count in frequencies.values():
            probability = count / length
            entropy -= probability * math.log2(probability)
        return round(entropy, 4)

    def analyze(
        self,
        file_path: str
    ):
        with open(file_path, "rb") as file:
            data = file.read()
        entropy = self.calculate_entropy(data)
        risk = 0
        explanation = "Low entropy."
        if entropy >= 7.5:
            risk = 25
            explanation = (
                "Very high entropy detected. "
                "File may be packed, compressed or encrypted."
            )
        elif entropy >= 6.5:
            risk = 10
            explanation = (
                "Moderately high entropy detected."
            )
        return {

            "name": "Entropy Analyzer",

            "status": "success",

            "risk_score": risk,

            "data": {

                "entropy": entropy,

                "explanation": explanation

            }
        }