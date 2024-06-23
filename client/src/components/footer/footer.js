import "./footer.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    return (
        <div className="footer">
            <div className="fListImage">
                <a href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer">
                    <FacebookIcon />
                </a>
                <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
                    <TwitterIcon />
                </a>
                <a href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon />
                </a>
                <a href="https://www.youtube.com/example" target="_blank" rel="noopener noreferrer">
                    <YouTubeIcon />
                </a>
            </div>
            <div className="fList">
                <ul className="fListItems">
                    <li className="fListItem">Contact</li>
                    <li className="fListItem">Services</li>
                    <li className="fListItem">About</li>
                    <li className="fListItem">Terms</li>
                    <li className="fListItem">Privacy Policy</li>
                </ul>
            </div>
            <div className="fText">Copyright © 2022 Trippin.</div>
        </div>
    );
}

export default Footer;
