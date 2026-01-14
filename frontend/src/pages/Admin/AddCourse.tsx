import { useRef, useState } from "react";
import upload from "../../assets/upload.png";
import InputField from "../../components/InputFiled/InputField";
import Button from "../../components/Button/Button";
import AxiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCatogory] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [contents, setContents] = useState([{ title: "" }]);

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imgError, setImgError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [durationError, setDurationError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setImgError("Please upload an image");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setImgError("Only image files are allowed");
      return;
    }

    setImgError("");
    setFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];

    if (!droppedFile) {
      setImgError("Please upload an image");
      return;
    }

    if (!droppedFile.type.startsWith("image/")) {
      setImgError("Only image files are allowed");
      return;
    }

    setImgError("");
    setFile(droppedFile);
  };

  const handleDoneClick = async () => {
    if (!title.trim()) {
      setTitleError("Title is required");
    } else {
      setTitleError("");
    }

    if (!description.trim()) {
      setDescriptionError("Description is required");
    } else {
      setDescriptionError("");
    }

    if (!category.trim()) {
      setCategoryError("Category is required");
    } else {
      setCategoryError("");
    }

    if (!price.trim()) {
      setPriceError("Price is required");
    } else if (isNaN(Number(price))) {
      setPriceError("Price must be a number");
    } else {
      setPriceError("");
    }

    if (!duration.trim()) {
      setDurationError("Duration is required");
    } else {
      setDurationError("");
    }

    if (!file) {
      setImgError("Please upload a course image");
      return;
    } else {
      setImgError("");
    }

    if (contents.some((content) => !content.title.trim())) {
      setContentError("All chapters are required");
      return;
    } else {
      setContentError("");
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("duration", duration);
      formData.append("image", file);
      formData.append("contents", JSON.stringify(contents));

      const response = await AxiosInstance.post("/course/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success(response.data.message || "Course Created successfully!");
    } catch (error) {
      toast.error("Please try again");
      console.log(error);
    }
  };

  const handleCloseClick = () => {
    navigate("/admin/courses");
  };

  const handleContentChange = (index: number, value: string) => {
    const updated = [...contents];
    updated[index].title = value;
    setContents(updated);
  };

  const addContentField = () => {
    setContents([...contents, { title: "" }]);
  };

  const removeContentField = (index: number) => {
    const updated = contents.filter((_, i) => i !== index);
    setContents(updated);
  };

  return (
    <div className="addCourseOuter">
      <div className="addCourseInner">
        <div
          className={`courseImageDragger ${isDragging ? "dragging" : ""}`}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <img src={file ? URL.createObjectURL(file) : upload} alt="upload" />
          <p className="ImageText">
            {file ? file.name : "Upload an course image"}
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
          />
          {imgError && <p className="errorImageText">{imgError}</p>}
        </div>

        <div className="courseDetails">
          <div>
            <h2>Title</h2>
            <InputField
              type="text"
              placeholder="Enter Titile"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {titleError && <p className="errorImageText">{titleError}</p>}
          </div>

          <div>
            <h2>Description</h2>
            <InputField
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {descriptionError && (
              <p className="errorImageText">{descriptionError}</p>
            )}
          </div>

          <div>
            <h2>Category</h2>
            <InputField
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCatogory(e.target.value)}
            />
            {categoryError && <p className="errorImageText">{categoryError}</p>}
          </div>

          <div>
            <h2>Price</h2>
            <InputField
              type="text"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {priceError && <p className="errorImageText">{priceError}</p>}
          </div>

          <div>
            <h2>Duration</h2>
            <InputField
              type="text"
              placeholder="Enter Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            {durationError && <p className="errorImageText">{durationError}</p>}
          </div>

          <div>
            <h2>Content</h2>
            {contents.map((item, index) => (
              <div
                key={index}
                style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
              >
                <InputField
                  type="text"
                  placeholder={`Chapter ${index + 1}`}
                  value={item.title}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                />

                {contents.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeContentField(index)}
                    style={{ cursor: "pointer" }}
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={addContentField}>
              ➕ Add Chapter
            </button>
            {contentError && <p className="errorImageText">{contentError}</p>}
          </div>
        </div>

        <div className="courseButton">
          <Button name="CLOSE" onButtonClick={handleCloseClick} />
          <Button name="DONE" onButtonClick={handleDoneClick} />
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
