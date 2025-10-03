import { useEffect, useRef, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  useDeleteProductImageAdminMutation,
  useGetProductDetailsQuery,
  useUploadProductImagesAdminMutation,
} from "../../api/productApi";
import { useNavigate, useParams } from "react-router-dom";

const UploadImages = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const params = useParams();
  const { data } = useGetProductDetailsQuery(params?.id);
  const [uploadProductImagesAdmin, { isLoading, error, isSuccess }] =
    useUploadProductImagesAdminMutation();
  const [
    deleteProductImageAdmin,
    { isLoading: isDeleteLoading, isError: isDeleteError },
  ] = useDeleteProductImageAdminMutation();
  useEffect(() => {
    if (data?.data) {
      setUploadedImages(data?.data?.images);
    }
    if (isSuccess) {
      setImagesPreview([]);
      navigate(0);
    }
  }, [data, isSuccess, error]);
  const handleOnChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState == 2) {
          setImagesPreview((prev) => [...prev, reader.result]);
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleImagePreviewDelete = (image) => {
    const filteredImages = imagesPreview.filter((img) => img !== image);
    setImagesPreview(filteredImages);
  };
  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadProductImagesAdmin({ id: params?.id, body: { images } });
  };
  const handleDelete = (public_id) => {
    deleteProductImageAdmin({ id: params?.id, body: { imgId: public_id } });
  };
  return (
    <AdminLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8 mt-5 mt-lg-0">
          <form
            className="shadow rounded bg-body"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-4">Upload Product Images</h2>

            <div className="mb-3">
              <label htmlFor="customFile" className="form-label">
                Choose Images
              </label>

              <div className="custom-file">
                <input
                  ref={fileInputRef}
                  type="file"
                  name="product_images"
                  className="form-control"
                  id="customFile"
                  multiple
                  onChange={handleOnChange}
                  onClick={handleResetFileInput}
                />
              </div>

              {imagesPreview.length > 0 && (
                <div className="new-images my-4">
                  <p className="text-warning">New Images:</p>
                  <div className="row mt-4">
                    {imagesPreview?.map((image, index) => (
                      <div key={index} className="col-md-3 mt-2">
                        <div className="card">
                          <img
                            src={image}
                            alt="Card"
                            className="card-img-top p-2"
                            style={{ width: "100%", height: "80px" }}
                          />
                          <button
                            style={{
                              backgroundColor: "#dc3545",
                              borderColor: "#dc3545",
                            }}
                            type="button"
                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                            onClick={() => handleImagePreviewDelete(image)}
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uploadedImages.length > 0 && (
                <div className="uploaded-images my-4">
                  <p className="text-success">Product Uploaded Images:</p>
                  <div className="row mt-1">
                    {uploadedImages?.map((image) => (
                      <div key={image?.public_id} className="col-md-3 mt-2">
                        <div className="card">
                          <img
                            src={image?.url}
                            alt="Card"
                            className="card-img-top p-2"
                            style={{ width: "100%", height: "80px" }}
                          />
                          <button
                            style={{
                              backgroundColor: "#dc3545",
                              borderColor: "#dc3545",
                            }}
                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                            disabled={isDeleteLoading}
                            type="button"
                            onClick={() => handleDelete(image?.public_id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading || isDeleteLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UploadImages;
