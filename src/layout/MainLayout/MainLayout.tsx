import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div
      style={{
        backgroundImage: "url('/img/ng.jpg')"
      }}
      className="w-dvw h-dvh bg-center bg-cover"
    >
      <Outlet />
    </div>
  )
}

export default MainLayout
