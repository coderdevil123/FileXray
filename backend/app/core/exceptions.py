from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

class FileXrayException(Exception):
    def __init__(self, message: str):
        self.message = message
        super().__init__(message)

class InvalidFileException(FileXrayException):
    def __init__(self, message: str):
        super().__init__(message)

class AnalysisException(FileXrayException):
    def __init__(self,message:str):
        self.message=message

def register_exception_handlers(app:FastAPI):

    @app.exception_handler(InvalidFileException)
    async def invalid_file_handler(
        request:Request,
        exc:InvalidFileException
    ):
        return JSONResponse(
            status_code=400,
            content={
                "success":False,
                "message":exc.message
            }
        )

    @app.exception_handler(AnalysisException)
    async def analysis_handler(
        request:Request,
        exc:AnalysisException
    ):
        return JSONResponse(
            status_code=500,
            content={
                "success":False,
                "message":exc.message
            }
        )

    @app.exception_handler(Exception)
    async def global_exception_handler(
        request:Request,
        exc:Exception
    ):
        return JSONResponse(
            status_code=500,
            content={
                "success":False,
                "message":"Internal Server Error",
                "detail":str(exc)
            }
        )