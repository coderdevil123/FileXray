import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
});

export async function uploadFile(file: File) {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/scans/upload",
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data",
            },
        }
    );

    return response.data;
}