class RecommendationEngine:

    def generate(self,risk:str):

        if risk=="HIGH":
            return [
                "Immediately quarantine the file.",
                "Run a complete system scan.",
                "Investigate affected endpoints.",
                "Review network activity."
            ]

        if risk=="MEDIUM":
            return [
                "Verify the file source.",
                "Upload to VirusTotal.",
                "Monitor system behavior."
            ]

        return [
            "No immediate action required.",
            "Keep antivirus definitions updated.",
            "Continue monitoring."
        ]