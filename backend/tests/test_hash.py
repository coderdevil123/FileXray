from app.analyzers.common.hash import HashAnalyzer

def test_hash_analyzer():
    analyzer = HashAnalyzer()

    result = analyzer.analyze(r"C:\Users\ASUS\FileXray\backend\sample.txt")

    assert result["status"] == "success"

    assert "sha256" in result["data"]