import InputField from "../../components/InputFiled/InputField";
import Table, { ColumnConfig } from "../../components/Table/Tables";
import { useEffect, useState } from "react";
import AxiosInstance from "../../config/axiosInstance"
import { toast } from "react-toastify";

const Students = () => {
  const [searchText, setSearchText] = useState("");
  const [students, setStudents] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalStudents, setTotalStudents] = useState(0);

  const getAllEnrolledStudents = async () => {
    try {
      const response = await AxiosInstance.get("/enroll/getAllEnrolledStudents", {
        params: { searchText, pageNumber, size: pageSize },
      });
      setStudents(response.data.students);
      setTotalStudents(response.data.total);
      console.log("Response : ", response);
    } catch (error) {
      toast.error("Can not load. Please try again");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEnrolledStudents();
  }, [pageNumber, pageSize, searchText]);

  const columns: ColumnConfig[] = [
    { key: "studentName", header: "Student Name" },
    { key: "email", header: "Email" },
    { key: "courseName", header: "Course" },
    { key: "enrolledAt", header: "Enrolled At" ,render: (row) =>
        new Date(row.enrolledAt).toLocaleDateString(),
    },
  ];

  const totalPages = Math.ceil(totalStudents  / pageSize);

  return (
    <div className="courseOuter">
      <div className="courseTop">
        <InputField
          type="text"
          placeholder="Search by student name, email, course name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="courseMiddle">
        <Table rows={students} columns={columns}/>
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

export default Students;
