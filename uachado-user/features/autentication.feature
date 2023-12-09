# features/user_navigation.feature

Feature: User navigation

  Scenario: Unauthenticated User I go and login as a student user
    Given I am on the landing page
    When I click on the button to go to the home page
    And I navigate to the login page
    And I enter my username and password
    And I click on the login button
    Then I should be on the landing page