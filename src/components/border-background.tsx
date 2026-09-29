const BorderBackground = () => {
  return (
    <div
      className="
  absolute top-4 bottom-4 right-4 left-4 
  border border-[#C9A961]/38 pointer-events-none

  before:content-[''] before:absolute before:w-3.5 before:h-3.5 
  before:border before:border-[rgb(201_169_97/80%)] 
  before:border-r-0 before:border-b-0 
  before:-left-px before:-top-px

  after:content-[''] after:absolute after:w-3.5 after:h-3.5 
  after:border after:border-[rgb(201_169_97/80%)] 
  after:border-l-0 after:border-t-0 
  after:-right-px after:-bottom-px
"
    ></div>
  );
};

export default BorderBackground;
