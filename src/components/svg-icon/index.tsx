interface IProps {
  icon: string
  style?: React.CSSProperties
  className?: string
}
const SvgIcon: React.FC<IProps> = props => {
  return (
    <svg className={`icon svg-icon ${props.className || ''}`} aria-hidden="true" style={props.style}>
      <use xlinkHref={`#${props.icon}`}></use>
    </svg>
  )
}

export default SvgIcon
