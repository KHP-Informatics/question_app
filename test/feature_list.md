# Feature List

This is a list of feature tests for the application. These will need to be
updated as features and tests are added / changed.

## Sessions

* Participant should be taken to Session 1 on initial load of the application
* Within the sessions a modal should be triggered by certain responses and a
  participant should be able to set:
  * A quit date
    * Slides within session 1 and 3 should update with the quit date that was
      set
  * Reasons for stopping smoking
  * Risky Times
  * Social Supports
    * Reasons should be selectable
* Modals should have a 'Save' and 'Exit' button
* Modals should show context specific instructions
* If it is prior to their quit day, the participant should only be able to
  access Session 1
* If it is on or after their quit day and before 7 days after their quit day,
  the participant should be able to access Session 2
* If it is on or after their quit day and before 7 days after their quit day,
  the participant should only be able to access Session 1 and Session 2
* If it is 7+ days after their quit day, the participant should be able to
  access all sessions
* When a participant accesses Session 1, the branching logic should take them
  correctly through the questions until they complete the session. (this will
  be repeated to test the necessary functionality)
* When a participant accesses Session 2, the branching logic should take them
  correctly through the questions until they complete the session. (this will
  be repeated to test the necessary functionality)
* When a participant accesses Session 3, the branching logic should take them
  correctly through the questions until they complete the session. (this will
  be repeated to test the necessary functionality)
* After a participant completes Session 1, there should be a check mark next to
  it indicating it is complete
* After a participant completes Session 2, there should be a check mark next to
  it indicating it is complete
* After a participant completes Session 3, there should be a check mark next to
  it indicating it is complete
* Participant should be able to retake sessions
* An optional 'Notes' field should be available on certain session questions
* Participant should be able to access sub sessions

## Settings page

* After completing Session 1, nn the Settings page a participant should:
  * not be able to move from the configuration screen until
    the quit date has been set, at least one reason has been specified, at
    least one risky time has been set, and at least one Social Support has been
    set
  * be able to return to the configuration page and update quit date
  * be able to return to the configuration page and add / delete reasons for
    stopping smoking
  * be able to return to configuration page and add / delete social supports
  * be able to return to the configuration page and add / delete risky times
    if they have not completed Session 2
  * they should be able to return to the configuration page and add, delete, or
    update risky times If the participant has completed Session 2, . Update to
    risky times includes add a strategy.
* Participant should only be able to navigate away from the Settings page if a
  quit date is and at least one Risky Time, Social Support, and Cessation
  Reason is set

## Home page

* Participant should see the number of days until their quit day at the top of
  the home page. It should:
  * decrement daily until their quit day
  * say “It’s quitting day!” on the quit day
* Participant should see the number of days since quit day at the top of the
  home page. It should increment daily
* If it is prior to the participant’s quit day, the Smoking Status at the
  bottom of the home page should say “I’m preparing for my quit day”
* If it is on the participant’s quit day, the Smoking Status at the bottom of
  the home page should say “Today is my quit day”
* It it after the participant’s quit day, the Smoking Status at the bottom of
  the home page should say “I’m no longer smoking”
* Participant should be able to update their Smoking Status (repeat as needed)
* Each day the participant should receive a random Happiness Exercise to
  complete
* When a participant completes a Happiness Exercise the home page should
  reflect this with the message “complete” (start with only adding one repeat
  and repeat to check all; repeat for different exercises)
* Happiness exercises should contain help menus that allow for a user to get
  assistance
* Happiness exercises should be able to show a historical log of happiness
  assessment data
* Participant should be able to enter a Cigarette Log by selecting “I’m smoking
  now….” A Cigarette Log includes choosing a reason for smoking and how strong
  the urge was (repeat as needed)
* Participant should be able to enter a Cigarette Log by selecting “I forgot
  to add a cigarette…” A Cigarette Log includes choosing a reason for smoking
  and how strong the urge was (repeat as needed)
* Participant should be able to complete a Temptation Log. A Temptation Log
  includes choosing a reason and how strong the urge is (repeat as needed)
* Participant should be able to see a historical review of their cigarette
  usage.

## Notifications

### EMA

* Participant should be notified to complete the Morning EMA randomly between 9
  am and 7 pm
* Participant should be notified to complete the Evening EMA randomly between 7
  pm and 1 am
* If it is between the times of 9 am and 7 pm and the participant has not
  completed the Morning EMA, they should be able to complete the Morning
  EMA from a button within the app. (repeat with the opposite condition)
* If it is between the times of 7 pm and 1 am and the participant has not
  completed the Evening EMA, they should be able to complete the Evening
  EMA from a button within the app. (repeat with the opposite condition)

### Risky Times

* If participant does not have a reason for stopping smoking, at the time of a
  risky time the participant should receive a notification that says, “SiS
  Reminder: Time to enact one of your smoke-free strategies!”
* If a participant does not have a strategy attached to a risky time, at the
  time of a risky time the participant should receive a notification that is
  randomly selected between the first notification and the second which says,
  “Why you want to be smoke-free:” with the first 100 characters of a randomly
  selected participant-entered reason for stopping smoking.
* If a participant does have a strategy attached to a risky time, at the time
  of the risky time the participant should receive a notification that says,
  “Your strategy:” with the participant-selected strategy attached to that
  risky time.
* The application opens to the configuration screen if the configuration is
  incomplete upon the press of a risky time notification.
* The application opens to the motivation page (the screen that begins with
  "Challenging Time Reminder") on click of notification type 1 if the
  configuration is complete.
* When the second or third notification is selected the application opens to
  the “Challenging Time Reminder” screen.
* If the participant has a reason for stopping smoking, the “Challenging Time
  Reminder” should display one of these at random.
* If the participant has a strategy attached to a risky time, the “Challenging
  Time Reminder” should display this strategy.
* Participant should be able to edit the reminder by selecting “Edit” and being
  taken to the “Risky Times” screen.
* Participant should be able to close the “Challenging Time Reminder” by
  selecting “Ok”.


Not captured:

* Data storage and transmission.