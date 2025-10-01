export const uploadFile = async (file: File) => {
  const cloudName = "dh2cpesxu";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "amafor");
  formData.append("folder", "amafor");

  const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`; // auto handles pdf, docs, images

  const uploadRes = await fetch(cloudUrl, { method: "POST", body: formData });
  if (!uploadRes.ok) throw new Error("Failed to upload file to Cloudinary");
  const data = await uploadRes.json();
  return data.secure_url as string;
};