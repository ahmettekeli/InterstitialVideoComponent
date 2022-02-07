/// <reference types="cypress"/>

describe("Video", () => {
  const videoStartedMessage = "Video has started.";
  const videoPausedMessage = "Video has paused.";
  const videoWatched2SecondsMessage =
    "Video has been watched for at least 2 seconds.";
  const video25PercentMessage = "Video has reached  25 %";
  const video50PercentMessage = "Video has reached  50 %";
  const video75PercentMessage = "Video has reached  75 %";
  const video100PercentMessage = "Video has reached  100 %";

  beforeEach(() => {
    cy.visit("http://localhost:3000", {
      onBeforeLoad(win) {
        cy.stub(win.console, "log").as("consoleLog");
      },
    }).wait(500);
  });

  it("no auto play", () => {
    cy.get("video")
      .should("have.prop", "paused", true)
      .and("have.prop", "ended", false);
  });

  it("does not play video if less than 50% of the video element is in viewport", () => {
    const viewportHeight = Cypress.config("viewportHeight");
    return cy
      .get("video")
      .scrollIntoView({
        offset: { top: -viewportHeight, left: 0 },
        duration: 100,
      })
      .should("have.prop", "paused", true)
      .and("have.prop", "ended", false);
  });

  it("plays video when 50% of the video element is in viewport ", () => {
    return cy.get("video").then((video) => {
      const viewportHeight = Cypress.config("viewportHeight");
      //going over 50% just a bit to make sure rounding in the calculation doesn't cause any trouble. 
      const top = -viewportHeight + video.height() / 2 + 1;
      cy.get("video")
        .scrollIntoView({
          offset: { top, left: 0 },
          duration: 100,
        })
        .should("have.prop", "paused", false)
        .and("have.prop", "ended", false);
    });
  });

  it("pauses video when 50% of the video element is not in viewport", () => {
    return cy.get("video").then((video) => {
        const top = video.height() + 1;
      cy.get("video")
        .scrollIntoView({
          offset: { top, left: 0 },
          duration: 100,
        })
        .should("have.prop", "paused", true)
        .and("have.prop", "ended", false);
    });
  });

  it("triggers video has played for 2 seconds action.", () => {
    return cy.get("video").then((video) => {
      video[0].playbackRate = 4;
      video[0].play();
      cy.get("video", { timeout: 500 });
      cy.get("@consoleLog").should(
        "be.calledWith",
        videoWatched2SecondsMessage
      );
    });
  });

  it("trigger video has played action.", () => {
    return cy.get("video").then((video) => {
      const viewportHeight = Cypress.config("viewportHeight");
      //going over 50% just a bit to make sure rounding in the calculation doesn't cause any trouble. 
      const top = -viewportHeight + video.height() / 2 + 1;
      cy.get("video").scrollIntoView({
        offset: { top, left: 0 },
        duration: 100,
      });
      cy.get("@consoleLog").should("be.calledWith", videoStartedMessage);
    });
  });

  it("triggers video has paused action.", () => {
    return cy.get("video").then((video) => {
      cy.get("video").scrollIntoView({
        offset: { top: video.height() + 1, left: 0 },
        duration: 100,
      });
      cy.get("@consoleLog").should("be.calledWith", videoPausedMessage);
    });
  });

  it("mutes/unmutes when clicking mute/unmute buttons.",()=>{
    cy.get('[data-testid="mute"]').click();
    cy.get("video").scrollIntoView({ duration: 100 }).should("have.prop", "muted", false);

    cy.get('[data-testid="mute"]').click();
    cy.get("video").scrollIntoView({ duration: 100 }).should("have.prop", "muted", true);
  })

//   it("triggers video has reached 25% of it's duration action.", () => {});
//   it("triggers video has reached 50% of it's duration action.", () => {});
//   it("triggers video has reached 75% of it's duration action.", () => {});
//   it("triggers video has reached 100% of it's duration action.", () => {});
});
