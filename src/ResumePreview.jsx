import React from "react";
import html2pdf from "html2pdf.js";
import { saveAs } from "file-saver";
import ReactDOMServer from "react-dom/server";
import ExportLayout from "./ExportLayout";
import { DndContext, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";

function ResumePreview({
  personalInfo,
  education,
  experience,
  skills,
  summary,
  certificates,
  template,
  sectionOrder,
  setSectionOrder,
}) {
  // PDF Export
  const handleDownloadPDF = () => {
    const exportHTML = ReactDOMServer.renderToString(
      <ExportLayout
        personalInfo={personalInfo}
        education={education}
        experience={experience}
        skills={skills}
        summary={summary}
        certificates={certificates}
      />
    );

    const opt = {
      margin: 0.5,
      filename: "resume.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(exportHTML).save();
  };

  // JSON Export
  const handleDownloadJSON = () => {
    const data = { personalInfo, education, experience, skills, summary, certificates };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Template styles
  const templateClasses = {
    classic: "font-serif text-gray-900 leading-relaxed",
    modern: "font-sans text-gray-800 leading-relaxed bg-gray-50",
    minimalist: "font-light text-black leading-relaxed tracking-wide",
  };

  // Drag-and-drop setup
  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = sectionOrder.indexOf(active.id);
      const newIndex = sectionOrder.indexOf(over.id);
      const newOrder = [...sectionOrder];
      newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, active.id);
      setSectionOrder(newOrder);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-300 to-teal-600 rounded-xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Header with buttons */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-4 flex flex-wrap justify-between items-center">
        <h2 className="text-2xl font-bold text-white tracking-wide">Resume Preview</h2>
        <div className="space-x-2 mt-2 md:mt-0">
          <button
            onClick={handleDownloadPDF}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Download PDF
          </button>
          <button
            onClick={() => window.print()}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors duration-200"
          >
            Print
          </button>
          <button
            onClick={handleDownloadJSON}
            className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-200"
          >
            Download JSON
          </button>
        </div>
      </div>
          {/* Resume content */}
      <div id="resume-preview" className={`p-6 md:p-10 ${templateClasses[template]} overflow-x-auto`}>
        <h1 className="text-3xl font-bold text-center mb-6">{personalInfo?.name}</h1>
        <p className="text-center mb-2">{personalInfo?.email} | {personalInfo?.phone}</p>
        <p className="text-center mb-6">{personalInfo?.address}</p>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {sectionOrder.map((section) => (
            <div key={section} id={section} className="mb-6 border p-2 cursor-move rounded">
              {section === "summary" && summary && (
                <section>
                  <h2 className="text-xl font-semibold border-b pb-1 mb-2">Summary</h2>
                  <p>{summary}</p>
                </section>
              )}
              {section === "education" && education?.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold border-b pb-1 mb-2">Education</h2>
                  {education.map((edu, i) => (
                    <div key={i}>
                      <p className="font-semibold">{edu.school} — {edu.degree}</p>
                      <p className="text-gray-600">{edu.year}</p>
                    </div>
                  ))}
                </section>
              )}
              {section === "experience" && experience?.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold border-b pb-1 mb-2">Experience</h2>
                  {experience.map((job, i) => (
                    <div key={i}>
                      <p className="font-semibold">{job.role} — {job.company}</p>
                      <p className="text-sm text-gray-600">{job.start} - {job.end}</p>
                      <p>{job.details}</p>
                    </div>
                  ))}
                </section>
              )}
              {section === "skills" && skills?.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold border-b pb-1 mb-2">Skills</h2>
                  <ul className="list-disc list-inside">
                    {skills.map((skill, i) => <li key={i}>{skill}</li>)}
                  </ul>
                </section>
              )}
              {section === "certificates" && certificates?.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold border-b pb-1 mb-2">Certificates</h2>
                  <ul className="list-disc list-inside">
                    {certificates.map((cert, i) => (
                      <li key={i}>{cert.title} ({cert.year})</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          ))}
        </DndContext>
      </div>
    </div>
  );
}

export default ResumePreview;
