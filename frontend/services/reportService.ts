import api from "../lib/api";

export async function generateReport(
    scanId:number,
    format:"pdf"|"html"|"json"
){
    const response=await api.post(
        `/reports/generate/${scanId}?format=${format}`
    );

    return response.data;
}

export function downloadReport(filename:string){
    window.open(
        `http://127.0.0.1:8000/api/v1/reports/download/${filename}`,
        "_blank"
    );
}