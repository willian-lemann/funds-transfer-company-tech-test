import { render } from "@testing-library/react";

import { describe, expect, it } from "vitest";
import { Input } from "@/components/ui/input";

describe("Test input component", () => {
  it("should have border error when data-[error=true] is passed", () => {
    const { getByTestId } = render(<Input data-error={true} />);

    const input = getByTestId("input-amount");

    expect(input.classList).toBe("border-input-error");
  });
});
