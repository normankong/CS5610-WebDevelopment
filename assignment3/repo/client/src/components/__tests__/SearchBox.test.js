import { render, screen } from "@testing-library/react";
import SearchBox from "../SearchBox";
import { MemoryRouter } from "react-router-dom";

test("Check Tag exist", async () => {
  
  const handleSearch = jest.fn();

  const { container } = render(
    <MemoryRouter>
      <SearchBox
        handleSearch={handleSearch}
      />
    </MemoryRouter>
  );
  const tag = screen.getByText("Search");

});
