import React, { useState } from "react";
import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
import ResumePreview from "./ResumePreview";

function App() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [education, setEducation] = useState({
    school: "",
    degree: "",
    years: "",
    prompt: "",
    generatedText: "",
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 flex items-center justify-center p-10">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left side: Forms */}
        <div className="space-y-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">Personal Info</h2>
          <PersonalInfoForm personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />

          <h2 className="text-xl font-bold text-indigo-600 mb-4">Education</h2>
          <EducationForm education={education} setEducation={setEducation} />
        </div>

        {/* Right side: Resume Preview */}
        <ResumePreview personalInfo={personalInfo} education={education} />
      </div>
    </div>
  );
}

export default App;
