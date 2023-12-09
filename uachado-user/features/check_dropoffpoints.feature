# features/dropoff_points.feature

Feature: Dropoff Point Selection
  As a user, I want to select a dropoff point on the website

  Scenario: User navigates to the dropoff points page and selects a dropoff point
    Given I am on the landing page
    When I click on the button to go to the home page
    When I navigate to the dropoff points page
    When I select a specific dropoff point
    Then I should be able to view details about the dropoff point
