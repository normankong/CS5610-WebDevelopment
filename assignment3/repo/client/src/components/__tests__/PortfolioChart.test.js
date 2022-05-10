import { render, screen } from "@testing-library/react";
import PortfolioChart from "../../pages/dashboard/PortfolioChart";
import { MemoryRouter } from "react-router-dom";

jest.mock('react-chartjs-2', () => ({
  Line: ({ options, data }) => <>Mocked</>,
})); 

test("Check Tag exist", async () => {
  const portfolio = {
    historical: [ 
      {date : "2020-01-01", price : 100} ,
      {date : "2020-01-02", price : 200} 
    ]
  };
  const { container } = render(
    <MemoryRouter>
      <PortfolioChart portfolio={portfolio}  />
    </MemoryRouter>
  );
  screen.getByText("Mocked");
});
