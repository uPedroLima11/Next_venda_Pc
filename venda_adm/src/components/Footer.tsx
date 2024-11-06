export function Footer() {
  return (
    <footer className="bg-[#262626] p-10 font-[sans-serif] tracking-wide">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="lg:flex lg:items-center">
          <a href="javascript:void(0)">
            <img
              src="/logo.png"
              alt="logo"
              className="w-52"
            />
          </a>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
          <ul className="space-y-4">
            <li>
              <a
                href="javascript:void(0)"
                className="text-gray-300 hover:text-white text-sm"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-gray-300 hover:text-white text-sm"
              >
                Phone
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-gray-300 hover:text-white text-sm"
              >
                Address
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
          <ul className="space-y-4">
            <li>
              <a
                href="javascript:void(0)"
                className="text-gray-300 hover:text-white text-sm"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-gray-300 hover:text-white text-sm"
              >
                Phone
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-gray-300 hover:text-white text-sm"
              >
                Address
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6 text-white">Information</h4>
          <ul className="space-y-4">
            <li>
              <a
                href="javascript:void(0)"
                className="text-gray-300 hover:text-white text-sm"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-gray-300 hover:text-white text-sm"
              >
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-gray-300 hover:text-white text-sm"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
