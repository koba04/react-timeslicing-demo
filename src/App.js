import React from "react";
import styled from "styled-components";

const Header = styled.h1`
  font-size: 1.5rem;
`;

class List extends React.PureComponent {
  render() {
    return (
      <ul>
        {[...new Array(this.props.count)].map((_, i) => (
          <li key={i}>{this.props.text}</li>
        ))}
      </ul>
    );
  }
}

const InputText = styled.input.attrs({ type: "text" })`
  height: 1.5rem;
  min-width: 10rem;
  font-size: 1.2rem;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabledTimeSlicing: false,
      repeatCount: 1000,
      inputText: "",
      listText: ""
    };
  }
  render() {
    const { inputText, listText, repeatCount, enabledTimeSlicing } = this.state;
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
              onChange={({ target: { value } }) =>
                this.setState(() => ({ repeatCount: +value }))
              }
            />
            (Repeat Count: {repeatCount})
          </label>
          &nbsp;/&nbsp;
          <label>
            <input
              type="checkbox"
              checked={enabledTimeSlicing}
              onChange={({ target: { checked } }) =>
                this.setState(() => ({ enabledTimeSlicing: checked }))
              }
            />
            Enable TimeSlicing
          </label>
        </div>
        <p>Input some text!</p>
        <InputText
          value={inputText}
          onChange={({ target: { value } }) => {
            this.setState(() => ({ inputText: value }));
            const wrapper = enabledTimeSlicing
              ? requestAnimationFrame
              : cb => cb();
            wrapper(() => {
              this.setState(() => ({ listText: value }));
            });
          }}
        />
        <List text={listText} count={repeatCount} />
      </section>
    );
  }
}
