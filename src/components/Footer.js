import imgLogo from "../assets/logo.png"
import imgTwitter from "../assets/twt.png";
import imgFB from "../assets/fb.png";
import imgInsta from "../assets/insta.png";
import { Link } from "react-router-dom";

const Footer = () => {

    return (
        <div className="footer-custom">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="center-footer">
                            <div className="center-footer-1">
                                <img src={imgLogo} className="logo-footer" alt="" />
                            </div>
                            <div className="center-footer-2">
                                <ul>
                                    <li><Link to="/home">Home</Link></li>
                                    <li><Link href="/about">About</Link></li>
                                    <li><Link href="/contact">Contact</Link></li>
                                    <li><Link href="/home">FAQ</Link></li>
                                </ul>
                            </div>
                            <div className="center-footer-3">
                                <ul>
                                    <li><a href="https://twitter.com" target="_blank" ><img src={imgTwitter} alt="" /></a></li>
                                    <li><a href="https://facebook.com" target="_blank"><img src={imgFB} alt="" /></a></li>
                                    <li><a href="https://instagram.com" target="_blank"><img src={imgInsta} alt="" /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="right-copy">
                            <p>© Copyright 2023, All Rights Reserved by Regenerative</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Footer;