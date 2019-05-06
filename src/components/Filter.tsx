import React from "react";
import styled from "styled-components";
import DateFilter from "./DateFilter";

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchBtn = styled.button`
  padding: 2rem;
`;

interface Props {
  changeDateRange: (dateRange: "daily" | "weekly") => void;
  changeTargetDate: (date: any, dateString: string) => void;
  targetDt: string;
}

interface State {}

export default class Filter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { changeDateRange, changeTargetDate, targetDt } = this.props;
    return (
      <FilterContainer>
        <DateFilter
          changeDateRange={changeDateRange}
          changeTargetDate={changeTargetDate}
          targetDt={targetDt}
        />
        <SearchBtn>조회하기</SearchBtn>
      </FilterContainer>
    );
  }
}
