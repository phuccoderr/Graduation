const BorderBackground = () => {
  return (
    <div
      className="
  absolute top-4 bottom-4 right-4 left-4 
  border border-[#8bdcff]/40 pointer-events-none

  before:content-[''] before:absolute before:w-3.5 before:h-3.5 
  before:border before:border-[#8bdcff] 
  before:border-r-0 before:border-b-0 
  before:-left-px before:top-0

  after:content-[''] after:absolute after:w-3.5 after:h-3.5 
  after:border after:border-[#8bdcff] 
  after:border-l-0 after:border-t-0 
  after:-right-px after:bottom-0
"
    ></div>
  );
};

export default BorderBackground;
