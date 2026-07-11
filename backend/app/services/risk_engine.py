class RiskEngine:

    def calculate(self, analysis: dict):

        score = 0

        findings = []

        entropy = analysis.get("entropy", {})

        entropy_score = entropy.get("risk_score", 0)

        if entropy_score:
            score += entropy_score
            findings.append("High entropy detected")

        strings = analysis.get("strings", {})

        strings_score = strings.get("risk_score", 0)

        if strings_score:
            score += strings_score
            findings.append("Suspicious strings detected")

        ioc = analysis.get("ioc", {})

        ioc_score = ioc.get("risk_score", 0)

        if ioc_score:
            score += ioc_score
            findings.append("Indicators of compromise detected")

        pe = analysis.get("pe", {})

        pe_score = pe.get("risk_score", 0)

        if pe_score:
            score += pe_score
            findings.append("Suspicious PE imports detected")

        score = min(score, 100)

        if score >= 70:
            level = "HIGH"
        elif score >= 40:
            level = "MEDIUM"
        elif score > 0:
            level = "LOW"
        else:
            level = "SAFE"

        return {
            "score": score,
            "level": level,
            "findings": findings
        }