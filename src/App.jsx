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
  const addEducation = () => setEducation([...education, { school: "", degree: "", year: "" }]);
  const addExperience = () => setExperience([...experience, { role: "", company: "", start: "", end: "", details: "" }]);
  const addSkill = () => {
    const value = prompt("Enter a skill");
    if (value) setSkills([...skills, value]);
  };
  const addCertificate = () => setCertificates([...certificates, { title: "", year: "" }]);

  // Delete handlers
  const deleteEducation = (i) => setEducation(education.filter((_, idx) => idx !== i));
  const deleteExperience = (i) => setExperience(experience.filter((_, idx) => idx !== i));
  const deleteSkill = (i) => setSkills(skills.filter((_, idx) => idx !== i));
  const deleteCertificate = (i) => setCertificates(certificates.filter((_, idx) => idx !== i));

  // Update helpers
  const updateEducation = (i, field, value) => {
    const next = [...education];
    next[i] = { ...next[i], [field]: value };
    setEducation(next);
  };
  const updateExperience = (i, field, value) => {
    const next = [...experience];
    next[i] = { ...next[i], [field]: value };
    setExperience(next);
  };
  const updateCertificate = (i, field, value) => {
    const next = [...certificates];
    next[i] = { ...next[i], [field]: value };
    setCertificates(next);
  };

  // Hugging Face proxy call
  const callHuggingFace = async (prompt) => {
    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.error) {
        console.error("HF error:", data.error);
        return null;
      }
      console.log("Backend response:", data);
      return data;
    } catch (err) {
      console.error("Backend error:", err);
      return null;
    }
  };

  // AI helpers
  const generateSummaryWithAI = async (role) => {
    const data = await callHuggingFace(`Write a professional resume summary for a ${role}.`);
    if (data && data[0]) {
      const text = data[0].summary_text || data[0].generated_text;
      if (text) setSummary(text);
    } else if (data?.error) {
      alert("AI error: " + data.error);
    }
  };

  const generateSkillsWithAI = async (role) => {
    const data = await callHuggingFace(`List 8 key skills for a ${role} resume.`);
    if (data && data[0]) {
      const text = data[0].summary_text || data[0].generated_text;
      if (text) setSkills(text.split(",").map((s) => s.trim()));
    } else if (data?.error) {
      alert("AI error: " + data.error);
    }
  };

  const generateExperienceWithAI = async (role, company) => {
    const data = await callHuggingFace(`Generate 3 resume bullet points for a ${role} at ${company}.`);
    if (data && data[0]) {
      const text = data[0].summary_text || data[0].generated_text;
      if (text) {
        setExperience([...experience, { role, company, start: "", end: "", details: text }]);
      }
    } else if (data?.error) {
      alert("AI error: " + data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Form */}
        <div className="w-full md:w-1/2">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Resume Builder</h2>

            {/* Personal Info */}
            <div className="space-y-2 mb-6">
              <h3 className="font-semibold">Personal info</h3>
              {["name","email","phone","address"].map((field) => (
                <input
                  key={field}
                  className="border p-2 w-full rounded"
                  placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                  value={personalInfo[field]}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, [field]: e.target.value })}
                />
              ))}
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
              {/*
              <button
                onClick={() => generateSummaryWithAI(personalInfo.role || "Frontend Developer")}
                className="px-2 py-1 text-sm bg-green-600 text-white rounded"
              >
                Generate with AI
              </button>
              */}
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
                      <input className="border p-2 rounded" placeholder="School"
                        value={edu.school} onChange={(e) => updateEducation(i, "school", e.target.value)} />
                      <input className="border p-2 rounded" placeholder="Degree"
                        value={edu.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} />
                      <input className="border p-2 rounded" placeholder="Year"
                        value={edu.year} onChange={(e) => updateEducation(i, "year", e.target.value)} />
                    </div>
                    <div className="flex justify-end mt-2">
                      <button onClick={() => deleteEducation(i)} className="text-red-600 text-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
              
                          {/* Experience */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Experience</h3>
                <div className="flex gap-2">
                  <button
                    onClick={addExperience}
                    className="px-2 py-1 text-sm bg-blue-600 text-white rounded"
                  >
                    Add
                  </button>
                  {/*
                  <button
                    onClick={() =>
                      generateExperienceWithAI(
                        personalInfo.role || "Frontend Developer",
                        personalInfo.company || "Tech Company"
                      )
                    }
                    className="px-2 py-1 text-sm bg-green-600 text-white rounded"
                  >
                    Generate with AI
                  </button>
                  */}
                </div>
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
                <div className="flex gap-2">
                  <button
                    onClick={addSkill}
                    className="px-2 py-1 text-sm bg-blue-600 text-white rounded"
                  >
                    Add
                  </button>
                  {/*
                  <button
                    onClick={() =>
                      generateSkillsWithAI(personalInfo.role || "Frontend Developer")
                    }
                    className="px-2 py-1 text-sm bg-green-600 text-white rounded"
                  >
                    Suggest Skills with AI
                  </button>
                  */}
                </div>
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
