import { useTheme } from "../context/useTheme";

function Card({children}) {
  const { theme } = useTheme();
  return (
    <div data-theme={theme}>
      {children}
    </div>
  )
}

export default Card
