import imgLogo from "../assets/logo.png"
import imgTwitter from "../assets/twt.png";
import imgFB from "../assets/fb.png";
import imgInsta from "../assets/insta.png";

const Footer = () => {

    return (
        <div class="footer-custom">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="center-footer">
                            <div class="center-footer-1">
                                <img src={imgLogo} class="logo-footer" alt="" />
                            </div>
                            <div class="center-footer-2">
                                <ul>
                                    <li><a href="javascript:void(0)">Home</a></li>
                                    <li><a href="javascript:void(0)">About</a></li>
                                    <li><a href="javascript:void(0)">Contact</a></li>
                                    <li><a href="javascript:void(0)">FAQ</a></li>
                                </ul>
                            </div>
                            <div class="center-footer-3">
                                <ul>
                                    <li><a href="javascript:void(0)"><img src={imgTwitter} alt="" /></a></li>
                                    <li><a href="javascript:void(0)"><img src={imgFB} alt="" /></a></li>
                                    <li><a href="javascript:void(0)"><img src={imgInsta} alt="" /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="right-copy">
                            <p>© Copyright 2023, All Rights Reserved by Regenerative</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Footer;