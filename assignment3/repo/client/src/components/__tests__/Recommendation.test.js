import { render, screen } from "@testing-library/react";
import Recommendation from "../../pages/prelogin/Recommendation";
import { MemoryRouter } from "react-router-dom";

test("Check Tag exist", async () => {

  let recommendations = [];
  recommendations.push({ id : 1, name : "Mock Name", symbol : "Mock Symbol", text : "Mock Text" });

  const { container } = render(
    <MemoryRouter>
      <Recommendation recommendations={recommendations} />
    </MemoryRouter>
  );
  
  let text = container.querySelector(".card-text");
  expect(text.textContent).toBe("Mock Text");
  let symbol = container.querySelector(".card-title.h5");
  expect(symbol.textContent).toBe("  #Mock Symbol");
});
