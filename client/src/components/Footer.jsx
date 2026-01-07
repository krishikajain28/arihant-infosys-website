const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Arihant Infosys.
          <span className="block sm:inline sm:ml-2">
            System Version 1.0 (Beta)
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
