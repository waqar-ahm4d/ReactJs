
function QuantitySelector({quantity, setQuantity}) {

  function increaseQty() {
    setQuantity((prev) => prev + 1);
  }
  function decreaseQty() {
    setQuantity((prev) => Math.max(1, prev - 1));
  }
return <>
<div className="quantity-selector">
    <button onClick={decreaseQty}>-</button>
    <span>{quantity}</span>
    <button onClick={increaseQty}>+</button>
</div>
</>
}

export default QuantitySelector;
