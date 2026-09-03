import { useState } from "react";

const initialForm = { name: "", phone: "", area: "" };

function OrderForm() {
  const [form, setForm] = useState(initialForm);
  const isTeleBirrNumber = /^09\d{8}$/.test(form.phone);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setForm(initialForm);
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>Delivery details</h2>
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        TeleBirr number
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          inputMode="numeric"
          placeholder="09XXXXXXXX"
          required
        />
      </label>
      {!isTeleBirrNumber && form.phone && (
        <p className="validation-error">Enter a valid 10-digit TeleBirr number.</p>
      )}
      <label>
        Area
        <input name="area" value={form.area} onChange={handleChange} required />
      </label>
      <button type="submit" disabled={!isTeleBirrNumber || !form.name || !form.area}>
        Place order
      </button>
    </form>
  );
}

export default OrderForm;