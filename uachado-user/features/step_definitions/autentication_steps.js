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

