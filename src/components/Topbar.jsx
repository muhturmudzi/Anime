import * as React from "react";
import { NavLink } from "react-router-dom";

export default function Topbar () {
  return (
    <header className="topbar">
      <div className="container text-center">
        <ul className="list list--inline p-0">
          <li><NavLink to='/anime-list'>Anime</NavLink></li>
          <li><NavLink to='/collection-list'>My Collection</NavLink></li>
        </ul>
      </div>
    </header>
  )
}