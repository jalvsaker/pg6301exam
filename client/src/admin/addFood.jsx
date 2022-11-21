import { FoodForm } from "./foodForm";

export function AddFood({reload}){

  async function submit(body) {
    await fetch("/api/foods", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });

    reload();
  }


  return <FoodForm onSubmit={submit} buttonText={"Add"} resetAfter={true}/>
}

