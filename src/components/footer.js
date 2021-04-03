import React from "react"
import Logo from "../assets/images/logo_white.svg"
import { Link } from "gatsby"
import { IconContext } from "react-icons"
import { IoLogoTwitter, IoLogoInstagram } from "react-icons/io"
import { FaPinterestP } from "react-icons/fa"
import siteData from "../util/site.json"
import variables from "../assets/scss/abstracts/_variables.scss"
const Footer = () => {
  const { social } = siteData.meta
  const { footerLinks, footerText } = siteData

  return (
    <footer>
      <div className="footer">
        <div className="footer__addr">
          <div className="footer__logo">
            <img src={Logo} alt="Footer Logo" />
          </div>
        </div>

        <ul className="footer__nav">
          <li className="nav__item">
            <ul className="coloumn1-content">
              {footerLinks.slice(0, 4).map(links => {
                return (
                  <li>
                    <a href={links.link} target="_blank">
                      {links.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </li>

          <li className="coloumn2-content">
            <ul className="nav__ul">
              {footerLinks.slice(4, 8).map(links => {
                return (
                  <li>
                    <a href={links.link} target="_blank">
                      {links.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </li>
        </ul>
        <hr className="set-line" />
        <div className="footer-bottom-section">
          <div className="legal">
            <p className="copyright"> {footerText.footerCopyRight}</p>
            <p className="foooter-text">
              {footerText.footerFirstLine}
              <br /> {footerText.footerSecondLine}
            </p>
          </div>
          <div className="footer_social_icons">
            <IconContext.Provider value={{ className: "footer-icon" }}>
              <a className="social_link footer-icon" href={social.twitterLink} target="_blank">
                <IoLogoTwitter />
              </a>
            </IconContext.Provider>
            <IconContext.Provider value={{ className: "footer-icon" }}>
              <a className="social_link" href={social.instagramLink} target="_blank">
                <IoLogoInstagram />
              </a>
            </IconContext.Provider>
            <IconContext.Provider value={{ className: "footer-icon" }}>
              <a className="social_link" href={social.pinterestLink} target="_blank">
                <FaPinterestP />
              </a>
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
