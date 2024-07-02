import { useLocation, useNavigate } from "react-router-dom";
import axios from "../apis/admin";
import React, { useEffect, useState } from "react";

const CreatePackage = () => {
  const [packageName, setPackageName] = useState("P1");
  const [packageDescription, setPackageDescription] = useState("hello world");
  const [packagePrice, setPackagePrice] = useState(1500);
  const [commission, setCommission] = useState(300);
  const [editMode, setEditMode] = useState(false);
  const [tagLine, setTagLine] = useState("hello world");
  const [coverImage, setCoverImage] = useState(null);
  const [certification, setCertification] = useState(false);
  const [priceWithPromoCode, setPriceWithPromoCode] = useState(1000);
  const [
    packagePromoCodesWithExpiryAndDiscount,
    setPackagePromoCodesWithExpiryAndDiscount,
  ] = useState([{}]);
  const { state } = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const createNewPackage = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      if (!packageName || !packageDescription || !packagePrice || !commission) {
        setError("Please fill all the fields");
        return;
      }

      setLoading(true);
      const formData = new FormData();

      if (packagePromoCodesWithExpiryAndDiscount.length === 0) {
        formData.append("name", packageName);
        formData.append("description", packageDescription);
        formData.append("price", packagePrice);
        formData.append("commission", commission);
        formData.append("coverImage", coverImage);
        formData.append("tagLine", tagLine);
        formData.append("certification", certification);
        formData.append("priceWithPromoCode", priceWithPromoCode);
      } else {
        formData.append("name", packageName);
        formData.append("description", packageDescription);
        formData.append("price", packagePrice);
        formData.append("commission", commission);
        formData.append("coverImage", coverImage);
        formData.append("tagLine", tagLine);
        formData.append("certification", certification);
        formData.append("priceWithPromoCode", priceWithPromoCode);

        formData.append(
          "promocodes",
          JSON.stringify(packagePromoCodesWithExpiryAndDiscount)
        );
      }
      const res = await axios.post("/package", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        navigate("/admin/packages");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const checkIsEditMode = () => {
    if (state && state.edit) {
      console.log(state);
      setEditMode(state.edit);
      fetchPackageData();
    }
  };
  const fetchPackageData = async () => {
    try {
      const res = await axios.get(`/package/${state.packageId}`);
      if (res.data.success) {
        const data = res.data.data;
        setPackageName(data.name);
        setPackageDescription(data.description);
        setPackagePrice(data.price);
        setCommission(data.commission);
        setTagLine(data.tagLine);
        setCertification(data.certification);
        setPriceWithPromoCode(data.priceWithPromoCode);
        // setPackagePromoCodesWithExpiryAndDiscount(data.promocodes);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const updatePackage = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      if (!packageName || !packageDescription || !packagePrice || !commission) {
        setError("Please fill all the fields");
        return;
      }
      setLoading(true);
      const formData = new FormData();
      if (packagePromoCodesWithExpiryAndDiscount.length === 0) {
        formData.append("name", packageName);
        formData.append("description", packageDescription);
        formData.append("price", packagePrice);
        formData.append("commission", commission);
        formData.append("coverImage", coverImage);
        formData.append("tagLine", tagLine);
        formData.append("certification", certification);
        formData.append("priceWithPromoCode", priceWithPromoCode);
      } else {
        formData.append("name", packageName);
        formData.append("description", packageDescription);
        formData.append("price", packagePrice);
        formData.append("commission", commission);
        formData.append("coverImage", coverImage);
        formData.append("tagLine", tagLine);
        formData.append("certification", certification);
        formData.append("priceWithPromoCode", priceWithPromoCode);
        formData.append(
          "promocodes",
          JSON.stringify(packagePromoCodesWithExpiryAndDiscount)
        );
      }
      const res = await axios.patch(`/package/${state.packageId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        navigate("/admin/packages");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkIsEditMode();
  }, []);

  return (
    <section className="p-5">
      {error && (
        <div className="bg-red-500 w-max text-white p-2 rounded-md flex justify-center items-center gap-x-10">
          {error}
          <p
            className="p-3 cursor-pointer bg-blue-700"
            onClick={() => setError(null)}
          >
            x
          </p>
        </div>
      )}
      <form
        onSubmit={editMode ? updatePackage : createNewPackage}
        className="space-y-6"
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="packageName"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Package Name
            </label>
            <input
              type="text"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required={editMode ? false : true}
            />
          </div>
          <div>
            <label
              htmlFor="packageDescription"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Package Description
            </label>
            <textarea
              value={packageDescription}
              onChange={(e) => setPackageDescription(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required={editMode ? false : true}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="packagePrice"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Package Price
            </label>
            <input
              type="number"
              value={packagePrice}
              onChange={(e) => setPackagePrice(e.target.value)}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required={editMode ? false : true}
            />
          </div>
          <div>
            <label
              htmlFor="tagLine"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Tag Line
            </label>
            <input
              type="text"
              value={tagLine}
              onChange={(e) => setTagLine(e.target.value)}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required={editMode ? false : true}
            />
          </div>
          <div className="flex gap-5 items-center">
            <label
              htmlFor="tagLine"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Certification
            </label>
            <input
              type="checkbox"
              checked={certification}
              onChange={(e) => setCertification(e.target.checked)}
              className="focus:outline-none focus:ring-2 focus:ring-purple-500"
              required={editMode ? false : true}
            />
          </div>
          <div>
            <label
              htmlFor="priceWithPromoCode"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Price With Promo Code
            </label>
            <input
              type="number"
              value={priceWithPromoCode}
              onChange={(e) => setPriceWithPromoCode(e.target.value)}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required={editMode ? false : true}
            />
          </div>
          <div>
            <label
              htmlFor="commission"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Commission
            </label>
            <input
              type="number"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required={editMode ? false : true}
            />
          </div>
          <div>
            <label
              htmlFor="coverImage"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Package Cover Image
            </label>
            <input
              type="file"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              required={editMode ? false : true}
            />
          </div>
        </div>

        {/* <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Package Promo Codes
            </label>
            {packagePromoCodesWithExpiryAndDiscount.map((promoCode, index) => (
              <div key={index} className="flex gap-x-6">
                <input
                  placeholder="Promo Code"
                  type="text"
                  value={promoCode.code || ""}
                  onChange={(e) => {
                    const newPromoCodesWithExpiry = [
                      ...packagePromoCodesWithExpiryAndDiscount,
                    ];
                    newPromoCodesWithExpiry[index].code = e.target.value;
                    setPackagePromoCodesWithExpiryAndDiscount(
                      newPromoCodesWithExpiry
                    );
                  }}
                  className="px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="date"
                  placeholder="Expiry Date"
                  value={promoCode.expiry || ""}
                  onChange={(e) => {
                    if (new Date(e.target.value) < new Date()) {
                      setError("Expiry date should be in future");
                      return;
                    }
                    const newPromoCodesWithExpiry = [
                      ...packagePromoCodesWithExpiryAndDiscount,
                    ];
                    newPromoCodesWithExpiry[index].expiry = e.target.value;
                    setPackagePromoCodesWithExpiryAndDiscount(
                      newPromoCodesWithExpiry
                    );
                  }}
                  className="px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="number"
                  placeholder="Discount in %"
                  value={promoCode.discount || ""}
                  onChange={(e) => {
                    const newPromoCodesWithExpiry = [
                      ...packagePromoCodesWithExpiryAndDiscount,
                    ];
                    newPromoCodesWithExpiry[index].discount = e.target.value;
                    setPackagePromoCodesWithExpiryAndDiscount(
                      newPromoCodesWithExpiry
                    );
                  }}
                  className="px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const newPromoCodesWithExpiry = [
                      ...packagePromoCodesWithExpiryAndDiscount,
                    ];
                    newPromoCodesWithExpiry.splice(index, 1);
                    setPackagePromoCodesWithExpiryAndDiscount(
                      newPromoCodesWithExpiry
                    );
                  }}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={(e) => {
                e.preventDefault();
                if (
                  packagePromoCodesWithExpiryAndDiscount.some(
                    (promoCode) =>
                      !promoCode.code ||
                      !promoCode.expiry ||
                      !promoCode.discount
                  )
                ) {
                  setError("Please fill all the fields of in promo codes");
                  return;
                }
                setPackagePromoCodesWithExpiryAndDiscount([
                  ...packagePromoCodesWithExpiryAndDiscount,
                  {},
                ]);
              }}
              className="px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Add Promo Code
            </button>
          </div>
        </div> */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-sm font-semibold text-white bg-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {editMode ? "Update Package" : "Create Package"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePackage;
