import React, { useState } from "react"
import * as FaIcons from "react-icons/fa"
import { Link } from "gatsby"

import { IconContext } from "react-icons"
import siteData from "../util/site.json"
function Navbar() {
  const [sidebar, setSidebar] = useState(false)
  const { sideBarData } = siteData
  const showSidebar = () => {
    if (!sidebar) {
      let element = document.getElementsByClassName("primary-container")[0]
      // let element = document.getElementsByTagName("body")[0]

      // element.style.overflow = "hidden"
      element.classList.add("overlay")
      let overlayElement = document.getElementsByClassName("overlay")[0]
      overlayElement.addEventListener("click", () => {
        if (element) element.classList.remove("overlay")
        var imgs = document.querySelectorAll(".featured-image")

        for (var i = 0; i < imgs.length; i++) {
          imgs[i].style.opacity = 1
        }
        setSidebar(false)
      })

      var imgs = document.querySelectorAll(".featured-image")

      for (var i = 0; i < imgs.length; i++) {
        imgs[i].style.opacity = 0.3
      }

      // let links = document.querySelectorAll("a")
      // console.log("Links", links)
      // for (let i = 0; i < links.length; i++) {
      //   links[i].style.pointerEvents = "none"
      //   links[i].style.opacity = 0.3
      // }
    }
    setSidebar(true)
  }

  const removeSidebar = () => {
    let element = document.getElementsByClassName("overlay")[0]

    if (element) element.classList.remove("overlay")
    var imgs = document.querySelectorAll(".featured-image")

    for (var i = 0; i < imgs.length; i++) {
      imgs[i].style.opacity = 1
    }

    let links = document.querySelectorAll("a")

    for (let i = 0; i < links.length; i++) {
      links[i].style.pointerEvents = ""
      links[i].style.opacity = 1
    }
    setSidebar(false)
  }

  return (
    <>
      <IconContext.Provider value={{ color: "#000000" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={removeSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars-modified">
                <FaIcons.FaBars />
              </Link>
            </li>
            {sideBarData.map((item, index) => {
              return (
                <li key={index} className="nav-text navbar-border">
                  <a href={item.path} target="_blank">
                    {item.icon}
                    <span style={{ fontWeight: "700" }}>{item.title}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar
