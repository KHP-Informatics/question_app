(function() {
  'use strict';

  var RiskyTimesStrategies =
    {
      'negative emotions': '<h3>Negative emotions (e.g., being sad or stressed)</h3>' +
      '<ol><li><strong>Exercise</strong> - it will help you unwind. Doing something ' +
      'healthy makes smoking seem a bit weird. Why smoke after doing something good for you? </li>' +
      '<li><strong>Socialize</strong> - call a friend, go out, chat online, try to meet someone new without cigarettes </li>' +
      '<li><strong>Do something pleasant</strong> - cuddle with your cat, read a book, ' +
      'draw a picture or make something, cook your favorite meal , watch a funny video online, listen to music </li>' +
      '<li><strong>Do something kind</strong> &ndash; repeat an act of kindness you ' +
      'have seen or done yourself (as logged in this app), write something nice on ' +
      'social media for a friend, go to freerice.com, a site that donates food for playing vocab games</li>' +
      '<li><strong>Distract yourself</strong> - play games on your phone, do a crossword puzzle or Soduku, try some trivia on sporcle.com </li>' +
      '<li><strong>Remember self-care</strong> - you\'ll be better able to regulate ' +
      'your emotions if you are getting plenty of rest, eating well, taking time for yourself, and drinking fluids </li></ol>',
      'positive emotions': '<h3>Positive emotions (e.g., to celebrate, enjoy)</h3>' +
      '<ol><li><strong>Treat yourself</strong> &ndash; try a non-lethal replacement treat - tea, hot chocolate, ice-cream, nachos</li>' +
      '<li><strong>Savor</strong> - just savor the moment for its own merit. For ' +
      'example, you don\'t need a cigarette to celebrate the weekend, it&rsquo;s fun on its own</li>' +
      '<li><strong>Share your happiness &ndash; </strong>reach out to the people ' +
      'in your life and share your happiness - call, email, text, chat online, and/or meet your family and friends to share the moment</li>' +
      '<li><strong>Realize there is plenty more -</strong> Think of how much ' +
      'longer you\'ll be able to enjoy these joyful moments by not smoking - you\'ll have a longer, healthier life! </li></ol>',
      'social situations': '<ol><li><strong>Say &ldquo;no, thanks&rdquo;</strong> - when offered a cigarette, say "no thanks, I don&rsquo;t smoke anymore"</li>' +
      '<li><strong>Enlist a friend to help</strong> - before being offered a cigarette, ask your friend(s) to say "no" for you</li>' +
      '<li><strong>Be elsewhere</strong> - simply avoid the situation (not forever,' +
      ' just for the first 1-2 weeks during which you practice &ndash; and perfect &ndash; being smoke-free!)</li>' +
      '<li><strong>Keep your hands busy - w</strong>hen feeling awkward without a ' +
      'cigarette, keep your hands busy. Drink a glass of water, chew on a snack, play with your smartphone (you can even show off this app!)</li>' +
      '<li><strong>Stay inside - </strong>when others go outside to smoke, stay ' +
      'inside; ask a friend to stay inside with you for the night. This will be an easy one in bad weather!</li>' +
      '<li><strong>Realize you are helping others - </strong>you are helping others ' +
      'by not smoking - you\'re an example for smokers of how to quit, you\'re not ' +
      'harming others with second-hand smoke, you\'re not making others smell cigarettes </li>' +
      '<li><strong>Plan smoke-free outings</strong> - Ask to go out where you ' +
      'can\'t smoke - the movies, library, restaurant or coffee shop, bowling alley, zoo </li></ol>',
      'drinking alcohol': '<ol><li><strong>Avoid drinking</strong>&ndash; if drinking is an important ' +
      'part of your social life, that&rsquo;s tough to do, but best: your cravings ' +
      'will be less strong if you are simply not drinking. Remember, it&rsquo;s not ' +
      'forever, just while you are getting used to being smoke-free (2-3 weeks)</li>' +
      '<li><strong>Trash the smoking supplies </strong>- make sure you have no ' +
      'cigarettes or lighters on you, get rid of ashtrays and cigarette cases</li>' +
      '<li><strong>Enlist friends&rsquo; help </strong>- Ask your friends ahead of ' +
      'time not to give you any cigarettes, even if you ask </li>' +
      '<li><strong>Stay inside - </strong>when others go outside to smoke, stay ' +
      'inside; ask a friend to stay inside with you for the night </li>' +
      '<li><strong>Arrange for activities -</strong> if you are going out, try ' +
      'somewhere that has activities (darts, pool, video games, dancing), so you won\'t feel awkward or bored staying inside </li></ol>',
      'habitual smoking': '<h3>Habitual smoking (e.g., when driving/walking, while taking a break, after a meal)</h3>' +
      '<ol><li><strong>Change your routine</strong> - take a different route to ' +
      'work, go for a walk as your break, drink a juice instead of a coffee or change your coffee flavor/shop</li>' +
      '<li><strong>Change what you do right after</strong> - for example, after ' +
      'a meal, get up from the table immediately and do a different activity for five minutes, sit in a different room before cleaning up, call a friend</li>' +
      '<li><strong>Use mints</strong> - they\'ll make you not want to smoke, mixing mint and cigarettes tastes gross!</li>' +
      '<li><strong>Chew on something</strong> &ndash; carrots, celery, nuts are wonderful</li></ol>',
      'wanting something to do with your hands': '<h3>Wanting something to do with ' +
      'your hands (e.g., during social situations, on the phone, watching tv, walking)</h3>' +
      '<ol><li><strong>Bring something else</strong> - have a stress ball, worry stone, silly putty, play dough to keep your hands busy </li>' +
      '<li><strong>Make coffee or tea</strong> &ndash; just the motions of making yourself a nice drink can be soothing </li>' +
      '<li><strong>Use hand lotion</strong> &ndash; your hands will appreciate it and you will be distracted </li>' +
      '<li><strong>Engage in an activity </strong>- Draw, cook, play cards or start a new hobby </li></ol>'
    };

  angular.module('sis.constants')
    .constant('RiskyTimesStrategies', RiskyTimesStrategies);
})();
