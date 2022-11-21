import { Link, NavLink } from "react-router-dom";
import React from "react";

export function Navigation({ user }) {
  return (
    <nav>
      <NavLink to={"/"}>Home</NavLink>
      {!user.username && <NavLink to={"/login"}>Log In</NavLink>}
      {!user.username && <NavLink to={"/register"}>Register new user</NavLink>}
      {user.username && (
        <>
          <span>Welcome {user.username}</span>
          <Link to={"/logout"}>Log out</Link>
        </>
      )}
      {user.isAdmin && <NavLink to={"/admin"}>Admin panel</NavLink>}
    </nav>
  );
}
