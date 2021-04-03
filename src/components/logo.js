import React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import { LogoSVG } from "./svg"

const Logo = ({ blogTitle, sticky }) => {
  const { pathname } = useLocation()

  const style = {}
  if (sticky && pathname !== "/") {
    style.marginRight = 0
  }
  return (
    <>
      <Link style={style} className="logo" to="/">
        <LogoSVG />
      </Link>
      {blogTitle && sticky ? <p className="sticky-title">{blogTitle}</p> : ""}
    </>
  )
}

export default Logo
