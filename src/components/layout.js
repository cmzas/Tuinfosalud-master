import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useLocation } from "@reach/router"
import ProgressBar from "react-scroll-progress-bar"

import { IconContext } from "react-icons"
import * as FaIcons from "react-icons/fa"
import { IoLogoTwitter, IoLogoInstagram, IoLogoPinterest } from "react-icons/io"
import { FaPinterestP } from "react-icons/fa"
import { Link } from "gatsby"
import Header from "./header"
import Navbar from "./navbar"
import Footer from "./footer"
import Logo from "./logo"
import siteData from "../util/site.json"

import "../assets/scss/style.scss"
import variables from "../assets/scss/abstracts/_variables.scss"
const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        siteTitle: title
      }
    }
  }
`

const Layout = ({ children, className, blogTitle }) => {
  const { site } = useStaticQuery(query)
  const { pathname } = useLocation()

  const { accentColor } = siteData
  const { siteTitle } = site.siteMetadata
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    let isMounted = true // note this flag denote mount status
    // someAsyncOperation().then(data => {
    //   if (isMounted) setState(data);
    // })
    if (isMounted && typeof window !== "undefined" && window.document) {
      window.addEventListener("scroll", function () {
        var value = window.scrollY
        if (value > 70) {
          document.querySelector(".site-header").classList.add("sticky")
          setSticky(true)
        } else {
          document.querySelector(".site-header").classList.remove("sticky")
          setSticky(false)
        }
      })
    }
    return () => {
      isMounted = false
    } // use effect cleanup to set flag false, if unmounted
  }, [])

  return (
    <div className="primary-container">
      {pathname.includes("/articulos") ? <ProgressBar height="6px" bgcolor={accentColor} /> : null}

      <Header>
        <Navbar />
        <Logo sticky={sticky} blogTitle={blogTitle ? blogTitle : ""} title={siteTitle} />
        {sticky ? (
          stickyIcons()
        ) : (
          <IconContext.Provider value={{ color: "#000000" }}>
            <Link to="#" className="search-icon">
              <FaIcons.FaSearch />
            </Link>
          </IconContext.Provider>
        )}
      </Header>
      <main className={"container " + className}>{children}</main>
      <Footer />
    </div>
  )
}

const stickyIcons = () => {
  const { social } = siteData.meta
  return (
    <div className="sticky-icons">
      {/* <img src={SocialIcon1} alt="Social Icon 1" /> */}
      <div className="circle">
        <IconContext.Provider value={{ className: "header-icon" }}>
          <a href={social.twitterLink} target="_blank">
            <IoLogoTwitter />
          </a>
        </IconContext.Provider>
      </div>

      <div className="circle">
        <IconContext.Provider value={{ className: "header-icon" }}>
          <a href={social.instagramLink} target="_blank">
            <IoLogoInstagram />
          </a>
        </IconContext.Provider>
      </div>
      <div className="circle">
        <IconContext.Provider value={{ className: "header-icon" }}>
          <a href={social.pinterestLink} target="_blank">
            <FaPinterestP />
          </a>
        </IconContext.Provider>
      </div>
    </div>
  )
}

export default Layout
