function ResumePreview({ personalInfo, education }) {
  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Gradient header */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white tracking-wide">
          Resume Preview
        </h2>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 text-gray-800 divide-y divide-gray-200">
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">Contact Information</h3>
          <p>Name: {personalInfo.name}</p>
          <p>Email: {personalInfo.email}</p>
          <p>Phone: {personalInfo.phone}</p>
          <p>Address: {personalInfo.address}</p>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">Education</h3>
          <p>{education.school} — {education.degree}</p>
          <p>{education.years}</p>
          {education.generatedText && (
            <p className="italic text-gray-600">{education.generatedText}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
