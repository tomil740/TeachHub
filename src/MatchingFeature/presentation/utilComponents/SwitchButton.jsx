
function SwitchButton({ isMatchingView, setIsMatchingView,resListIndex }){

    function onSetMatchingView(){
        setIsMatchingView(true);
        resListIndex(0);
    }
    function onSetMatchingViewFalse() {
      setIsMatchingView(false);
    }

  return (
    <div className="relative flex w-full max-w-md">
      <button
        onClick={() => setIsMatchingView(false)}
        className={`flex-1 rounded-l-lg py-3 text-center transition-all duration-300 ${
          !isMatchingView
            ? "bg-blue-600 text-white shadow-md"
            : "bg-gray-100 text-gray-500 opacity-50"
        }`}
      >
        Show All Users
      </button>
      <button
        onClick={() => onSetMatchingView()}
        className={`flex-1 rounded-r-lg py-3 text-center transition-all duration-300 ${
          isMatchingView
            ? "bg-blue-600 text-white shadow-md"
            : "bg-gray-100 text-gray-500 opacity-50"
        }`}
      >
        Show Matched View
      </button>
    </div>
  );
};

export default SwitchButton;
