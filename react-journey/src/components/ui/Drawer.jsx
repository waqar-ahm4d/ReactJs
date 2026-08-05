function Drawer({ isOpen, onClose, children }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      ></div>
      <div
        className={`flex flex-col fixed top-0 right-0 h-full w-96 max-w-md bg-white shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {children}
      </div>
    </>
  );
}

export default Drawer;
