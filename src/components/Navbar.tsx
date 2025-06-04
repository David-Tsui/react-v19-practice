import { NavLink } from "react-router-dom"

function Navbar() {
  const navItems = [
    { name: "首頁", path: "/" },
    { name: "關於我們", path: "/about" },
    { name: "聯絡我們", path: "/contact" },
    { name: "靈感備忘錄", path: "/memo" },
  ]
  const NavLinks = navItems.map((item) => (
    <li key={item.name} className="nav-list-item">
      <NavLink
        to={item.path}
        className={
          ({ isActive }: { isActive: boolean }) => (isActive ? "nav-item nav-item--active" : "nav-item")
        }
      >
        {item.name}
      </NavLink>
    </li>
  ))

  return (
    <header>
      <nav>
        <ul>
          {NavLinks}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
