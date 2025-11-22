import React from "react";
import html2pdf from "html2pdf.js";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

function ResumePreview({ personalInfo, education, experience, skills, summary, certificates }) {
  const handleDownloadPDF = () => {
    const element = document.getElementById("resume-preview");
    const options = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };
    html2pdf().set(options).from(element).save();
  };

  const handleDownloadDocx = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ children: [new TextRun({ text: "Resume", bold: true, size: 28 })] }),
            new Paragraph(`Name: ${personalInfo?.name}`),
            new Paragraph(`Email: ${personalInfo?.email}`),
            new Paragraph(`Phone: ${personalInfo?.phone}`),
            new Paragraph(`Address: ${personalInfo?.address}`),
            new Paragraph({ children: [new TextRun({ text: "Summary", bold: true })] }),
            new Paragraph(summary || ""),
            new Paragraph({ children: [new TextRun({ text: "Education", bold: true })] }),
            ...(education || []).map(
              (edu) => new Paragraph(`${edu.school} — ${edu.degree} (${edu.year})`)
            ),
            new Paragraph({ children: [new TextRun({ text: "Experience", bold: true })] }),
            ...(experience || []).map(
              (job) => new Paragraph(`${job.role} — ${job.company} (${job.start} - ${job.end})\n${job.details}`)
            ),
            new Paragraph({ children: [new TextRun({ text: "Skills", bold: true })] }),
            ...(skills || []).map((skill) => new Paragraph(skill)),
            new Paragraph({ children: [new TextRun({ text: "Certificates", bold: true })] }),
            ...(certificates || []).map(
              (cert) => new Paragraph(`${cert.title} (${cert.year})`)
            ),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "resume.docx");
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Gradient header with buttons */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white tracking-wide">Resume Preview</h2>
        <div className="space-x-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Print
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
          <button
            onClick={handleDownloadDocx}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Download DOCX
          </button>
        </div>
      </div>

      {/* Resume content */}
      <div id="resume-preview" className="p-6 space-y-6 text-gray-800 divide-y divide-gray-200">
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">Contact Information</h3>
          <p>Name: {personalInfo?.name}</p>
          <p>Email: {personalInfo?.email}</p>
          <p>Phone: {personalInfo?.phone}</p>
          <p>Address: {personalInfo?.address}</p>
        </div>

        {/* Summary */}
        {summary && (
          <div>
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">Professional Summary</h3>
            <p>{summary}</p>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">Education</h3>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <p className="font-semibold">{edu.school} — {edu.degree}</p>
                <p className="text-gray-600">{edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">Work Experience</h3>
            {experience.map((job, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold">{job.role} — {job.company}</p>
                <p className="text-sm text-gray-600">{job.start} - {job.end}</p>
                <p>{job.details}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">Skills</h3>
            <ul className="list-disc list-inside">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Certificates */}
        {certificates && certificates.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">Certificates</h3>
            <ul className="list-disc list-inside">
              {certificates.map((cert, index) => (
                <li key={index}>{cert.title} ({cert.year})</li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </div>
  );
}

export default ResumePreview;
