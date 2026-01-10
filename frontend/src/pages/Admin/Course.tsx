import { useState } from "react";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputFiled/InputField";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table/Tables";

const Course = () => {
    const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

   const handleAddClick = () => {
        navigate('/addCourse');
    };

    const handleUpdateClick = () => {
        navigate('/updateCourse');
    };

  return (
    <div className="courseOuter">
      <div className="courseTop">
        <InputField
          type="text"
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button type="button" name="ADD COURSE" onButtonClick={handleAddClick} />
      </div>
      <div className="courseMiddle">
        {/* <Table /> rows={} columns={} searchText={searchText} */}
      </div>
      <div className="courseBottom">
        <Button type="button" name="UPDATE" onButtonClick={handleUpdateClick} />
      </div>
    </div>
  );
};

export default Course;
