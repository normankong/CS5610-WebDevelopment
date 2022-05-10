import { render, screen } from "@testing-library/react";
import SimpleTable from "../SimpleTable";
import { MemoryRouter } from "react-router-dom";

test("Check Tag exist", async () => {
  
  const list = [];
  list.push({ key : "key1", value : "value1" });
  list.push({ key : "key2", value : "value2" });

  const { container } = render(
    <MemoryRouter>
      <SimpleTable list={list} />
    </MemoryRouter>
  );
  screen.getByText("key1");
  screen.getByText("key2");
  screen.getByText("value1");
  screen.getByText("value2");

});
