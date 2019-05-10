import React from "react";
import { IBoxOfficeRes } from "./shard-interfaces";
import { GlobalStyle } from "./global-styles";
import styled from "styled-components";
import Filter from "./components/Filter";
import moment from "moment";
import DateFilter from "./components/DateFilter";
import { Menu } from "antd";
import Chart1 from "./components/Chart1";
import Chart2 from "./components/Chart2";

const AppContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Movisualization = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin: 1rem 0 2rem 0;
`;

// const SearchBtn = styled.button`
//   padding: 2rem;
// `;

const MenuIcon = styled.i`
  margin-right: 0.5rem;
`;

const ChartTitle = styled.div`
  font-size: 2rem;
  margin: 1rem;
`;

const MyChart = styled.div`
  margin: 4rem;
`;

interface Props {}

interface State {
  dateRange: "daily" | "weekly";
  movieNm: string;
  fromDt: string;
  toDt: string;
  boxOfficeList: IBoxOfficeRes[];
  menu: "boxOffice" | "movie" | "person";
  myChart: any;
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dateRange: "daily",
      movieNm: "",
      fromDt: moment(Date.now())
        .subtract(15, "days")
        .format("YYYY-MM-DD"),
      toDt: moment(Date.now())
        .subtract(2, "days")
        .format("YYYY-MM-DD"),
      boxOfficeList: [],
      menu: "boxOffice",
      myChart: null
    };
  }

  componentDidMount = async () => {};

  componentDidUpdate = async (prevProps: Props, prevState: State) => {
    if (
      prevState.fromDt !== this.state.fromDt ||
      prevState.toDt !== this.state.toDt
    ) {
    }
  };

  // shouldComponentUpdate = (nextProps: Props, nextState: State) => {
  //   console.log(nextState);
  //   return nextState !== this.state;
  // };

  changeDateRange = (dateRange: "daily" | "weekly") => {
    console.log(dateRange);
    this.setState({ dateRange });
  };

  changeRangePicker = (date: any, dateString: string[]) => {
    console.log(date, dateString);
    const fromDt = dateString[0];
    const toDt = dateString[1];
    this.setState({ fromDt, toDt });
  };

  clickMenu = (e: any) => {
    this.setState({
      menu: e.key
    });
  };

  render() {
    const { fromDt, toDt, menu } = this.state;
    return (
      <>
        <GlobalStyle />
        <Menu onClick={this.clickMenu} selectedKeys={[menu]} mode="horizontal">
          <Menu.Item key="boxOffice">
            <MenuIcon className="fas fa-ticket-alt" />
            Box Office
          </Menu.Item>
          <Menu.Item key="movie">
            <MenuIcon className="fas fa-film" />
            Movie
          </Menu.Item>
          <Menu.Item key="person">
            <MenuIcon className="far fa-user" />
            Person
          </Menu.Item>
        </Menu>
        <AppContainer>
          <Movisualization>Movisualization</Movisualization>
          <Filter>
            <DateFilter
              changeDateRange={this.changeDateRange}
              changeRangePicker={this.changeRangePicker}
              fromDt={fromDt}
              toDt={toDt}
            />
          </Filter>
          <ChartTitle>{this.state.movieNm}</ChartTitle>
          <Chart2 />
          <Chart1 />
          <MyChart id="myChart" />
        </AppContainer>
      </>
    );
  }
}
