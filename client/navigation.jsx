import { Link, NavLink } from "react-router-dom";
import React from "react";

export function Navigation({ user }) {
  return (
    <nav>
      <NavLink to={"/"}>Home</NavLink>
      {!user.username && <NavLink to={"/login"}>Log In</NavLink>}
      {user.username && (
        <span>
          {user.username} <Link to={"/logout"}>Log out</Link>
        </span>
      )}
    </nav>
  );
}
