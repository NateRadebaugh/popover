import React, { useRef, useState } from "react";
import Popover from "../src/index";

export function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const targetRef = useRef();

  return (
    <div>
      <textarea placeholder="resize me to move stuff around" />

      <input
        ref={targetRef}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      />
      {isOpen && (
        <Popover targetRef={targetRef}>
          <div
            style={{
              border: "solid 1px",
              padding: 10,
              background: "white",
              width: 400
            }}
          >
            <p>Popover content</p>
          </div>
        </Popover>
      )}
    </div>
  );
}
