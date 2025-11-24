import React from "react";

export default function ExportLayout({
  personalInfo,
  education,
  experience,
  skills,
  summary,
  certificates,
}) {
  return (
    <div style={{ fontFamily: "serif", padding: "40px", lineHeight: "1.6", color: "#222" }}>
      {/* Header */}
      <h1 style={{ fontSize: "28px", fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>
        {personalInfo?.name}
      </h1>
      <p style={{ textAlign: "center", marginBottom: "5px" }}>
        {personalInfo?.email} | {personalInfo?.phone}
      </p>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        {personalInfo?.address}
      </p>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", borderBottom: "1px solid #ccc", marginBottom: "8px" }}>
            Summary
          </h2>
          <p>{summary}</p>
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", borderBottom: "1px solid #ccc", marginBottom: "8px" }}>
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <p style={{ fontWeight: "600" }}>{edu.school} — {edu.degree}</p>
              <p style={{ color: "#555" }}>{edu.year}</p>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", borderBottom: "1px solid #ccc", marginBottom: "8px" }}>
            Experience
          </h2>
          {experience.map((job, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <p style={{ fontWeight: "600" }}>{job.role} — {job.company}</p>
              <p style={{ fontSize: "14px", color: "#555" }}>{job.start} - {job.end}</p>
              <p>{job.details}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", borderBottom: "1px solid #ccc", marginBottom: "8px" }}>
            Skills
          </h2>
          <ul style={{ paddingLeft: "20px" }}>
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Certificates */}
      {certificates?.length > 0 && (
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", borderBottom: "1px solid #ccc", marginBottom: "8px" }}>
            Certificates
          </h2>
          <ul style={{ paddingLeft: "20px" }}>
            {certificates.map((cert, i) => (
              <li key={i}>{cert.title} ({cert.year})</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
