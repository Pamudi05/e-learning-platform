import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputFiled/InputField";
import { useNavigate } from "react-router-dom";
import Table, { ColumnConfig } from "../../components/Table/Tables";
import AxiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const Course = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [totalCourses, setTotalCourses] = useState(0);

  const handleAddClick = () => {
    navigate("/addCourse");
  };

  const handleUpdateClick = () => {
    navigate("/updateCourse");
  };

  const getAllCourses = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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
        <Table rows={courses} columns={columns} />{" "}
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
      <div className="courseBottom">
        <Button type="button" name="UPDATE" onButtonClick={handleUpdateClick} />
      </div>
    </div>
  );
};

export default Course;
