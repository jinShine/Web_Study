export async function uploadImage(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "je0iftp6");

  const url = "https://api.cloudinary.com/v1_1/dmgkcpivp/image/upload";

  return fetch(url, { method: "POST", body: data }).then((res) => res.json());
}
