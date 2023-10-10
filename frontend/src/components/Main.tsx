import { useOutletContext } from 'react-router-dom'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'

type Props = {
  title: string
  children: React.ReactNode
  navLinks?: React.ReactNode
}

const Main = ({ title, children, navLinks }: Props) => {
  const { showSidebar, setShowSidebar } = useOutletContext<{
    showSidebar: boolean
    setShowSidebar: (showSidebar: boolean) => {}
  }>()

  return (
    <main className=" flex flex-col h-screen w-screen">
      <div
        className={`mt-4 text-base-content px-6 h-14 flex justify-between items-center `}
      >
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="flex gap-4 items-center min-w-[200px] py-2 cursor-pointer"
        >
          <span className=" flex gap-4">
            <HiOutlineMenuAlt1 size={30} />
            <h2 className="font-bold text-xl ">{title}</h2>
          </span>
        </div>
        {navLinks}
        <p>Logout</p>
      </div>
      <div className="h-[calc(100vh-56px)] w-full flex">{children}</div>
    </main>
  )
}

export default Main
