import React from "react";

function EducationForm({ education, setEducation }) {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">School</label>
        <input
          type="text"
          value={education.school}
          onChange={(e) => setEducation({ ...education, school: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500 p-3"
          placeholder="Enter your school name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Degree</label>
        <input
          type="text"
          value={education.degree}
          onChange={(e) => setEducation({ ...education, degree: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500 p-3"
          placeholder="Enter your degree"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Years</label>
        <input
          type="text"
          value={education.years}
          onChange={(e) => setEducation({ ...education, years: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500 p-3"
          placeholder="e.g. 2018 - 2022"
        />
      </div>

      {/* AI Prompt Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">AI Prompt</label>
        <input
          type="text"
          value={education.prompt}
          onChange={(e) => setEducation({ ...education, prompt: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500 p-3"
          placeholder="e.g. Generate a description for my CS degree"
        />
      </div>
    </form>
  );
}

export default EducationForm;
