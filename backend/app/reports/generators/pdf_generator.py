import os
from datetime import datetime
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)
from reportlab.lib.styles import getSampleStyleSheet

class PDFGenerator:
    def generate(
        self,
        report
    ):
        os.makedirs(
            "reports",
            exist_ok=True
        )
        filename = (
            f"report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        )
        path = os.path.join(
            "reports",
            filename
        )
        document = SimpleDocTemplate(path)
        styles = getSampleStyleSheet()
        story = []
        story.append(
            Paragraph(
                "<b>FileXray Malware Analysis Report</b>",
                styles["Title"],
            )
        )
        story.append(
            Spacer(
                1,
                20,
            )
        )
        summary = report["summary"]
        story.append(
            Paragraph(
                f"<b>Filename:</b> {summary['filename']}",
                styles["BodyText"],
            )
        )
        story.append(
            Paragraph(
                f"<b>Risk:</b> {summary['risk']}",
                styles["BodyText"],
            )
        )
        story.append(
            Paragraph(
                f"<b>Risk Score:</b> {summary['score']}",
                styles["BodyText"],
            )
        )
        story.append(
            Spacer(
                1,
                20,
            )
        )
        hashes = report["hashes"]
        story.append(
            Paragraph(
                "<b>Hashes</b>",
                styles["Heading2"],
            )
        )
        story.append(
            Paragraph(
                f"SHA256: {hashes['sha256']}",
                styles["Code"],
            )
        )
        story.append(
            Paragraph(
                f"MD5: {hashes['md5']}",
                styles["Code"],
            )
        )
        story.append(
            Spacer(
                1,
                20,
            )
        )
        entropy = report["entropy"]
        story.append(
            Paragraph(
                "<b>Entropy</b>",
                styles["Heading2"],
            )
        )
        story.append(
            Paragraph(
                "<b>Metadata</b>",
                styles["Heading2"]
            )
        )
        metadata = report["metadata"]
        story.append(
            Paragraph(
                f"File Type: {metadata['file_type']}",
                styles["BodyText"]
            )
        )

        story.append(
            Paragraph(
                f"File Size: {metadata['size']} bytes",
                styles["BodyText"]
            )
        )

        story.append(
            Spacer(
                1,
                20
            )
        )
        ioc = report["ioc"]
        story.append(
            Paragraph(
                "<b>Indicators of Compromise</b>",
                styles["Heading2"]
            )
        )
        story.append(
            Paragraph(
                f"URLs: {len(ioc['urls'])}",
                styles["BodyText"]
            )
        )
        story.append(
            Paragraph(
                f"Emails: {len(ioc['emails'])}",
                styles["BodyText"]
            )
        )
        story.append(
            Paragraph(
                f"IPs: {len(ioc['ips'])}",
                styles["BodyText"]
            )
        )
        story.append(
            Spacer(
                1,
                20
            )
        )
        story.append(
            Paragraph(
                "<b>Recommendations</b>",
                styles["Heading2"]
            )
        )

        for recommendation in report["recommendations"]:
            story.append(
                Paragraph(
                    f"• {recommendation}",
                    styles["BodyText"]
                )
            )
        story.append(
            Paragraph(
                str(entropy["entropy"]),
                styles["BodyText"],
            )
        )
        document.build(story)
        return path