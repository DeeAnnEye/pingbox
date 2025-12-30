import "./App.css";

const Header = () => {
  return (
    <div className="header-row">
    <span className="heading">PingBox</span>
    <div style={{ WebkitAppRegion: "no-drag" } as any}>
      <button
        className="header-btn"
        onClick={() => window.electronAPI.minimize()}
      >
        -
      </button>
      <button
        className="header-btn"
        onClick={() => window.electronAPI.close()}
      >
        X
      </button>
    </div>
  </div>
  )
}

export default Header