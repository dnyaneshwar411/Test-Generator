import func from "@hapi/joi";
import Tests from "../model/test_model.js";

export const testCreate = async (req, res) => {
  try {
    const {
      testName: title,
      highestMarks,
      passingScore,
      questions,
      availableAt,
      createdBy,
      testDuration,
    } = req.body;

    // Create the test
    const test = await Tests.create({
      title,
      highestMarks,
      passingScore,
      questions,
      availableAt,
      createdBy,
      testDuration,
      released: false,
    });

    res.status(201).json({ message: "Test created succesfully" });
  } catch (error) {
    console.log(error.message);
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

///update test using id

export const updateTest = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTest = await Tests.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedTest) {
      return res.status(404).json({ message: "Test not found" });
    }
    console.log("success");
    return res.status(200).json(updatedTest);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteTest = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTest = await Tests.findByIdAndDelete(id);

    if (!deletedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    return res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

////submit answer

export const submitAnswers = async (req, res) => {
  try {
    const test = await Tests.findById(req.params.id);
    const answers = req.body.answers;

    let score = 0;
    test.questions.forEach((question, index) => {
      if (question.answer === answers[index]) {
        score++;
      }
    });
    res.json({ score });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
