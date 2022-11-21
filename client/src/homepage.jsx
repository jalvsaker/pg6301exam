import { Link } from "react-router-dom";

export function Homepage() {
  return (
    <>
      <h1>Bob's Catering</h1>
      <p>Welcome to Bob's catering. Mediocre food to mediocre prices.</p>
      <Link to={"/menu"}>See the menu</Link>
    </>
  );
}
