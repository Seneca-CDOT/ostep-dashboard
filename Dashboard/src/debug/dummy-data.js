export default {
  osteppy: {
    homerj: {
      time: '2019-06-05T03:14:28.349Z',
      text:
        '- Delegated calculations for load updates to individual assets\n- Defined initial requirements for the next phase, researched reinforcement learning \n- Attended internal discussion',
      channel: 'general'
    },
    alekhine: {
      time: '2019-06-05T01:11:10.333Z',
      text:
        '- finished first mock of app.\n- implemented a class based version of ellipse tool.\n- began experimenting with staging in tool classes.\n- discussed strategies for facilitating multiple tool implementation.',
      channel: 'general'
    },
    capablanca: {
      time: '2019-06-05T01:56:27.160Z',
      text:
        '- continue migrating project to typescript\n- migrated browser class to ts\n- document ts files with jsdoc annotations\n- close addCookie exception issue',
      channel: 'general'
    },
    'paul.morphy': {
      time: '2019-06-05T03:11:53.438Z',
      text:
        "(06.04)\n- Setup and connected projectors to nodes \n- Taped half of projector's lens to prevent projection from interfering with PiCamera lens\n- Opened an issue for a bug in one of the packages",
      channel: 'general'
    }
  },
  lamp: { status: 'Chris is off campus.', onCampus: false },
  presentations: {
    rows: [
      {
        Date: '2119-06-03',
        Time: '11:00 - 11:15',
        Presenter: 'Linus T',
        Topic: 'Dialogflow',
        'Public Session': 'No',
        Room: 'K2037'
      },
      {
        Date: '2119-06-03',
        Time: '11:15 - 11:30',
        Presenter: 'Bill Gates',
        Topic: 'Unsupervised Machine Learning',
        'Public Session': 'No',
        Room: 'K2037'
      },
      {
        Date: '2119-06-03',
        Time: '11:30 - 11:45',
        Presenter: 'John Doe',
        Topic: 'Python: Why 2 < 3',
        'Public Session': 'No',
        Room: 'K2037'
      }
    ]
  },
  meetings: { rows: [] },
  infrastructure: {
    Workstations: [
      { Host: 'one', IPAddress: 'foo.bar', Status: 'up' },
      { Host: 'two', IPAddress: 'baz.foo.bar', Status: 'up' },
      { Host: 'three', IPAddress: 'baz.foo.bar', Status: 'up' },
      { Host: 'four', IPAddress: 'baz.foo.bar', Status: 'up' },
      { Host: 'five', IPAddress: 'baz.foo.bar', Status: 'up' },
      { Host: 'six', IPAddress: 'baz.foo.bar', Status: 'up' },
      { Host: 'seven', IPAddress: 'baz.foo.bar', Status: 'up' },
      { Host: 'eight', IPAddress: 'baz.foo.bar', Status: 'up' },
      { Host: 'nine', IPAddress: 'baz.foo.bar', Status: 'up' },
      {
        Host: 'ten',
        IPAddress: 'switzerland.foo.bar',
        Status: 'down'
      },
      { Host: 'eleven', IPAddress: 'japan.foo.bar', Status: 'up' },
      { Host: 'twelve', IPAddress: 'ukraine.foo.bar', Status: 'down' }
    ],
    DNS: [
      {
        domain: 'foo.bar.',
        type: 'NS',
        ttl: '227',
        class: 'IN',
        value: 'baz.foo.bar.'
      },
      {
        domain: 'foo.bar.',
        type: 'NS',
        ttl: '227',
        class: 'IN',
        value: 'baz.foo.bar.'
      }
    ],
    Servers: [
      {
        Description: 'Server',
        Name: 'first',
        Domain: 'baz.foo.bar',
        Port: '2200',
        Status: 'up'
      },
      {
        Description: 'Server',
        Name: 'second',
        Domain: 'baz.foo.bar',
        Port: '2202',
        Status: 'up'
      },
      {
        Description: 'Server',
        Name: 'third',
        Domain: 'baz.foo.bar',
        Port: '2205',
        Status: 'up'
      },
      {
        Description: 'Server',
        Name: 'fourth',
        Domain: 'baz.foo.bar',
        Port: '22',
        Status: 'up'
      }
    ]
  },
  github: [
    {
      author: { name: 'Alpha Zero', date: '6/4/2019, 6:24:40 PM' },
      repoName: 'ostep-dashboard',
      branchName: 'voltage-fluct-57',
      message: 'Add debug feature to dashboard.'
    },
    {
      author: { name: 'Deep Blue', date: '6/4/2019, 6:24:40 PM' },
      repoName: 'ostep-dashboard',
      branchName: 'issue-57',
      message: 'refactor: Math.min for Ellipse tool'
    },
    {
      author: { name: 'Boris Spassky', date: '6/4/2019, 6:24:40 PM' },
      repoName: 'ostep-dashboard',
      branchName: 'debug-frontend',
      message:
        'Merge pull request #64 from issues/63-add-missing-imports Add missing imports to EODList.js'
    },
    {
      author: { name: 'Gary Kasparov', date: '6/4/2019, 6:24:40 PM' },
      repoName: 'ostep-dashboard',
      branchName: 'voltage-fluct-57',
      message:
        'add cookie validation utilities -isCookie(cookie) -validateCookie add UnhandledPromptBehaviourValues add RunScriptValues add isBrowserOptionse'
    },
    {
      author: { name: 'Magnus Carlsen', date: '6/4/2019, 6:24:40 PM' },
      repoName: 'ostep-dashboard',
      branchName: 'voltage-fluct-57',
      message: 'Delegated calculations for load updates to individual assets'
    },
    {
      author: { name: 'Some Random RA', date: '6/4/2019, 6:24:40 PM' },
      repoName: 'ostep-dashboard',
      branchName: 'voltage-fluct-57',
      message: 'Added state __str__ overload for assets'
    }
  ]
};
