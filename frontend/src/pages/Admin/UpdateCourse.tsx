import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputFiled/InputField";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import upload from "../../assets/upload.png";
import AxiosInstance from "../../config/axiosInstance";

const UpdateCourse = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCatogory] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
   const [courseImage, setCourseImage] = useState('');

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imgError, setImgError] = useState<string | null>(null);
  

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
    setCourseImage(URL.createObjectURL(selectedFile));
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
    setCourseImage(URL.createObjectURL(droppedFile)); 
  };

  const handleUpdateClick = async () => {
    if (!id) {
      toast.error("Invalid course ID");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("duration", duration);

      if (file) {
        formData.append("image", file);
      }

      const response = await AxiosInstance.put(
        `/course/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message || "Course Updated successfully!");
    } catch (error) {
      toast.error("Please try again");
      console.log(error);
    }
  };

  const handleCloseClick = () => {
    navigate("/admin/courses");
  };

  const getCourseById = async () => {
    if (!id) return;

    const response = await AxiosInstance.get(`/course/findById/${id}`);

    setTitle(response.data.data.title);
    setDescription(response.data.data.description);
    setCatogory(response.data.data.category);
    setPrice(response.data.data.price);
    setDuration(response.data.data.duration);
    setCourseImage(response.data.data.image?.[0] || null);
  };

  useEffect(() => {
    getCourseById();
  }, [id]);

  const parts = courseImage.split('/');
  const courseImageName = parts[parts.length - 1];

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
          <img src={courseImage } alt="upload" />
          <p className="ImageText">
            {file ? file.name : courseImage ? courseImageName : "Upload an course image"}
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
          </div>

          <div>
            <h2>Description</h2>
            <InputField
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

          </div>

          <div>
            <h2>Category</h2>
            <InputField
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCatogory(e.target.value)}
            />
          </div>

          <div>
            <h2>Price</h2>
            <InputField
              type="text"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <h2>Duration</h2>
            <InputField
              type="text"
              placeholder="Enter Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>

        <div className="courseButton">
          <Button name="CLOSE" onButtonClick={handleCloseClick} />
          <Button name="UPDATE" onButtonClick={handleUpdateClick} />
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;

