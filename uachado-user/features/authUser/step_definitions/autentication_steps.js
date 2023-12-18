import { Before, After, Given, When, Then } from "@cucumber/cucumber";
import { Builder, By, until } from "selenium-webdriver";
import dotenv from "dotenv";


let driver;
let vars;
dotenv.config({ path: ".env" });

Before(async function () {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.manage().window().setRect({ width: 1280, height: 720 });
  const username = process.env.VITE_USERNAME;
  const password = process.env.VITE_PASSWORD;
  vars = { username, password };
});

After(async function () {
  await driver.quit();
});

Given(
  "I am on the landing page as a not authenticated user",
  async function () {
    await driver.get("http://localhost/");
  }
);

When(
  "I click on the button to go to the home page to login",
  async function () {
    await driver.findElement(By.css(".-ml-2")).click();
  }
);

When("I navigate to the login page", { timeout: 20 * 1000 }, async function () {
  // Wait for the button to be visible and clickable
  let button = await driver.wait(
    until.elementLocated(By.css("button.btn.btn-ghost.btn-circle")),
    10000
  );
  await driver.wait(until.elementIsVisible(button), 10000);

  // Click the button
  await button.click();
  // Wait for the navigation to complete and for the new page to load.
  // You might need to adjust the URL here to the one you expect to be on after the click.
  await driver.wait(until.urlContains("cognito"), 20000);
});

When(
  "I enter my credentials and login",
  { timeout: 20 * 1000 },
  async function () {
    // Wait for the username input to be visible
    await driver.wait(
      async () => {
        const username_input = await driver.findElement(
          By.css(
            "div:nth-child(2) > div > div > .cognito-asf #signInFormUsername"
          )
        );
        return await username_input.isDisplayed();
      },
      20000,
      "Username input is not visible"
    );

    // Input the username
    const username_input = await driver.findElement(
      By.css("div:nth-child(2) > div > div > .cognito-asf #signInFormUsername")
    );
    await username_input.sendKeys(vars.username);

    // Repeat the process for the password input
    // Wait for the password input to be visible
    await driver.wait(
      async () => {
        const password_input = await driver.findElement(
          By.css(
            "div:nth-child(2) > div > div > .cognito-asf #signInFormPassword"
          )
        );
        return await password_input.isDisplayed();
      },
      20000,
      "Password input is not visible"
    );

    // Input the password
    const password_input = await driver.findElement(
      By.css("div:nth-child(2) > div > div > .cognito-asf #signInFormPassword")
    );
    await password_input.sendKeys(vars.password);

    // Click the login button
    const signInButton = await driver.findElement(
      By.css("div:nth-child(2) > div > div > .cognito-asf > .btn")
    );
    await signInButton.click();
  }
);

When("I should be on the home page", { timeout: 20 * 1000 }, async function () {
  await driver.wait(async () => {
    const currentUrl = await driver.getCurrentUrl();
    return currentUrl.endsWith("/home");
  }, 20000);
});

Then("I should be logged in", async function () {
  let button = await driver.wait(
    until.elementLocated(By.css("button.btn.btn-ghost.btn-circle")),
    10000
  );
  await driver.wait(until.elementIsVisible(button), 10000);

  // Click the button
  await button.click();

  let logginText = await driver.wait(
    until.elementLocated(By.css(".text-sm")),
    10000
  );

  let loginText = await logginText.getText();

  if (await !loginText.includes("Fidalgo")) {
    throw new Error(
      "Login is not correct, should be Logged in, not a " + logginText + " a"
    );
  }
});

When("I click on the profile icon", async function () {
  await driver.findElement(By.css("button.btn.btn-ghost.btn-circle")).click();
});

When("I click on the logout button", async function () {
  await driver.findElement(By.css(".button")).click();
});


When("I go to the dashboard page", async function () {
  let button = await driver.wait(
    until.elementLocated(By.css("label.btn.btn-ghost.btn-circle")),
    10000
  );

  await driver.wait(until.elementIsVisible(button), 10000);

  await button.click();

  let dashboard = await driver.wait(
    until.elementLocated(
      By.className(
        "text-xl normal-case btn btn-ghost rounded-box w-full justify-start items-center mt-1"
      )
    ),
    10000
  );

  dashboard.click();
});

Then(
  "I should see the item I want to mark as found and mark it",
  { timeout: 20 * 1000 },
  async function () {
    let itemClaim = await driver.wait(
      until.elementLocated(By.css("tr:nth-child(1) .btn-neutral")),
      15000
    );

    await driver.wait(until.elementIsVisible(itemClaim), 10000);

    await itemClaim.click();

    let email = await driver.wait(
      until.elementLocated(By.name("email")),
      10000
    );

    email.sendKeys("dummyemail.com");

    let closeButton = await driver.wait(
      until.elementLocated(By.css(".btn-primary")),
      10000
    );

    closeButton.click();
  }
);

When("I go to the add item page", async function () {
  let button = await driver.wait(
    until.elementLocated(By.css("label.btn.btn-ghost.btn-circle")),
    10000
  );

  await driver.wait(until.elementIsVisible(button), 10000);

  await button.click();

  let addItem = await driver.wait(
    until.elementLocated(
      By.className(
        "text-xl normal-case btn btn-ghost rounded-box w-full justify-start items-center"
      )
    ),
    10000
  );

  addItem.click();
});

Then(
  "I should be able to add an item to my DropOffPoint",
  { timeout: 20 * 1000 },
  async function () {
    let description = await driver.wait(
      until.elementLocated(By.name("description")),
      10000
    );

    description.sendKeys("description");

    let tag = await driver.wait(until.elementLocated(By.name("tag")), 10000);

    await tag.click();

    let tagOption = await driver.wait(
      until.elementLocated(By.css("li:nth-child(2) > button")),
      10000
    );

    await tagOption.click();

    let button = await driver.wait(
      until.elementLocated(By.css(".btn-secondary")),
      10000
    );

    await button.click();
  }
);

Then(
  "I click on the toggle to see the archived items",
  { timeout: 20 * 1000 },
  async function () {

    let toggle = await driver.wait(
      until.elementLocated(By.css(".toggle")),
      10000
    );

    await toggle.click();

    let itemDetails = await driver.wait(
      until.elementLocated(By.css("tr:nth-child(1) .btn-ghost")),
      15000
    );

    await driver.wait(until.elementIsVisible(itemDetails), 10000);

    await itemDetails.click();

    

  }
);

