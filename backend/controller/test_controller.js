import func from "@hapi/joi";
import Tests from "../model/test_model.js";

export const testCreate = async (req, res) => {
  try {
    const { testName: title, highestMarks, passingScore, questions, availableAt, createdBy, testDuration } = req.body;

    // Create the test
    const test = await Tests.create({
      title,
      highestMarks,
      passingScore,
      questions,
      availableAt,
      createdBy,
      testDuration,
      released: false
    });

    res.status(201).json({ message: "Test created succesfully" });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTests = async (req, res) => {
  try {
    const tests = await Tests.find().populate("questions"); // Only fetch tests that are available
    res.status(200).json({ tests });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const gettestByid = async (req, res) => {
  try {
    const { testId } = req.params;
    const test = await Tests.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.json({ test });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
