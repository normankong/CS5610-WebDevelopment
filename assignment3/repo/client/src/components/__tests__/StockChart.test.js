import { render, screen } from "@testing-library/react";
import StockChart from "../StockChart";
import { MemoryRouter } from "react-router-dom";

jest.mock('react-chartjs-2', () => ({
  Line: ({ options, data }) => <>Mocked</>,
})); 

test("Check Tag exist", async () => {
  const name = "Stock Name";
  const symbol = "Stock Symbol";
  const data = {
    history: [
      {
        date: "2022-04-29",
        open: 161.84,
        high: 166.2,
        low: 157.25,
        close: 157.65,
        volume: 1.31588338e8,
        sma: 165.8368005,
      },
      {
        date: "2022-04-28",
        open: 159.25,
        high: 164.52,
        low: 158.93,
        close: 163.64,
        volume: 1.15594398e8,
        sma: 166.13480056,
      },
      {
        date: "2022-04-27",
        open: 155.91,
        high: 159.79,
        low: 155.38,
        close: 156.57,
        volume: 8.7890593e7,
        sma: 166.31780042,
      },
    ],
  };

  const { container } = render(
    <MemoryRouter>
      <StockChart symbol={symbol} data={data} name={name} />
    </MemoryRouter>
  );
  screen.getByText("Mocked");
});
