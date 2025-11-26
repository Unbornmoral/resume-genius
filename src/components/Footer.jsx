// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-300 to-teal-600 rounded-xl shadow-2xl overflow-hidden border border-gray-200 text-white font-semibold">
      <div className="container mx-auto text-center text-sm">
        <p>
          © {new Date().getFullYear()} Resume Genius. Built by Alanwoko Chikanma.
        </p>
        <p className="mt-1">
          For any problem or concern, please contact:{" "}
          <a
            href="mailto:alanwokoc@gmail.com"
            className="text-blue-800 hover:underline"
          >
            alanwokoc@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
