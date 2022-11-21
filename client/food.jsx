export function Food({ food }) {
  return (
    <div>
      {food.name} - {food.price}
      <div>
        <input type="number" /> <button>Add to cart</button>
      </div>
      <hr />
    </div>
  );
}
