import { useEffect, useState } from "react";
import { Food } from "./food";

export function Menu() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/foods");
      if (res.ok) {
        setFoods(await res.json());
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Menu</h1>
      {foods.map((food) => (
        <Food food={food} key={food._id} />
      ))}
    </>
  );
}
