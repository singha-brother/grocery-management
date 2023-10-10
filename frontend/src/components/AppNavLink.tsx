import { NavLink } from 'react-router-dom'

const AppNavLink = ({ text, link }: { text: string; link: string }) => {
  const activeClass =
    'px-4 py-2 rounded-full bg-primary text-primary-content shadow-lg duration-300'
  const inactiveClass = 'px-4 text-warning-content duration-300'
  return (
    <NavLink
      to={link}
      className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
    >
      {text}
    </NavLink>
  )
}

export default AppNavLink
