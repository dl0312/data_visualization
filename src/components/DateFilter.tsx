import React from "react";
import styled from "styled-components";
import { Select, DatePicker } from "antd";
import moment from "moment";
const Option = Select.Option;

const DateFilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  changeDateRange: (dateRange: "daily" | "weekly") => void;
  changeTargetDate: (date: any, dateString: string) => void;
  targetDt: string;
}

interface State {}

export default class DateFilter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  onChange = (date: any, dateString: string) => {
    console.log(date, dateString);
  };

  render() {
    const dateFormat = "YYYYMMDD";
    const displayFormat = "YYYYMMDD";
    const { changeDateRange, changeTargetDate, targetDt } = this.props;
    return (
      <DateFilterContainer>
        <div>기간</div>
        <Select
          onChange={changeDateRange}
          defaultValue="daily"
          style={{ width: 120 }}
        >
          <Option value="daily">일간</Option>
          <Option value="weekly">주간</Option>
        </Select>
        <DatePicker
          onChange={changeTargetDate}
          defaultValue={moment(targetDt, dateFormat)}
          format={displayFormat}
        />
      </DateFilterContainer>
    );
  }
}
