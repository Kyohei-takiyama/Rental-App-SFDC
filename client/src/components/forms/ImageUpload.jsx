import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";

const ImageUpload = ({ ad, setAd }) => {
  const handleUpload = async (e) => {
    try {
      let files = [...e.target.files];
      if (files.length) {
        console.log(files);
        setAd({ ...ad, uploading: true });

        files.map(
          (file) =>
            new Promise((resolve) => {
              Resizer.imageFileResizer(
                file,
                1080,
                720,
                "JPEG",
                100,
                0,
                async (uri) => {
                  try {
                    const { data } = await axios.post("/api/upload-image", {
                      image: uri,
                    });
                    setAd((prev) => ({
                      ...prev,
                      photos: [data, ...prev.photos],
                      uploading: false,
                    }));
                  } catch {
                    setAd({ ...ad, uploading: false });
                  }
                },
                "base64"
              );
            })
        );
      }
    } catch {
      setAd({ ...ad, uploading: false });
    }
  };
  const handleDelete = async (file) => {
    const answer = window.confirm("写真を削除しますか？");
    if (!answer) {
      return;
    }
    try {
      const { data } = await axios.post("api/remove-image", file);
      if (data.ok) {
        setAd((prev) => ({
          ...prev,
          photos: prev.photos.filter((photo) => photo.Key !== data.Key),
          uploading: false,
        }));
        return;
      }
      setAd({ ...ad, uploading: false });
    } catch {
      setAd({ ...ad, uploading: false });
    }
  };
  return (
    <>
      <label className="btn btn-secondary mb-4">
        {ad.uploading ? "アップロード中" : "写真をアップロード"}
        <input
          onChange={handleUpload}
          type="file"
          accept="image/*"
          multiple
          hidden
        />
      </label>
      {ad.photos.map((file) => (
        <Avatar
          key={file.Key}
          src={file?.Location}
          shape="square"
          size="46"
          className="ml-2 mb-4"
          onClick={() => handleDelete(file)}
        />
      ))}
    </>
  );
};

export default ImageUpload;
