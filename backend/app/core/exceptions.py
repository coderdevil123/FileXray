class FileXrayException(Exception):
    """Base exception for FileXray."""
    pass

class InvalidFileException(FileXrayException):
    """Raised when uploaded file is invalid."""
    pass

class AnalysisException(FileXrayException):
    """Raised when analysis fails."""
    pass