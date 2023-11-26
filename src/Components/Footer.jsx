
import logo from '../assets/Icon/logo.png'
import {FaFacebook, FaGithub, FaYoutube} from 'react-icons/fa'
const Footer = () => {
    return (
      <div>
        <footer className="footer p-10 bg-black text-neutral-content">
          <aside>
            <img src={logo}></img>
            <p>
              TECHBOOK
              <br />
              Providing reliable tech since 1992
            </p>
          </aside>
          <nav>
            <header className="footer-title">Contact</header>
            <div className="grid grid-flow-col gap-4">
              Phone: +02989443533 <br />
              email: techbook@gmail.com
            </div>
            <header className="footer-title mt-3">Address</header>
            <div className="grid grid-flow-col gap-4">
              255/1-A Gulshan-1 Dhaka 1212
            </div>
          </nav>
          <nav>
            <header className="footer-title">Social</header>
            <div className="grid grid-flow-col gap-4 text-3xl">
              <a target='#' href="https://www.facebook.com">
              <FaFacebook></FaFacebook>
              </a>
              <a target='#' href="https://www.github.com">
              <FaGithub></FaGithub>
              </a>
              <a target='#' href="https://www.youtube.com">
              <FaYoutube></FaYoutube>
              </a>
              
            </div>
          </nav>
        </footer>
        <footer className="footer footer-center p-4 bg-slate-900 text-white">
          <aside>
            <p>Copyright © 2023 - All right reserved by TECHBOOK</p>
          </aside>
        </footer>
      </div>
    );
  };
  
  export default Footer;
  