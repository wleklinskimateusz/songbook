import { render, screen } from "@testing-library/react";
import { Profile } from "./Profile";
import { MockUser } from "../../testing";

describe("Profile", () => {
  const setup = () => {
    render(<Profile user={MockUser} />);
    const profileWrapper = screen.getByTestId("profile");
    return { profileWrapper };
  };
  it("render component correctly", async () => {
    const { profileWrapper } = setup();
    expect(profileWrapper).toBeInTheDocument();
  });

  it("show menu when clicked", async () => {
    const { profileWrapper } = setup();
    const menuButton = profileWrapper.childNodes[0] as HTMLButtonElement;
    menuButton.click();
    const createSongList = await screen.findByText("Create Songlist");
    expect(createSongList).toBeInTheDocument();
  });
});
