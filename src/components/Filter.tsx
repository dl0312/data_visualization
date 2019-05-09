import React from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

interface Props {}

interface State {}

export default class Filter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <FilterContainer>{this.props.children}</FilterContainer>;
  }
}
