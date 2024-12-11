import { Question } from '@/features/Game/types/Types';

// TODO: Move the questions to a DB

export const questions: {
  [key: string]: Question[];
} = {
  'Lebron James': [
    {
      question:
        'What Year was Lebron James Drafted #1 Overall To The Cleveland Cavaliers?',
      options: ['2020', '2003', '2004', '2005'],
      answer: '2003',
    },

    {
      question: 'What team does LeBron James currently play for?',
      options: [
        'Philadelphia 76ers',
        'Boston Celtics',
        'Los Angeles Lakers',
        'Miami Heat',
      ],
      answer: 'Los Angeles Lakers',
    },

    {
      question: 'What year did LeBron James win his first NBA championship?',
      options: ['2002', '2007', '2012', '2015'],
      answer: '2012',
    },

    {
      question: 'In what year was LeBron James drafted into the NBA?',
      options: ['2000', '2002', '2004', '2006'],
      answer: '2003',
    },

    {
      question: 'Which of the following awards has LeBron James not won?',
      options: [
        'MVP',
        'Finals MVP',
        'Defensive Player of the Year',
        'Rookie of the Year',
      ],
      answer: 'Rookie of the Year',
    },

    // {
    //   question: 'What high school did LeBron James attend?',
    //   options: [
    //     'Oak Hill Academy',
    //     'St. Vincent–St. Mary High School',
    //     'Rice High School',
    //     'Upper Room Christian Academy',
    //   ],
    //   answer: 'St. Vincent–St. Mary High School',
    // },

    // {
    //   question: 'What number does LeBron James currently wear?',
    //   options: ['6', '7', '8', '23'],
    //   answer: '23',
    // },

    // {
    //   question: 'What award did LeBron James win for the 2008-2009 season?',
    //   options: [
    //     'Most Improved Player',
    //     'MVP',
    //     'Finals MVP',
    //     'Defensive Player of the Year',
    //   ],
    //   answer: 'MVP',
    // },

    // {
    //   question: 'Which of the following teams has LeBron James not played for?',
    //   options: [
    //     'Los Angeles Lakers',
    //     'Miami Heat',
    //     'Cleveland Cavaliers',
    //     'Golden State Warriors',
    //   ],
    //   answer: 'Golden State Warriors',
    // },

    // {
    //   question: 'What position does LeBron James play?',
    //   options: [
    //     'Point Guard',
    //     'Shooting Guard',
    //     'Small Forward',
    //     'Power Forward',
    //   ],
    //   answer: 'Small Forward',
    // },

    // {
    //   question: 'What year did LeBron James win his first NBA MVP award?',
    //   options: ['2007', '2010', '2012', '2013'],
    //   answer: '2009',
    // },

    // {
    //   question: 'How many NBA championships has LeBron James won?',
    //   options: ['1', '2', '3', '4'],
    //   answer: '3',
    // },

    // {
    //   question:
    //     'What year did LeBron James win his first NBA Finals MVP award?',
    //   options: ['2007', '2011', '2013', '2015'],
    //   answer: '2012',
    // },

    // {
    //   question:
    //     'What team did LeBron James win his first NBA championship with?',
    //   options: [
    //     'Cleveland Cavaliers',
    //     'Boston Celtics',
    //     'Los Angeles Lakers',
    //     'Miami Heat',
    //   ],
    //   answer: 'Miami Heat',
    // },

    // {
    //   question:
    //     'In what year did LeBron James return to the Cleveland Cavaliers?',
    //   options: ['2011', '2012', '2014', '2016'],
    //   answer: '2014',
    // },

    // {
    //   question: 'What year did LeBron James win his first Olympic gold medal?',
    //   options: ['2008', '2012', '2016', '2020'],
    //   answer: '2008',
    // },

    // {
    //   question:
    //     'What year did LeBron James win his first NBA All-Star MVP award?',
    //   options: ['2006', '2008', '2011', '2013'],
    //   answer: '2006',
    // },

    // {
    //   question:
    //     'Which of the following teams has LeBron James not led to an NBA Finals appearance?',
    //   options: [
    //     'Miami Heat',
    //     'Los Angeles Lakers',
    //     'Cleveland Cavaliers',
    //     'Golden State Warriors',
    //   ],
    //   answer: 'Golden State Warriors',
    // },
  ],

  'Giannis Antetokounmpo': [
    {
      question: 'Which team does Giannis Antetokounmpo currently play for?',
      options: [
        'Los Angeles Lakers',
        'Cleveland Cavaliers',
        'Boston Celtics',
        'Milwaukee Bucks',
      ],
      answer: 'Milwaukee Bucks',
    },

    {
      question: 'In what year did Giannis win the NBA MVP award?',
      options: ['2017', '2018', '2019', '2020'],
      answer: '2019',
    },

    {
      question:
        'What is the highest number of points Giannis has scored in a single game?',
      options: ['48', '58', '68', '78'],
      answer: '78',
    },

    {
      question: "What is Giannis' nickname?",
      options: [
        'The Greek Freak',
        'The Greek God',
        'The Greek Giant',
        'The Greek Warrior',
      ],
      answer: 'The Greek Freak',
    },

    {
      question: 'Giannis was born in which country?',
      options: ['Greece', 'Italy', 'Germany', 'Spain'],
      answer: 'Greece',
    },

    // {
    //   question: 'What position does Giannis play?',
    //   options: ['Small Forward', 'Power Forward', 'Point Guard', 'Center'],
    //   answer: 'Small Forward',
    // },

    // {
    //   question: 'Which of the following awards has Giannis won?',
    //   options: [
    //     'NBA MVP',
    //     'NBA All-Star MVP',
    //     'NBA Defensive Player of the Year',
    //     'NBA Most Improved Player',
    //   ],
    //   answer: 'NBA MVP',
    // },

    // {
    //   question: 'What year did Giannis first enter the NBA?',
    //   options: ['2011', '2012', '2013', '2014'],
    //   answer: '2013',
    // },

    // {
    //   question: 'Which team did Giannis play for before the Milwaukee Bucks?',
    //   options: [
    //     'Philadelphia 76ers',
    //     'Cleveland Cavaliers',
    //     'Los Angeles Lakers',
    //     'New York Knicks',
    //   ],
    //   answer: 'Philadelphia 76ers',
    // },

    // {
    //   question: "What is Giannis' full name?",
    //   options: [
    //     'Giannis Aris Antetokounmpo',
    //     'Giannis Aristides Antetokounmpo',
    //     'Giannis Athanasios Antetokounmpo',
    //     'Giannis Aristotelis Antetokounmpo',
    //   ],
    //   answer: 'Giannis Aris Antetokounmpo',
    // },

    // {
    //   question: 'How many siblings does Giannis have?',
    //   options: ['2', '3', '4', '5'],
    //   answer: '4',
    // },

    // {
    //   question: "What is the name of Giannis' wife?",
    //   options: [
    //     'Mariah Carey',
    //     'Mariah Riddlesprigger',
    //     'Mariah Smith',
    //     'Mariah Antetokounmpo',
    //   ],
    //   answer: 'Mariah Antetokounmpo',
    // },

    // {
    //   question: 'What year did Giannis win the NBA All-Star Game MVP award?',
    //   options: ['2017', '2018', '2019', '2020'],
    //   answer: '2020',
    // },

    // {
    //   question: 'What college did Giannis attend?',
    //   options: [
    //     'University of Wisconsin',
    //     'University of Michigan',
    //     'University of Kentucky',
    //     'He did not attend college',
    //   ],
    //   answer: 'He did not attend college',
    // },

    // {
    //   question: "What is Giannis' nationality?",
    //   options: ['American', 'Greek', 'Italian', 'German'],
    //   answer: 'Greek',
    // },

    // {
    //   question: 'What NBA record did Giannis break in 2019?',
    //   options: [
    //     'Most triple-doubles in a season',
    //     'Most points in a season',
    //     'Most rebounds in a season',
    //     'Most assists in a season',
    //   ],
    //   answer: 'Most points in a season',
    // },

    // {
    //   question: "What is Giannis' jersey number?",
    //   options: ['5', '10', '15', '34'],
    //   answer: '34',
    // },

    // {
    //   question:
    //     'Giannis is a four-time All-Star. In which year was he first selected?',
    //   options: ['2015', '2016', '2017', '2018'],
    //   answer: '2016',
    // },

    // {
    //   question: "What is the name of Giannis' first son?",
    //   options: ['Liam', 'Alex', 'Lorenzo', 'Logan'],
    //   answer: 'Liam',
    // },

    // {
    //   question:
    //     "Giannis won the NBA's Most Improved Player award in which year?",
    //   options: ['2015', '2016', '2017', '2018'],
    //   answer: '2017',
    // },
  ],

  'Kevin Durant': [
    {
      question: 'What team does Kevin Durant currently play for?',
      options: [
        'Brooklyn Nets',
        'Oklahoma City Thunder',
        'Golden State Warriors',
        'Boston Celtics',
      ],
      answer: 'Brooklyn Nets',
    },
    {
      question: "What is Kevin Durant's jersey number?",
      options: ['3', '7', '35', '25'],
      answer: '7',
    },
    {
      question: 'What year was Kevin Durant drafted?',
      options: ['2005', '2006', '2007', '2008'],
      answer: '2007',
    },
    {
      question: 'What year did Kevin Durant win his first NBA Championship?',
      options: ['2013', '2014', '2015', '2016'],
      answer: '2015',
    },
    {
      question: 'Which college did Kevin Durant attend for one season?',
      options: [
        'University of Texas',
        'University of Maryland',
        'Duke University',
        'University of Kentucky',
      ],
      answer: 'University of Texas',
    },
    // {
    //   question: 'In what year did Kevin Durant win the NBA MVP Award?',
    //   options: ['2010', '2011', '2012', '2013'],
    //   answer: '2014',
    // },
    // {
    //   question: "What is the name of Kevin Durant's production company?",
    //   options: [
    //     'Thirty Five Ventures',
    //     'Fifty Five Ventures',
    //     'Thirty Five Media',
    //     'Thirty Five Productions',
    //   ],
    //   answer: 'Thirty Five Ventures',
    // },
    // {
    //   question: "What is Kevin Durant's middle name?",
    //   options: ['Wayne', 'Willard', 'Walter', 'Wade'],
    //   answer: 'Willard',
    // },
    // {
    //   question:
    //     'What is the name of the school Kevin Durant attended after high school?',
    //   options: [
    //     'Montrose Christian School',
    //     'Oak Hill Academy',
    //     'Georgetown Prep School',
    //     'DeMatha Catholic High School',
    //   ],
    //   answer: 'Oak Hill Academy',
    // },
    // {
    //   question: "What is the name of Kevin Durant's signature sneaker line?",
    //   options: ['KD2', 'KD7', 'KD10', 'KD12'],
    //   answer: 'KD12',
    // },
    // {
    //   question:
    //     'What year did Kevin Durant become the youngest scoring champion in NBA history?',
    //   options: ['2008', '2009', '2010', '2011'],
    //   answer: '2010',
    // },
    // {
    //   question: "What is the name of Kevin Durant's charity foundation?",
    //   options: [
    //     'The Kevin Durant Foundation',
    //     'The KD Foundation',
    //     'The Kevin Durant Charity Foundation',
    //     'The Durant Charity Foundation',
    //   ],
    //   answer: 'The Kevin Durant Foundation',
    // },
    // {
    //   question: 'What is the name of the book Kevin Durant wrote in 2017?',
    //   options: [
    //     'The Art of Basketball',
    //     'The Game Within the Game',
    //     'The Secret of Basketball',
    //     'The Power of Basketball',
    //   ],
    //   answer: 'The Game Within the Game',
    // },
    // {
    //   question:
    //     'What year did Kevin Durant win his first All-Star Game MVP Award?',
    //   options: ['2010', '2011', '2012', '2013'],
    //   answer: '2012',
    // },
    // {
    //   question: 'What is the name of the sports drink Kevin Durant endorses?',
    //   options: ['Gatorade', 'Powerade', 'BODYARMOR', 'Power Water'],
    //   answer: 'BODYARMOR',
    // },
    // {
    //   question:
    //     'What year did Kevin Durant win the NBA Rookie of the Year Award?',
    //   options: ['2005', '2006', '2007', '2008'],
    //   answer: '2008',
    // },
    // {
    //   question: 'What year did Kevin Durant win the NBA Finals MVP Award?',
    //   options: ['2012', '2013', '2014', '2015'],
    //   answer: '2017',
    // },
    // {
    //   question:
    //     "What is the name of the documentary about Kevin Durant's life?",
    //   options: [
    //     'KD: The Making of a Legend',
    //     'KD: The Story of a Legend',
    //     'KD: The Life of a Legend',
    //     'KD: The Legend of a Lifetime',
    //   ],
    //   answer: 'KD: The Making of a Legend',
    // },
    // {
    //   question:
    //     'What year did Kevin Durant win the NBA All-Star Game MVP Award?',
    //   options: ['2012', '2013', '2014', '2015'],
    //   answer: '2012',
    // },
    // {
    //   question: "What is the name of Kevin Durant's production company?",
    //   options: [
    //     'Thirty Five Ventures',
    //     'Fifty Five Ventures',
    //     'Thirty Five Media',
    //     'Thirty Five Productions',
    //   ],
    //   answer: 'Thirty Five Ventures',
    // },
  ],

  'Devin Booker': [
    {
      question: "What is Devin Booker's current team?",
      options: [
        'Utah Jazz',
        'San Antonio Spurs',
        'Phoenix Suns',
        'Los Angeles Lakers',
      ],
      answer: 'Phoenix Suns',
    },

    {
      question: 'What year did Devin Booker get drafted?',
      options: ['2013', '2014', '2015', '2016'],
      answer: '2015',
    },

    {
      question: 'What position does Devin Booker play?',
      options: [
        'Small Forward',
        'Shooting Guard',
        'Power Forward',
        'Point Guard',
      ],
      answer: 'Shooting Guard',
    },

    {
      question: 'What college did Devin Booker attend?',
      options: ['Kentucky', 'Duke', 'Kansas', 'Michigan State'],
      answer: 'Kentucky',
    },

    {
      question:
        'At what age did Devin Booker become the youngest player to ever score 70 points in a single NBA game?',
      options: ['19', '20', '21', '22'],
      answer: '20',
    },

    {
      question:
        "What was Devin Booker's scoring average during the 2018-2019 NBA season?",
      options: ['14.5', '24.5', '34.5', '44.5'],
      answer: '24.5',
    },

    // {
    //   question: 'How tall is Devin Booker?',
    //   options: ["6'1", "6'2", "6'3", "6'4"],
    //   answer: "6'6",
    // },

    // {
    //   question:
    //     'What team did Devin Booker play with during the 2016-2017 NBA season?',
    //   options: [
    //     'Houston Rockets',
    //     'Phoenix Suns',
    //     'Oklahoma City Thunder',
    //     'San Antonio Spurs',
    //   ],
    //   answer: 'Phoenix Suns',
    // },

    // {
    //   question: "What is the name of Devin Booker's older brother?",
    //   options: ['Jabari', 'Marcus', 'Dion', 'Trevon'],
    //   answer: 'Marcus',
    // },

    // {
    //   question: 'What did Devin Booker win during the 2015-2016 NBA season?',
    //   options: [
    //     'MVP',
    //     'Rookie of the Year',
    //     'Sixth Man of the Year',
    //     'Most Improved Player',
    //   ],
    //   answer: 'Rookie of the Year',
    // },

    // {
    //   question: "What was the name of Devin Booker's high school team?",
    //   options: [
    //     'Mesa Mountain View',
    //     'Mesa Red Mountain',
    //     'Mesa Westwood',
    //     'Mesa Desert Ridge',
    //   ],
    //   answer: 'Mesa Red Mountain',
    // },

    // {
    //   question: 'How many All-Star games has Devin Booker been selected for?',
    //   options: ['1', '2', '3', '4'],
    //   answer: '1',
    // },

    // {
    //   question: "What was the name of Devin Booker's first NBA coach?",
    //   options: ['Jeff Hornacek', 'Earl Watson', 'Dave Joerger', 'Steve Kerr'],
    //   answer: 'Jeff Hornacek',
    // },

    // {
    //   question:
    //     'What year did Devin Booker sign an extension with the Phoenix Suns?',
    //   options: ['2018', '2019', '2020', '2021'],
    //   answer: '2018',
    // },

    // {
    //   question: "What is Devin Booker's jersey number?",
    //   options: ['1', '2', '3', '4'],
    //   answer: '1',
    // },

    // {
    //   question: "What is Devin Booker's shoe size?",
    //   options: ['9', '10', '11', '12'],
    //   answer: '11',
    // },

    // {
    //   question:
    //     "What was Devin Booker's field goal percentage during the 2018-2019 NBA season?",
    //   options: ['43%', '53%', '63%', '73%'],
    //   answer: '53%',
    // },

    // {
    //   question: 'What type of car does Devin Booker drive?',
    //   options: ['Tesla', 'Chevrolet', 'Ford', 'Dodge'],
    //   answer: 'Tesla',
    // },

    // {
    //   question: 'What is the name of the charity that Devin Booker founded?',
    //   options: [
    //     "Booker's Buddies",
    //     "Booker's Basketball",
    //     "Booker's Books",
    //     "Booker's Backpacks",
    //   ],
    //   answer: "Booker's Backpacks",
    // },

    // {
    //   question: 'What NBA player did Devin Booker idolize growing up?',
    //   options: [
    //     'Kobe Bryant',
    //     'Allen Iverson',
    //     'Michael Jordan',
    //     'LeBron James',
    //   ],
    //   answer: 'Kobe Bryant',
    // },

    // {
    //   question: "What is Devin Booker's zodiac sign?",
    //   options: ['Virgo', 'Aquarius', 'Gemini', 'Libra'],
    //   answer: 'Aquarius',
    // },
  ],
};
