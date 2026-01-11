import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputFiled/InputField";
import { useNavigate } from "react-router-dom";
import Table, { ColumnConfig } from "../../components/Table/Tables";
import AxiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";
import update from "../../assets/edit.png";
import del from "../../assets/delete.png";

const Course = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [courses, setCourses] = useState<any[]>([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [totalCourses, setTotalCourses] = useState(0);

  const handleAddClick = () => {
    navigate("/admin/addCourse");
  };

  const getAllCourses = async () => {
    try {
      const response = await AxiosInstance.get("/course/findAll", {
        params: { searchText, pageNumber, size: pageSize },
      });
      setCourses(response.data.courses);
      setTotalCourses(response.data.total);
      console.log("Response : ", response);
    } catch (error) {
      toast.error("Can not load. Please try again");
      console.log(error);
    } 
  };

  const handleUpdateClick = (courseId: any) => {
    navigate(`/admin/updateCourse/${courseId}`);
  };

  const handleDeleteClick = async (courseId: any) => {
    try {
      const response = await AxiosInstance.delete(`/course/delete/${courseId}`);
      toast.success(response.data.message || "Course deleted successfully!");
      getAllCourses();
    } catch (error) {
      toast.error("Failed to delete course.");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, [pageNumber, pageSize, searchText]);

  const columns: ColumnConfig[] = [
    { key: "image", header: "Image" },
    { key: "title", header: "Title" },
    { key: "description", header: "Description" },
    { key: "price", header: "Price" },
    { key: "category", header: "Category" },
    { key: "duration", header: "Duration" },
    { key: "actions", header: "Action" },
  ];

  const totalPages = Math.ceil(totalCourses / pageSize);

  return (
    <div className="courseOuter">
      <div className="courseTop">
        <InputField
          type="text"
          placeholder="Search by title and category"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          type="button"
          name="ADD COURSE"
          onButtonClick={handleAddClick}
        />
      </div>
      <div className="courseMiddle">
        <Table
          rows={
            Array.isArray(courses)
              ? courses.map((course) => ({
                  image: course.image,
                  title: course.title,
                  description: course.description,
                  price: course.price,
                  category: course.category,
                  duration: course.duration,
                  actions: [
                    {
                      name: "Update",
                      icon: update,
                      onClick: () => handleUpdateClick(course._id || 0),
                    },
                    {
                      name: "Delete",
                      icon: del,
                      onClick: () => handleDeleteClick(course._id || 0),
                    },
                  ],
                }))
              : []
          }
          columns={columns}
        />
        <div className="pagination">
          <button
            disabled={pageNumber === 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous
          </button>
          <span>
            Page {pageNumber} of {totalPages}
          </span>
          <button
            disabled={pageNumber === totalPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course;
