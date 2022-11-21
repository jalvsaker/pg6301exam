import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddFood } from "./addFood";
import { ChangeFood } from "./changeFood";

export function Admin({ user }) {
  const navigate = useNavigate();

  if (!user.isAdmin) {
    navigate("/");
  }

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloader, setReloader] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/foods");
      if (res.ok) {
        setFoods(await res.json());
        setLoading(false);
      }
    })();
  }, [reloader]);

  function reload() {
    setReloader((r) => !r);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Admin panel</h1>

      <h3>Add new foods:</h3>
      <AddFood reload={reload} />

      <h3>Change previous foods:</h3>

      {foods.map((food) => (
        <ChangeFood key={food._id} food={food} reload={reload}/>
      ))}
    </>
  );
}
