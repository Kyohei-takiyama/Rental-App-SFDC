import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import CurrencyInput from "react-currency-input-field";

import { GOOGLE_API_KEY } from "../../config";
import ImageUpload from "./ImageUpload";

const AdForm = ({ action, type }) => {
  // state
  const [ad, setAd] = useState({
    photos: [],
    uploading: false,
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    carpark: "",
    landsize: "",
    title: "",
    description: "",
    loading: false,
    type,
    action,
  });

  const navigate = useNavigate();

  const handleClick = async () => {
    console.log("handleClicked");
    try {
      setAd({ ...ad, loading: true });
      console.log(ad);
      const { data } = await axios.post("/api/ad", ad);
      console.log("ad create response => ", data);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
        return;
      }
      toast.success("作成に成功しました！");
      setAd({ ...ad, loading: false });
      //   navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setAd({ ...ad, loading: false });
    }
  };

  return (
    <>
      <div className="mb-3 form-control">
        <ImageUpload ad={ad} setAd={setAd} />
        <GooglePlacesAutocomplete
          apiKey={GOOGLE_API_KEY}
          apiOptions={{ language: "ja", region: "JP" }}
          selectProps={{
            defaultInputValue: ad?.address,
            placeholder: "住所を検索...",
            onChange: ({ value }) => {
              setAd({ ...ad, address: value.description });
            },
          }}
        />
      </div>
      <div style={{ marginTop: "80px" }}>
        <CurrencyInput
          placeholder="金額を入力"
          defaultValue={ad.price}
          prefix="¥"
          className="form-control mb-3"
          onValueChange={(value) => setAd({ ...ad, price: value })}
        />
      </div>
      <input
        type="number"
        min="0"
        placeholder="ベッドルーム数"
        className="form-control mb-3"
        value={ad.bedrooms}
        onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
      />
      <input
        type="number"
        min="0"
        placeholder="バスルーム数"
        className="form-control mb-3"
        value={ad.bathrooms}
        onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
      />
      <input
        type="number"
        min="0"
        placeholder="駐車場数"
        className="form-control mb-3"
        value={ad.carpark}
        onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
      />
      <input
        type="text"
        placeholder="敷地面積"
        className="form-control mb-3"
        value={ad.landsize}
        onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
      />
      <input
        type="text"
        placeholder="タイトル"
        className="form-control mb-3"
        value={ad.title}
        onChange={(e) => setAd({ ...ad, title: e.target.value })}
      />
      <textarea
        placeholder="説明"
        className="form-control mb-3"
        value={ad.description}
        onChange={(e) => setAd({ ...ad, description: e.target.value })}
      />

      <div className="d-flex justify-content-center align-items-center mt-4">
        <button onClick={handleClick} className="btn btn-primary col-3 ">
          完了
        </button>
      </div>
      <pre>{JSON.stringify(ad, null, 4)}</pre>
    </>
  );
};

export default AdForm;
