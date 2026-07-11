import string

from app.analyzers.base import BaseAnalyzer


class StringsAnalyzer(BaseAnalyzer):

    MIN_LENGTH = 4


    def extract_strings(
        self,
        file_path: str
    ):

        strings_found = []

        current = ""

        with open(file_path, "rb") as file:

            while byte := file.read(1):

                try:

                    character = byte.decode("ascii")

                except UnicodeDecodeError:

                    character = ""

                if character in string.printable and character not in "\r\n\t":

                    current += character

                else:

                    if len(current) >= self.MIN_LENGTH:

                        strings_found.append(current)

                    current = ""

        if len(current) >= self.MIN_LENGTH:

            strings_found.append(current)

        return strings_found

    def analyze(
        self,
        file_path: str
    ):

        strings_found = self.extract_strings(file_path)

        suspicious_keywords = [

            "powershell",

            "cmd.exe",

            "CreateRemoteThread",

            "VirtualAlloc",

            "kernel32",

            "LoadLibrary",

            "WinExec",

            "ShellExecute"

        ]

        suspicious = []

        for value in strings_found:

            for keyword in suspicious_keywords:

                if keyword.lower() in value.lower():

                    suspicious.append(value)

                    break

        risk = min(len(suspicious) * 5, 30)

        return {

            "name": "Strings Analyzer",

            "status": "success",

            "risk_score": risk,

            "data": {

                "total_strings": len(strings_found),

                "suspicious_count": len(suspicious),

                "suspicious_strings": suspicious[:20],

                "preview": strings_found[:30]

            }

        }