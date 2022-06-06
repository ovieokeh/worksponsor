type MenuIconProps = {
  isToggled: boolean;
  onToggle: React.MouseEventHandler;
};

export default function MenuIcon({ isToggled, onToggle }: MenuIconProps) {
  const barClassname = `menu-icon__bar ${
    isToggled ? "menu-icon__bar--toggled" : ""
  }`.trim();

  return (
    <button
      className="menu-icon"
      type="button"
      aria-label="Menu icon"
      onClick={onToggle}
    >
      <span className={barClassname}></span>
      <span className={barClassname}></span>
      <span className={barClassname}></span>
    </button>
  );
}
