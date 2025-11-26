// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-10">
      <div className="container mx-auto text-center text-sm">
        <p>
          © {new Date().getFullYear()} Resume Genius. Built by Alanwoko Chikanma.
        </p>
        <p className="mt-1">
          For any problem or concern, please contact:{" "}
          <a
            href="mailto:alanwokoc@gmail.com"
            className="text-blue-400 hover:underline"
          >
            alanwokoc@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
