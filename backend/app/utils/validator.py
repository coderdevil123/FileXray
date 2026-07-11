import os
from app.core.exceptions import InvalidFileException

MAX_FILE_SIZE = 100 * 1024 * 1024  # 100 MB

SUPPORTED_EXTENSIONS = {
    ".exe",
    ".dll",
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".zip",
    ".rar",
    ".txt",
    ".csv",
    ".js",
    ".ps1",
    ".bat",
    ".sh",
    ".elf"
}


def validate_file(file_path: str):
    if not os.path.exists(file_path):
        raise InvalidFileException("File does not exist.")

    size = os.path.getsize(file_path)

    if size == 0:
        raise InvalidFileException("Uploaded file is empty.")

    if size > MAX_FILE_SIZE:
        raise InvalidFileException(
            "File exceeds maximum allowed size."
        )

    extension = os.path.splitext(file_path)[1].lower()

    if extension not in SUPPORTED_EXTENSIONS:
        raise InvalidFileException(
            f"Unsupported file type: {extension}"
        )

    return True