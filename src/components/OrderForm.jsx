import { useState } from "react";
import { useCart, selectCartTotal } from "../context/useCart";

const initialForm = {
  name: "",
  phone: "",
  area: "",
  notes: "",
};

function OrderForm() {
  const [form, setForm] = useState(initialForm);
  const items = useCart((state) => state.items);
  const total = useCart(selectCartTotal);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>Delivery details</h2>
      <p>Cart: {items.length} item{items.length === 1 ? "" : "s"}</p>
      <p>Checkout total: {total} ETB</p>
      {items.length > 0 && (
        <ul>
          {items.map((item) => <li key={item.id}>{item.name}</li>)}
        </ul>
      )}

      <label>
        Name
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
        />
      </label>

      <label>
        TeleBirr number
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          inputMode="numeric"
          placeholder="09XXXXXXXX"
          autoComplete="tel"
        />
      </label>

      <label htmlFor="area">
        Delivery area
      </label>
      <select
        id="area"
        name="area"
        value={form.area}
        onChange={handleChange}
      >
        <option value="">Select an area</option>
        <option value="Bole">Bole</option>
        <option value="Kazanchis">Kazanchis</option>
        <option value="Megenagna">Megenagna</option>
        <option value="Piassa">Piassa</option>
      </select>

      <label>
        Notes (optional)
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Any delivery notes?"
        />
      </label>

      <button type="submit">Place order</button>
    </form>
  );
}

export default OrderForm;