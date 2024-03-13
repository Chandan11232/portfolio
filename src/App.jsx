import React, { useState, useEffect, useRef } from "react";
import Typed from "typed.js";
import { FaMoon } from "react-icons/fa";
import { document } from "postcss";

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Programmer", "Web Developer"],
      typeSpeed: 70,
      loop: true,
      backSpeed: 60,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const globalThemeClasses = isDarkTheme
    ? "bg-black/80 text-white"
    : "bg-white text-black";

  return (
    <div className={globalThemeClasses}>
      <section className="w-full items-center h-screen ">
        <header className="w-[80%] p-3 mx-[10%] flex justify-between items-center gap-40">
          <h1 className="text-5xl font-bold mx-auto hover:text-orange-500 cursor-pointer duration-500 mt-5 md:ml-0 portfolio-text">
            My Portfolio
          </h1>

          <button
            onClick={changeTheme}
            className="bg-black mt-3 p-2 rounded-full cursor-pointer"
          >
            <FaMoon
              className=" text-white rounded-full"
              onClick={setIsDarkTheme}
              size={25}
            />
          </button>
          <ul className="flex gap-[40px] hidden" id="navs">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Work</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </header>
        <div className="h-[400px] flex items-center justify-center">
          <div className="items-center text-center text-md">
            <h1 className="mb-6 sm:text-5xl font-semibold text-4xl">I am a</h1>
            <h1 className="text-7xl font-bold text-orange-500">
              <span ref={el} />
            </h1>
            <h1 className="mt-10 text-2xl">let's break the matrix</h1>
            <button className="m-3 text-white bg-orange-500 rounded-xl hover:shadow-xl hover:scale-110 duration-500 px-4 py-2">
              Join Us
            </button>
            <button className="m-3 text-white bg-orange-500 rounded-xl hover:shadow-xl hover:scale-110 duration-500 hover:transition-4 px-4 py-2">
              Let's Chat
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
