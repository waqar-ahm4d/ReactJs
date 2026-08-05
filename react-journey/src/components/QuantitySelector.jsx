import { Minus, Plus } from "lucide-react";

function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <>
      <div className="flex items-center rounded-lg border">
        <button
          onClick={onDecrease}
          className="p-2 hover:bg-gray-100"
        >
          <Minus size={16} />
        </button>
        <span className="w-10 text-center">{quantity}</span>
        <button
          onClick={onIncrease}
          className="p-2 hover:bg-gray-100"
        >
          <Plus size={16} />
        </button>
      </div>
    </>
  );
}
export default QuantitySelector;
