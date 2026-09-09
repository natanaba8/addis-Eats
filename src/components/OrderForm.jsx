import { useRef, useState } from "react";
import { useCart, selectCartTotal } from "../context/useCart";

const initialForm = {
  name: "",
  phone: "",
  area: "",
  notes: "",
};

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!/^09\d{8}$/.test(form.phone)) {
    errors.phone = "Enter a valid 10-digit TeleBirr number.";
  }

  if (!form.area) {
    errors.area = "Please choose a delivery area.";
  }

  if (form.notes.trim().length > 200) {
    errors.notes = "Notes must be 200 characters or fewer.";
  }

  return errors;
}

function OrderForm() {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fieldRefs = useRef({});
  const items = useCart((state) => state.items);
  const total = useCart(selectCartTotal);
  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (submitError) {
      setSubmitError("");
    }
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTouched({ name: true, phone: true, area: true, notes: true });

    if (!isValid) {
      const firstBadField = ["name", "phone", "area", "notes"].find(
        (field) => errors[field],
      );

      if (firstBadField && fieldRefs.current[firstBadField]) {
        fieldRefs.current[firstBadField].focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitError("TeleBirr payment failed. Please retry with a valid wallet number.");
      if (fieldRefs.current.phone) {
        fieldRefs.current.phone.focus();
      }
    }, 600);
  }

  return (
    <form className="order-form" onSubmit={handleSubmit} noValidate>
      <h2>Delivery details</h2>
      <p>Cart: {items.length} item{items.length === 1 ? "" : "s"}</p>
      <p>Checkout total: {total} ETB</p>
      {items.length > 0 && (
        <ul>
          {items.map((item) => <li key={item.id}>{item.name}</li>)}
        </ul>
      )}

      <label htmlFor="name">Name</label>
      <input
        id="name"
        ref={(element) => {
          fieldRefs.current.name = element;
        }}
        name="name"
        value={form.name}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="name"
        aria-invalid={touched.name && Boolean(errors.name)}
        aria-describedby={touched.name && errors.name ? "name-error" : undefined}
      />
      {touched.name && errors.name && (
        <p id="name-error" className="validation-error" role="alert">{errors.name}</p>
      )}

      <label htmlFor="phone">TeleBirr number</label>
      <input
        id="phone"
        ref={(element) => {
          fieldRefs.current.phone = element;
        }}
        name="phone"
        value={form.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        inputMode="numeric"
        placeholder="09XXXXXXXX"
        autoComplete="tel"
        aria-invalid={touched.phone && Boolean(errors.phone)}
        aria-describedby={touched.phone && errors.phone ? "phone-error" : undefined}
      />
      {touched.phone && errors.phone && (
        <p id="phone-error" className="validation-error" role="alert">{errors.phone}</p>
      )}

      <label htmlFor="area">Delivery area</label>
      <select
        id="area"
        ref={(element) => {
          fieldRefs.current.area = element;
        }}
        name="area"
        value={form.area}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={touched.area && Boolean(errors.area)}
        aria-describedby={touched.area && errors.area ? "area-error" : undefined}
      >
        <option value="">Select an area</option>
        <option value="Bole">Bole</option>
        <option value="Kazanchis">Kazanchis</option>
        <option value="Megenagna">Megenagna</option>
        <option value="Piassa">Piassa</option>
      </select>
      {touched.area && errors.area && (
        <p id="area-error" className="validation-error" role="alert">{errors.area}</p>
      )}

      <label htmlFor="notes">Notes (optional)</label>
      <textarea
        id="notes"
        ref={(element) => {
          fieldRefs.current.notes = element;
        }}
        name="notes"
        value={form.notes}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={3}
        placeholder="Any delivery notes?"
        aria-invalid={touched.notes && Boolean(errors.notes)}
        aria-describedby={touched.notes && errors.notes ? "notes-error" : undefined}
      />
      {touched.notes && errors.notes && (
        <p id="notes-error" className="validation-error" role="alert">{errors.notes}</p>
      )}

      {submitError && <p className="validation-error" role="alert">{submitError}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : `Place order - ${total} ETB`}
      </button>
    </form>
  );
}

export default OrderForm;