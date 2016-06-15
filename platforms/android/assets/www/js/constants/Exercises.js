(function() {
  'use strict';

  var help = 
    {
      happiness:[
        'increase your confidence in your ability to quit,' +
          ' which is critically important to being successful',
        'give you courage to act upon the fact that smoking is bad for you,' + 
          ' rather than feeling bad about it and simply ignoring such self-threatening facts',
        'broaden your ‘thought-action-repertoire’ – that is,' +
          ' you’ll more readily think about other things to do rather than smoke' + 
          ' (e.g., sharing a fun story with your friends rather than lighting up)' +
          ' in short, you’ll be more creative',
        'decrease your desire/urge to smoke'],
      exercise:[
        'This exercise has been shown to have rapid and lasting effects' +
          ' on increasing happiness, and is usually quite popular among' + 
          ' persons who try to quit smoking'],
      examples:[
        'Jim made me a hot chocolate.',
        'Omg, I got an awesome job offer!',
        'I got to spend time with my nephews today!',
        'Ate my favorite dinner tonight.',
        'My friend told me about a great opportunity today.',
        'My best friend is getting married!',
        'My mom gave me a hug just when I really needed it.',
        'I just heard that they are bringing back “Firefly”!!',
        'The weather is just perfect today!',
        'Almost forgot my smartphone at home, but my son brought it to me just before I left!',
        'Woot, my favorite Greek yogurt is on sale today!'
      ]
    };

  var Exercises =
    [
      { id: 1,
        type: 'Savoring',
        description: 'Please describe experiences that you savored in the past four hours:',
        instructions: [
          {id: 1, instruction: 'describe your 1st experience that you savored here'},
          {id: 2, instruction: 'describe your 2nd experience that you savored here'}
        ],
        help: help  
      },
      { id: 2,
        type: 'Experiencing Kindness',
        description: 'Please describe two acts of kindness:  a kindness you did, and a\ ' +
        'kindness you saw someone else do today:',
        instructions: [
          {id: 1, instruction: 'describe an act of kindness you did today'},
          {id: 2, instruction: 'describe an act of kindness you saw someone else do today'}
        ],
        help: help     
      },
      { id: 3,
        type: 'Three Good Things',
        description: 'Please describe three good things that happened to you today:',
        instructions: [
          {id: 1, instruction: 'describe the 1st good thing that happened to you here'},
          {id: 2, instruction: 'describe the 2nd good thing that happened to you here'},
          {id: 3, instruction: 'describe the 3rd good thing that happened to you here'}
        ],
        help: help
      }
    ];

  angular.module('sis.constants')
    .constant('Exercises', Exercises);
})();
