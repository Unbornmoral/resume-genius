import React, { useState } from "react";
import ResumePreview from "./ResumePreview";

function App() {
  // State
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [template, setTemplate] = useState("classic");
  const [formOrder, setFormOrder] = useState([
    "summary",
    "education",
    "experience",
    "skills",
    "certificates",
  ]);

  // Add handlers
  const addEducation = () => {
    setEducation([...education, { school: "", degree: "", year: "" }]);
  };
  const addExperience = () => {
    setExperience([...experience, { role: "", company: "", start: "", end: "", details: "" }]);
  };
  const addSkill = () => {
    const value = prompt("Enter a skill");
    if (value) setSkills([...skills, value]);
  };
  const addCertificate = () => {
    setCertificates([...certificates, { title: "", year: "" }]);
  };

  // Delete handlers
  const deleteEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };
  const deleteExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };
  const deleteSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };
  const deleteCertificate = (index) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };

  // Update helpers (for controlled inputs)
  const updateEducation = (index, field, value) => {
    const next = [...education];
    next[index] = { ...next[index], [field]: value };
    setEducation(next);
  };
  const updateExperience = (index, field, value) => {
    const next = [...experience];
    next[index] = { ...next[index], [field]: value };
    setExperience(next);
  };
  const updateCertificate = (index, field, value) => {
    const next = [...certificates];
    next[index] = { ...next[index], [field]: value };
    setCertificates(next);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Inline Form UI */}
        <div className="w-full md:w-1/2">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Resume Builder</h2>

            {/* Personal Info */}
            <div className="space-y-2 mb-6">
              <h3 className="font-semibold">Personal info</h3>
              <input
                className="border p-2 w-full rounded"
                placeholder="Name"
                value={personalInfo.name}
                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
              />
              <input
                className="border p-2 w-full rounded"
                placeholder="Email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
              />
              <input
                className="border p-2 w-full rounded"
                placeholder="Phone"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
              />
              <input
                className="border p-2 w-full rounded"
                placeholder="Address"
                value={personalInfo.address}
                onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
              />
            </div>

            {/* Summary */}
            <div className="space-y-2 mb-6">
              <h3 className="font-semibold">Summary</h3>
              <textarea
                className="border p-2 w-full rounded"
                rows={4}
                placeholder="Brief professional summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>

            {/* Education */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Education</h3>
                <button
                  onClick={addEducation}
                  className="px-2 py-1 text-sm bg-blue-600 text-white rounded"
                >
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {education.map((edu, i) => (
                  <div key={i} className="border rounded p-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <input
                        className="border p-2 rounded"
                        placeholder="School"
                        value={edu.school}
                        onChange={(e) => updateEducation(i, "school", e.target.value)}
                      />
                      <input
                        className="border p-2 rounded"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateEducation(i, "degree", e.target.value)}
                      />
                      <input
                        className="border p-2 rounded"
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) => updateEducation(i, "year", e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => deleteEducation(i)}
                        className="text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Experience</h3>
                <button
                  onClick={addExperience}
                  className="px-2 py-1 text-sm bg-blue-600 text-white rounded"
                >
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {experience.map((job, i) => (
                  <div key={i} className="border rounded p-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                      <input
                        className="border p-2 rounded"
                        placeholder="Role"
                        value={job.role}
                        onChange={(e) => updateExperience(i, "role", e.target.value)}
                      />
                      <input
                        className="border p-2 rounded"
                        placeholder="Company"
                        value={job.company}
                        onChange={(e) => updateExperience(i, "company", e.target.value)}
                      />
                      <input
                        className="border p-2 rounded"
                        placeholder="Start"
                        value={job.start}
                        onChange={(e) => updateExperience(i, "start", e.target.value)}
                      />
                      <input
                        className="border p-2 rounded"
                        placeholder="End"
                        value={job.end}
                        onChange={(e) => updateExperience(i, "end", e.target.value)}
                      />
                    </div>
                    <textarea
                      className="border p-2 w-full rounded"
                      rows={3}
                      placeholder="Details / achievements"
                      value={job.details}
                      onChange={(e) => updateExperience(i, "details", e.target.value)}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => deleteExperience(i)}
                        className="text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Skills</h3>
                <button
                  onClick={addSkill}
                  className="px-2 py-1 text-sm bg-blue-600 text-white rounded"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-2">
                {skills.map((skill, i) => (
                  <li key={i} className="flex items-center justify-between border rounded p-2">
                    <span>{skill}</span>
                    <button
                      onClick={() => deleteSkill(i)}
                      className="text-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certificates */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Certificates</h3>
                <button
                  onClick={addCertificate}
                  className="px-2 py-1 text-sm bg-blue-600 text-white rounded"
                >
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {certificates.map((cert, i) => (
                  <div key={i} className="border rounded p-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <input
                        className="border p-2 rounded"
                        placeholder="Title"
                        value={cert.title}
                        onChange={(e) => updateCertificate(i, "title", e.target.value)}
                      />
                      <input
                        className="border p-2 rounded"
                        placeholder="Year"
                        value={cert.year}
                        onChange={(e) => updateCertificate(i, "year", e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => deleteCertificate(i)}
                        className="text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Template + Order info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <h3 className="font-semibold mb-1">Template</h3>
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="border p-2 w-full rounded"
                >
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                  <option value="minimalist">Minimalist</option>
                </select>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Section order (drag on preview)</h3>
                <div className="text-xs text-gray-600 border rounded p-2">
                  {formOrder.join(" → ")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="w-full md:w-1/2">
          <ResumePreview
            personalInfo={personalInfo}
            education={education}
            experience={experience}
            skills={skills}
            summary={summary}
            certificates={certificates}
            template={template}
            sectionOrder={formOrder}
            setSectionOrder={setFormOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
