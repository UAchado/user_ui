# features/user_navigation.feature

Feature: Authenticated User Navigation

  Scenario: Unauthenticated User I want to login as a Authenticated user
    Given I am on the landing page as a not authenticated user
    When I click on the button to go to the home page to login
    And I navigate to the login page
    And I enter my credentials and login
    And I should be on the home page
    Then I should be logged in

  Scenario: Authenticated User I want to logout
    Given I am on the landing page as a not authenticated user
    When I click on the button to go to the home page to login
    And I navigate to the login page
    And I enter my credentials and login
    And I should be on the home page
    And I click on the profile icon
    And I click on the logout button
    #Then I should be an unauthenticated user

  Scenario: Authenticated User I want to see the items in my DropOffPoint and mark on as found
    Given I am on the landing page as a not authenticated user
    When I click on the button to go to the home page to login
    And I navigate to the login page
    And I enter my credentials and login
    And I should be on the home page
    And I go to the dashboard page
    Then I should see the item I want to mark as found and mark it