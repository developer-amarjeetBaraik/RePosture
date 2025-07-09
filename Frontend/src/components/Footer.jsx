import React from 'react'
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="w-full bg-black border-t border-gray-800 text-gray-400 text-sm py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-center sm:text-left">
                © 2025 <span className="text-white font-semibold">RePosture</span> —  by <a href="https://linkedin.com/in/amarjeet-chik-baraik">Amarjeet Baraik</a>
            </div>

            <div>
            <a href="">Review it's code on GitHub.</a>
            </div>

            <div className="flex gap-4 text-lg">
                <a href="https://portfolio-amarjeet.onrender.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition" title="Portfolio">
                    <FaGlobe />
                </a>
                <a href="https://github.com/developer-amarjeetBaraik" target="_blank" rel="noopener noreferrer" className="hover:text-white transition" title="GitHub">
                    <FaGithub />
                </a>
                <a href="https://linkedin.com/in/amarjeet-chik-baraik" target="_blank" rel="noopener noreferrer" className="hover:text-white transition" title="LinkedIn">
                    <FaLinkedin />
                </a>
                <a href="mailto:amarjeetofficial81@gmail.com" className="hover:text-white transition" title="Email">
                    <FaEnvelope />
                </a>
                <a href="https://www.instagram.com/amarjeet_baraik_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition" title="Instagram">
                    <FaInstagram />
                </a>
            </div>
        </footer>

    )
}

export default Footer
