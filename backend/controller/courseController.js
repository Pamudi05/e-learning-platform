import Content from "../model/contentModel.js";
import Course from "../model/courseModel.js";

const createCourse = async (req, res) => {
  try {
    console.log("req.file:");
    console.log("req.file:", JSON.stringify(req.file, null, 2));

    console.log("req.body:");
    console.log("req.body:", JSON.stringify(req.body, null, 2));

    
    

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // const image = req.files.map((file) => file.path);
     const image = [req.file.path || req.file.secure_url];

    let contents = [];
    if (req.body.contents) {
      contents = JSON.parse(req.body.contents);
    }

    const course = new Course({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      duration: req.body.duration,
      image: image,
      instructorId: req.user.userId,
    });

    const result = await course.save();

    if (contents.length > 0) {
      const courseContent = contents.map((item, index) => ({
        courseId: result._id,
        title: item.title,
        order: index + 1,
      }));
      await Content.insertMany(courseContent);
      console.log(courseContent)
    }

    console.log('create Course' , result)
    res.status(201).json({
      message: "Course Created Successfully",
      data: result,
    });
  } catch (error) {
    console.error("CREATE COURSE ERROR:", error);
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

const findAllCourses = async (req, res) => {
  try {
    const searchText = req.query.searchText || "";

    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.size) || 5;

    const query = {
      $or: [
        { title: new RegExp(searchText, "i") },
        { category: new RegExp(searchText, "i") },
      ],
    };

    const total = await Course.countDocuments(query);
    const courses = await Course.find(query)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const allCourses = courses.map((course) => ({
      ...course._doc,
      image: course.image
    }));

    res.status(200).json({
      total,
      pageNumber,
      pageSize,
      courses: allCourses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const findById = (req, res) => {
  try {
    const courseId = req.params.id;

    Course.findById(courseId)
      .then((result) => {
        if (result) {
          const course = {
            ...result._doc,
            image: result.image,
          };
          res.status(200).json({ data: course });
        } else {
          res.status(404).json({ message: "Course Not Found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: "Something went wrong", error: error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Error", error: error });
  }
};

const update = async (req, res) => {
  try {
    const updateCourses = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      duration: req.body.duration,
    };

    // if (req.files && req.files.length > 0) {
    //   const image = req.files.map((file) => file.path);
    //   updateCourses.image = image;
    // }

    if (req.file) {
      const image = [req.file.path || req.file.secure_url];
      updateCourses.image = image;
    }

    let contents = [];
    if (req.body.contents) {
      contents = JSON.parse(req.body.contents);
    }

    const update = await Course.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateCourses },
      { new: true }
    );

    if (!update) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (contents.length > 0) {
      await Content.deleteMany({ courseId: update._id });
      
      const courseContent = contents.map((item, index) => ({
        courseId: update._id,
        title: item.title,
        order: index + 1,
      }));
      await Content.insertMany(courseContent);
      console.log(courseContent)
    }
    return res.status(200).json({
      message: "Course Successfully Updated",
      update,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteData = async (req, res) => {
  try {
    const deleteData = await Course.findOneAndDelete({ _id: req.params.id });

    if (!deleteData) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({
      message: "Course Successfully Deleted",
      deleteData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default { createCourse, findAllCourses, findById, update, deleteData };
