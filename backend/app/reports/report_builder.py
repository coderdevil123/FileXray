from app.reports.recommendations import RecommendationEngine

class ReportBuilder:

    def build(
        self,
        scan
    ):
        statistics={
            "url_count":len(
                analysis["analysis"]["ioc"]["data"]["urls"]
            )
        }

        recommendations=RecommendationEngine().generate(
            analysis["risk"]["level"],
            analysis["analysis"]["entropy"]["data"]["entropy"],
            statistics
        )
        analysis = scan.analysis_result
        return {
            "summary": {
                "filename": scan.filename,
                "risk": analysis["risk"]["level"],
                "score": analysis["risk"]["score"],
                "generated_at": str(scan.created_at)
            },
            "statistics": {
                "url_count": len(analysis["analysis"]["ioc"]["data"]["urls"]),
                "email_count": len(analysis["analysis"]["ioc"]["data"]["emails"]),
                "ip_count": len(analysis["analysis"]["ioc"]["data"]["ips"]),
                "string_count": analysis["analysis"]["strings"]["data"]["count"]
            },
            "metadata": analysis["analysis"]["metadata"]["data"],
            "hashes": analysis["analysis"]["hash"]["data"],
            "entropy": analysis["analysis"]["entropy"]["data"],
            "ioc": analysis["analysis"]["ioc"]["data"],
            "strings": analysis["analysis"]["strings"]["data"],
            "execution_time": analysis["execution_time"],
            "engine": analysis["engine"],
            "recommendations": recommendations,
            "integrity":{
                "sha256":analysis["analysis"]["hash"]["data"]["sha256"],
                "verified":True
            }
        }