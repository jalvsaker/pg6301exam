import { FoodForm } from "./foodForm";
import { useState } from "react";

export function ChangeFood({ food, reload }) {
  const [success, setSuccess] = useState(false);

  async function submit(body) {
    const res = await fetch(`/api/foods/${food._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setSuccess(true);
    }

    reload();
  }
  async function deleteFood(e) {
    e.preventDefault();

    await fetch(`/api/foods/${food._id}`, {
      method: "DELETE",
    });

    reload();
  }

  return (
    <>
      {success && <h4>Updated</h4>}
      <FoodForm
        food={food}
        onSubmit={submit}
        buttonText={"Update"}
        resetAfter={false}
      />
      <button onClick={deleteFood}>Delete</button>
      <hr />
    </>
  );
}
