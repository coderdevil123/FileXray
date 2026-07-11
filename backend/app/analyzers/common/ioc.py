import re

from app.analyzers.base import BaseAnalyzer


class IOCAnalyzer(BaseAnalyzer):

    URL_REGEX = re.compile(
        r"https?://[^\s\"'<>]+",
        re.IGNORECASE
    )

    EMAIL_REGEX = re.compile(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
    )

    IPV4_REGEX = re.compile(
        r"\b(?:\d{1,3}\.){3}\d{1,3}\b"
    )


    def analyze(
        self,
        file_path: str
    ):

        with open(
            file_path,
            "rb"
        ) as file:

            content = file.read().decode(
                errors="ignore"
            )

        urls = list(
            set(
                self.URL_REGEX.findall(content)
            )
        )

        emails = list(
            set(
                self.EMAIL_REGEX.findall(content)
            )
        )

        ipv4 = list(
            set(
                self.IPV4_REGEX.findall(content)
            )
        )

        risk = min(

            (len(urls) * 5) +

            (len(ipv4) * 5),

            30

        )

        return {

            "name": "IOC Analyzer",

            "status": "success",

            "risk_score": risk,

            "data": {

                "url_count": len(urls),

                "urls": urls,

                "email_count": len(emails),

                "emails": emails,

                "ipv4_count": len(ipv4),

                "ipv4": ipv4

            }

        }