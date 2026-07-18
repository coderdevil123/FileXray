class RecommendationEngine:

    def generate(self, risk: str, entropy: float, statistics: dict):

        recommendations = []

        if entropy > 7.5:
            recommendations.append(
                "High entropy indicates possible packing or encryption."
            )

        if statistics["url_count"] > 0:
            recommendations.append(
                "Verify detected URLs before execution."
            )

        if statistics["email_count"] > 0:
            recommendations.append(
                "Investigate detected email addresses."
            )

        if statistics["ip_count"] > 0:
            recommendations.append(
                "Review detected IP addresses for malicious activity."
            )

        if risk == "HIGH":
            recommendations.extend([
                "Immediately quarantine the file.",
                "Run a complete system scan.",
                "Investigate affected endpoints.",
                "Review network activity."
            ])

        elif risk == "MEDIUM":
            recommendations.extend([
                "Verify the file source.",
                "Upload the file to VirusTotal.",
                "Monitor system behavior."
            ])

        else:
            recommendations.extend([
                "No immediate action required.",
                "Keep antivirus definitions updated.",
                "Continue monitoring."
            ])

        return recommendations