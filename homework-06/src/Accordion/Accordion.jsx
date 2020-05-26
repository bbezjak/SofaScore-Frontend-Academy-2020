import React from "react";
import { useIsOpen } from "../shared/UseIsOpen";
import { ThemeContext, ThemeConsumer } from "../ThemeProvider/ThemeProvider";

import "./Accordion.css";

export function Accordion() {
  const { open, clickHandler } = useIsOpen();
  const ref = React.useRef(null);
  const contentRef = React.useRef(null);

  const contentHeight = 100;
  //const [theme, setTheme] = React.useContext(/*TODO dodaj kontekst*/);

  /*
    TODO Ovaj dio s dinamičkim dohvaćanjem heighta mi nije jasan da se postavim na trepavice..... :`(
  */

  //ovo služi samo za test refova.....
  const testRefHeight = React.useCallback(() => {
    if (ref.current) {
      const height = ref.current.getBoundingClientRect().height;

      console.log("Content element height =", height);
    }

    if (contentRef.current) {
      const height = contentRef.current.getBoundingClientRect().height;

      console.log("Content element height =", height);
    }
  }, [ref, contentRef]);

  return (
    <ThemeConsumer>
      {({ themeSelected }) => {
        return (
          <div
            id="accordion"
            ref={ref}
            className={`${themeSelected} accordion`}
          >
            <button onClick={testRefHeight}>getHeight</button>
            <Header click={clickHandler}></Header>
            <Content
              ref={contentRef}
              click={clickHandler}
              isOpen={open}
              contentHeight={contentHeight}
            />
          </div>
        );
      }}
    </ThemeConsumer>
  );
}

function Header({ click }) {
  return (
    <div id="header_elem">
      <h5 onClick={click}>Press to open accordion</h5>
    </div>
  );
}

const Content = React.forwardRef(({ click, isOpen, contentHeight }, ref) => {
  const { themeSelected } = React.useContext(ThemeContext);

  return (
    <div
      ref={ref}
      id="content_elem"
      className={`${themeSelected} content`}
      style={{
        overflow: "hidden",
        height: isOpen ? contentHeight : 0,
        opacity: isOpen ? 1 : 0,
      }}
    >
      <span>Content items</span>
      <button onClick={click}>Hide</button>
    </div>
  );
});
