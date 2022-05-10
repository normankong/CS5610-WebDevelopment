import { render, screen } from "@testing-library/react";
import Spinner from "../Spinner";
import { MemoryRouter } from "react-router-dom";

test("Check Tag exist", async () => {
  

  const { container } = render(
    <MemoryRouter>
      <Spinner />
    </MemoryRouter>
  );
  screen.getByRole("status");

});
