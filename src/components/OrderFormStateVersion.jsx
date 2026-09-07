import { useState } from "react";

function OrderFormStateVersion() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");

  return (
    <form>
      <input aria-label="State version name" value={name} onChange={(event) => setName(event.target.value)} />
      <input aria-label="State version phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
      <input aria-label="State version area" value={area} onChange={(event) => setArea(event.target.value)} />
    </form>
  );
}

export default OrderFormStateVersion;
