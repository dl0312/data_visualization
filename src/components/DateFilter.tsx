import React from "react";
import styled from "styled-components";
import { Select, DatePicker, Radio } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
const Option = Select.Option;

const DateFilterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Subtitle = styled.div`
  font-weight: 700;
  margin-right: 0.5rem;
`;

const selectStyle = {
  marginRight: "0.5rem",
  width: 120
};

const radioStyle = {
  marginRight: "0.5rem"
};

interface Props {
  changeDateRange: (dateRange: "daily" | "weekly") => void;
  changeTargetDate: (date: any, dateString: string) => void;
  changeRangePicker: (date: any, dateString: any) => void;
  fromDt: string;
  toDt: string;
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
    const displayFormat = "YYYY/MM/DD";
    const { changeDateRange, changeRangePicker, fromDt, toDt } = this.props;
    return (
      <DateFilterContainer>
        <Subtitle>기간</Subtitle>
        <Select
          onChange={changeDateRange}
          defaultValue="daily"
          style={selectStyle}
        >
          <Option value="daily">일간</Option>
          <Option value="weekly">주간</Option>
        </Select>
        <Radio.Group
          style={radioStyle}
          defaultValue="manual"
          buttonStyle="solid"
        >
          <Radio.Button value="whole">전체</Radio.Button>
          <Radio.Button value="oneMonth">1개월</Radio.Button>
          <Radio.Button value="threeMonth">3개월</Radio.Button>
          <Radio.Button value="oneYear">1년</Radio.Button>
          <Radio.Button value="manual">직접입력</Radio.Button>
        </Radio.Group>
        <RangePicker
          onChange={changeRangePicker}
          defaultValue={[moment(fromDt, dateFormat), moment(toDt, dateFormat)]}
          format={displayFormat}
        />
      </DateFilterContainer>
    );
  }
}
