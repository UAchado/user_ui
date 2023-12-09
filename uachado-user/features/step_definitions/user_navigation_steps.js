import { Before, After, Given, When, Then } from "@cucumber/cucumber";
import { Builder, By, until } from "selenium-webdriver";

let driver;
let vars;

Before(async function () {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.manage().window().setRect({ width: 1280, height: 720 });
  vars = {};
});

After(async function () {
  await driver.quit();
});

Given("I am on the landing page", async function () {
  await driver.get("http://localhost:3000/");
});

When("I click on the button to go to the home page", async function () {
  await driver.findElement(By.css(".-ml-2")).click();
});

// Dropoff points Test
When("I navigate to the dropoff points page", async function () {
  const element = await driver.wait(
    until.elementLocated(By.css("a:nth-child(1) .max-w-full")),
    10000 // Maximum wait time in milliseconds (adjust as needed)
  );
  await element.click();
});

When("I select a specific dropoff point", async function () {
  const element = await driver.wait(
    until.elementLocated(By.css(".card:nth-child(1) > .card-body .btn")),
    10000 // Maximum wait time in milliseconds (adjust as needed)
  );
  await element.click();
});

Then(
  "I should be able to view details about the dropoff point",
  async function () {
    const details = await driver.findElement(By.className("text-lg font-bold"));
    const detailText = await details.getText();
    if (!detailText.includes("Reitoria")) {
      throw new Error(
        "Detail is not correct, should be Reitoria, not a " + detailText + " a"
      );
    }
  }
);

// Item Test

When("I navigate to the item list page", async function () {
  const element = await driver.wait(
    until.elementLocated(By.css("a:nth-child(2) .max-w-full")),
    10000 // Maximum wait time in milliseconds (adjust as needed)
  );
  await element.click();
});

When("I select a specific item", { timeout: 10000 }, async function () {
  const element = await driver.wait(
    until.elementLocated(By.css("tr:nth-child(1) .btn")),
    10000 // Maximum wait time in milliseconds (adjust as needed)
  );
  await element.click();
});

Then("I should be able to view details about the item", async function () {
    // Specify the locator for the button you are looking for.
    let locator = By.className('btn btn-accent');

    // Wait for the button to be present in the DOM and visible before proceeding.
    // The timeout value can be set as needed for your application's response times.
    let timeout = 5000; // Timeout in milliseconds (10 seconds).
    await driver.wait(until.elementLocated(locator), timeout);
    await driver.wait(until.elementIsVisible(driver.findElement(locator)), timeout);
  
    // Once the wait is complete, check if the button exists.
    let buttonExists = await driver.findElements(locator).then(elements => {
      return elements.length > 0;
    });
  
    if (!buttonExists) {
      throw new Error('The button does not exist');
    }
});
