import { render, screen } from "@testing-library/react";
import Feature from "../../pages/prelogin/Feature";
import { MemoryRouter } from "react-router-dom";

jest.mock("../StockChart.js", () => ({
  StockChart: ({}) => {return <>Mocked</>},
})); 

test("Check Tag exist", async () => {

  let features = [];

  const { container } = render(
    <MemoryRouter>
      <Feature features={features} />
    </MemoryRouter>
  );
  screen.getByText("Previous")  
  screen.getByText("Next")
});
