import { useMemo, useReducer } from "react";
import { CartContext } from "./CartContextValue";
import { cartReducer } from "./cartReducer";

export function CartProvider({ children }) {
	const [items, dispatch] = useReducer(cartReducer, []);
	const total = items.reduce((sum, item) => sum + item.price, 0);
	const value = useMemo(
		// Keeps context consumers from rerendering when the provider renders
		// without changing its cart state or actions.
		() => ({ items, dispatch, total }),
		[items, total],
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
