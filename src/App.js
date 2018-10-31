import React, { useState } from "react";
import styled from "styled-components";

const Header = styled.h1`
  font-size: 1.5rem;
`;

const Item = React.memo(props => <li>{props.text}</li>);

const List = props => (
  <ul>
    {[...new Array(props.count)].map((_, i) => (
      <Item key={i} text={props.text} />
    ))}
  </ul>
);

const InputText = styled.input.attrs({ type: "text" })`
  height: 1.5rem;
  min-width: 10rem;
  font-size: 1.2rem;
`;

const App = () => {
  const [enabledTimeSlicing, setEnabledTimeSlicing] = useState(false);
  const [repeatCount, setRepeatCount] = useState(1000);
  const [inputText, setInputText] = useState("");
  const [listText, setListText] = useState("");

  const wrapper = enabledTimeSlicing ? requestAnimationFrame : cb => cb();

  return (
    <section>
      <Header>TimeSlicing App</Header>
      <div>
        <label>
          <input
            type="range"
            min={100}
            max={10000}
            step={100}
            value={repeatCount}
            onChange={({ target: { value } }) => setRepeatCount(+value)}
          />
          (Repeat Count: {repeatCount})
        </label>
        &nbsp;/&nbsp;
        <label>
          <input
            type="checkbox"
            checked={enabledTimeSlicing}
            onChange={({ target: { checked } }) =>
              setEnabledTimeSlicing(checked)
            }
          />
          Enable TimeSlicing
        </label>
      </div>
      <p>Input some text!</p>
      <InputText
        value={inputText}
        onChange={({ target: { value } }) => {
          setInputText(value);
          wrapper(() => setListText(value));
        }}
      />
      {listText && <List text={listText} count={repeatCount} />}
    </section>
  );
};

export default App;
