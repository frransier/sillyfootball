/** @jsx jsx */
import { jsx } from "theme-ui"
import Centered from "../atoms/centered"
import { FaStar, FaStarHalfAlt } from "react-icons/fa"

const Rate = ({ rate, color, size }) => {
  if (rate === 1)
    return (
      <Centered>
        <FaStar sx={{ mr: 3, color: color || "red" }} size={size || 12} />
      </Centered>
    )
  if (rate === 1.5)
    return (
      <Centered>
        <FaStar sx={{ mr: 3, color: color || "red" }} size={size || 12} />
        <FaStarHalfAlt
          sx={{ mr: 3, color: color || "red" }}
          size={size || 12}
        />
      </Centered>
    )
  if (rate === 2)
    return (
      <Centered>
        <FaStar sx={{ mr: 3, color: color || "red" }} size={size || 12} />
        <FaStar sx={{ mr: 3, color: color || "red" }} size={size || 12} />
      </Centered>
    )
  if (rate === 3)
    return (
      <Centered>
        <FaStar sx={{ mr: 3, color: color || "red" }} size={size || 12} />
        <FaStar sx={{ mr: 3, color: color || "red" }} size={size || 12} />
        <FaStar sx={{ mr: 3, color: color || "red" }} size={size || 12} />
      </Centered>
    )
}

export default Rate
