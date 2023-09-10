import axios from "axios";

export default async function uploadFile(filepath: any) {

    const formData = new FormData();
    formData.append('file', filepath);
    formData.append('upload_preset', 'eidcarosse');
    const res = await axios.post('https://api.cloudinary.com/v1_1/dehiep9bk/image/upload', formData).then(res => res.data);
    return res;

}