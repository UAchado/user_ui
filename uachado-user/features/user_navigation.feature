# features/user_navigation.feature

Feature: User navigation

  Scenario: Unauthenticated User navigates to the dropoff points page and selects a dropoff point
    Given I am on the landing page
    When I click on the button to go to the home page
    And I navigate to the dropoff points page
    And I select a specific dropoff point
    Then I should be able to view details about the dropoff point

  Scenario: Unauthenticated User navigates to the item list page and selects an item
    Given I am on the landing page
    When I click on the button to go to the home page
    And I navigate to the item list page
    And I select a specific item
    Then I should be able to view details about the item
  
