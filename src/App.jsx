import { useState } from "react";

function App() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [education, setEducation] = useState([
    { school: "", degree: "", year: "" }
  ]);

  const [experience, setExperience] = useState([
    { company: "", role: "", start: "", end: "", details: "" }
  ]);

  const [skills, setSkills] = useState([""]);
  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const [summary, setSummary] = useState("");

  {/* AI integration*/}
  const [summaryLoading, setSummaryLoading] = useState(false);



  // Add / Remove Education
  const addEducation = () => {
    setEducation([...education, { school: "", degree: "", year: "" }]);
  };

  const removeEducation = (index) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setEducation(newEducation);
  };

  // Add / Remove Experience
  const addExperience = () => {
    setExperience([
      ...experience,
      { company: "", role: "", start: "", end: "", details: "" }
    ]);
  };

  const removeExperience = (index) => {
    const newExperience = [...experience];
    newExperience.splice(index, 1);
    setExperience(newExperience);
  };

  const removeSkill = (index) => {
  const newSkills = [...skills];
  newSkills.splice(index, 1);
  setSkills(newSkills);
};

  const moveSkillUp = (index) => {
  if (index === 0) return; // already at the top
  const newSkills = [...skills];
  [newSkills[index - 1], newSkills[index]] = [newSkills[index], newSkills[index - 1]];
  setSkills(newSkills);
};

const moveSkillDown = (index) => {
  if (index === skills.length - 1) return; // already at the bottom
  const newSkills = [...skills];
  [newSkills[index + 1], newSkills[index]] = [newSkills[index], newSkills[index + 1]];
  setSkills(newSkills);
};


  // Handlers for updating
  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);
  };

const handleSkillChange = (index, value) => {
  const newSkills = [...skills];
  newSkills[index] = value;
  setSkills(newSkills);
};

{/*AI section*/}
const generateSummaryAI = async () => {
  try {
    const res = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Write a confident resume summary for a ${experience[0].role} skilled in ${skills.join(", ")}`
      }),
    });

    const data = await res.json();
    setSummary(data.text); // update the summary state
  } catch (err) {
    console.error("Error calling AI:", err);
  }
};


const handleGenerateSummary = () => {
  setSummaryLoading(true);
  // Simulate generation; replace this with a real API call later
  const draft = generateSummaryDraft(personalInfo, experience, skills);
  setSummary(draft);
  setSummaryLoading(false);{/*End of the AI handlers */}
};




  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-500 to-teal-100 flex items-center justify-center p-6 font-serif">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        
        {/* Left side: Forms */}
        <div className="bg-gradient-to-r from-gray-500 to-teal-100 rounded-lg shadow-lg p-6 space-y-6">
          <h2 className="text-xl font-bold mb-4">Personal Info</h2>
          <input
            type="text"
            placeholder="Name"
            value={personalInfo.name}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, name: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={personalInfo.email}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, email: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={personalInfo.phone}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, phone: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={personalInfo.address}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, address: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          {/* Summary Section */}
          <h2 className="text-xl font-bold mt-6">Summary / Objective</h2>
          <textarea
            placeholder="Write a short professional summary..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full border p-2 rounded h-24"
          />

          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={generateSummaryAI}
              className="px-3 py-1 bg-gray-600 text-white rounded"
            >
              Generate with AI
            </button>
          </div>






          {/* Education Section */}
          <h2 className="text-xl font-bold mt-6">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="space-y-2 border p-3 rounded mb-3">
              <input
                type="text"
                placeholder="School"
                value={edu.school}
                onChange={(e) =>
                  handleEducationChange(index, "school", e.target.value)
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Year"
                value={edu.year}
                onChange={(e) =>
                  handleEducationChange(index, "year", e.target.value)
                }
                className="w-full border p-2 rounded"
              />
              <button
                onClick={() => removeEducation(index)}
                className="mt-2 px-3 py-1 bg-gray-600 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addEducation}
            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded"
          >
            + Add Education
          </button>

          {/* Work Experience Section */}
          <h2 className="text-xl font-bold mt-6">Work Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="space-y-2 border p-3 rounded mb-3">
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) =>
                  handleExperienceChange(index, "company", e.target.value)
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Role"
                value={exp.role}
                onChange={(e) =>
                  handleExperienceChange(index, "role", e.target.value)
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Start Date"
                value={exp.start}
                onChange={(e) =>
                  handleExperienceChange(index, "start", e.target.value)
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="End Date"
                value={exp.end}
                onChange={(e) =>
                  handleExperienceChange(index, "end", e.target.value)
                }
                className="w-full border p-2 rounded"
              />
              <textarea
                placeholder="Details"
                value={exp.details}
                onChange={(e) =>
                  handleExperienceChange(index, "details", e.target.value)
                }
                className="w-full border p-2 rounded"
              />
              <button
                onClick={() => removeExperience(index)}
                className="mt-2 px-3 py-1 bg-gray-600 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded"
          >
            + Add Experience
          </button>

          {/* Skills Section */}
          <h2 className="text-xl font-bold mt-6">Skills</h2>
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                placeholder="Skill"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="flex-1 border p-2 rounded"
              />
              <button
                onClick={() => moveSkillUp(index)}
                className="px-2 py-1 bg-gray-300 rounded"
              >
                ↑
              </button>
              <button
                onClick={() => moveSkillDown(index)}
                className="px-2 py-1 bg-gray-300 rounded"
              >
                ↓
              </button>
              <button
                onClick={() => removeSkill(index)}
                className="px-3 py-1 bg-gray-600 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addSkill}
            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded"
          >
            + Add Skill
          </button>


        </div> {/* ✅ Left column closes here */}

        {/* Right side: Resume Preview */}
        <div className="bg-gradient-to-r from-gray-500 to-teal-100 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">
            {personalInfo.name}
          </h1>
          <p className="text-gray-700">{personalInfo.email}</p>
          <p className="text-gray-700">{personalInfo.phone}</p>
          <p className="text-gray-700">{personalInfo.address}</p>

          {/* Divider */}
          {/* Summary Section */}
          {summary && (
            <>
              <hr className="my-4 border-gray-300" />
              <h2 className="text-xl font-bold text-indigo-500 mb-2">Summary</h2>
              <p className="text-gray-700">{summary}</p>
            </>
          )}


          {/* Divider */}
          <hr className="my-4 border-gray-300" />

          <h2 className="text-xl font-bold text-indigo-500 mb-2">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <p className="font-semibold">{edu.school}</p>
              <p className="text-gray-600">{edu.degree} ({edu.year})</p>
            </div>
          ))}

          {/* Divider */}
          <hr className="my-4 border-gray-300" />

          <h2 className="text-xl font-bold text-indigo-500 mb-2">Work Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <p className="font-semibold">{exp.company} – {exp.role}</p>
              <p className="text-gray-600">{exp.start} - {exp.end}</p>
              <p className="text-gray-700">{exp.details}</p>
            </div>
          ))}

          {/*Divider */}
          {/* Skills Section */}
          <hr className="my-4 border-gray-300" />

          <h2 className="text-xl font-bold text-indigo-500 mb-2">Skills</h2>
          <div className="grid grid-cols-2 gap-2 text-gray-700">
            {skills.map((skill, index) => (
              <div key={index} className="font-bold">
                {skill}
              </div>
            ))}
          </div>

          {/* Print / Export */}
            <button
              onClick={() => window.print()}
              className="mt-6 px-4 py-2 bg-indigo-500 text-white rounded font-serif"
            >
              Print / Save as PDF
            </button>

        </div> {/* ✅ Right column closes here */}

      </div>
    </div>
  );
}



export default App;
