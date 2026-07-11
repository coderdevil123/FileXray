import pefile
from app.analyzers.base import BaseAnalyzer

class PEAnalyzer(BaseAnalyzer):
    SUSPICIOUS_APIS = {
        "CreateRemoteThread",
        "VirtualAlloc",
        "WriteProcessMemory",
        "ReadProcessMemory",
        "LoadLibraryA",
        "LoadLibraryW",
        "WinExec",
        "ShellExecuteA",
        "ShellExecuteW",
        "URLDownloadToFileA",
        "URLDownloadToFileW",
        "InternetOpenA",
        "InternetOpenW",
        "InternetConnectA",
        "InternetConnectW",
        "CreateProcessA",
        "CreateProcessW"
    }

    def analyze(self, file_path: str):
        try:
            pe = pefile.PE(file_path)
        except pefile.PEFormatError:
            return {
                "name": "PE Analyzer",
                "status": "skipped",
                "risk_score": 0,
                "data": {
                    "reason": "File is not a valid PE executable."
                }
            }

        imported_dlls = []
        imported_apis = []
        suspicious = []

        if hasattr(pe, "DIRECTORY_ENTRY_IMPORT"):
            for entry in pe.DIRECTORY_ENTRY_IMPORT:
                imported_dlls.append(entry.dll.decode(errors="ignore"))
                for imp in entry.imports:
                    if imp.name:
                        api = imp.name.decode(errors="ignore")
                        imported_apis.append(api)
                        if api in self.SUSPICIOUS_APIS:
                            suspicious.append(api)

        risk = min(len(suspicious) * 5, 40)

        return {
            "name": "PE Analyzer",
            "status": "success",
            "risk_score": risk,
            "data": {
                "machine": hex(pe.FILE_HEADER.Machine),
                "sections": pe.FILE_HEADER.NumberOfSections,
                "entry_point": hex(pe.OPTIONAL_HEADER.AddressOfEntryPoint),
                "compile_timestamp": pe.FILE_HEADER.TimeDateStamp,
                "dll_count": len(imported_dlls),
                "dlls": imported_dlls,
                "api_count": len(imported_apis),
                "suspicious_api_count": len(suspicious),
                "suspicious_apis": suspicious
            }
        }