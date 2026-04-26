import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#fafafa] border-t border-gray-200/60 py-16 text-gray-600 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 tracking-tight">
              ShiftSync
            </h3>
            <p className="text-sm leading-relaxed text-gray-500 mb-6 max-w-xs">
              Precision shift management for modern teams. Plan smarter, collaborate faster, and optimize every shift.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <FaGithub size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-5 tracking-wide uppercase">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Features</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Pricing</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Changelog</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-5 tracking-wide uppercase">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">API Reference</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-5 tracking-wide uppercase">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">About</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Customers</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Divider & Bottom */}
        <div className="pt-8 border-t border-gray-200/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ShiftSync, Inc. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors text-sm">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors text-sm">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
