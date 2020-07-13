export default {
  osteppy: {
    homerj: {
      time: '2019-06-05T03:14:28.349Z',
      text:
        '- Delegated calculations for load updates to individual assets\n- Defined initial requirements for the next phase, researched reinforcement learning \n- Attended internal discussion',
      channel: 'general',
    },
    alekhine: {
      time: '2019-06-05T01:11:10.333Z',
      text:
        '- finished first mock of app.\n- implemented a class based version of ellipse tool.\n- began experimenting with staging in tool classes.\n- discussed strategies for facilitating multiple tool implementation.',
      channel: 'general',
    },
    capablanca: {
      time: '2019-06-05T01:56:27.160Z',
      text:
        '- continue migrating project to typescript\n- migrated browser class to ts\n- document ts files with jsdoc annotations\n- close addCookie exception issue',
      channel: 'general',
    },
    'paul.morphy': {
      time: '2019-06-05T03:11:53.438Z',
      text:
        "(06.04)\n- Setup and connected projectors to nodes \n- Taped half of projector's lens to prevent projection from interfering with PiCamera lens\n- Opened an issue for a bug in one of the packages",
      channel: 'general',
    },
  },
  lamp: { status: 'Chris is off campus.', onCampus: false },
  rapresenter: {
    rows: [
      {
        Date: '2119-06-03',
        Time: '11:00 - 11:15',
        Presenter: 'Linus T',
        Topic: 'Dialogflow',
        'Public Session': 'No',
        Room: 'K2037',
      },
      {
        Date: '2119-06-03',
        Time: '11:15 - 11:30',
        Presenter: 'Bill G',
        Topic: 'Unsupervised Machine Learning',
        'Public Session': 'No',
        Room: 'K2037',
      },
      {
        Date: '2119-06-05',
        Time: '11:30 - 11:45',
        Presenter: 'John Doe',
        Topic: 'New Features in ES2020',
        'Public Session': 'No',
        Room: 'K2037',
      },
      {
        Date: '2119-06-05',
        Time: '11:15 - 11:30',
        Presenter: 'Tom S',
        Topic: 'React Native vs Native Script',
        'Public Session': 'No',
        Room: 'K2037',
      },
      {
        Date: '2119-06-07',
        Time: '11:30 - 11:45',
        Presenter: 'Lucy Cole',
        Topic: 'Nftables Scripts',
        'Public Session': 'No',
        Room: 'K2037',
      },
      {
        Date: '2119-06-07',
        Time: '11:15 - 11:30',
        Presenter: 'Alex W',
        Topic: 'The Event Loop',
        'Public Session': 'No',
        Room: 'K2037',
      },
      {
        Date: '2119-06-07',
        Time: '11:30 - 11:45',
        Presenter: 'Thomas A',
        Topic: 'The Shadow DOM',
        'Public Session': 'No',
        Room: 'K2037',
      },
      {
        Date: '2119-06-08',
        Time: '11:15 - 11:30',
        Presenter: 'Bill Gates',
        Topic: 'Redux Thunk',
        'Public Session': 'No',
        Room: 'K2037',
      },
      {
        Date: '2119-06-09',
        Time: '11:30 - 11:45',
        Presenter: 'John Doe',
        Topic: 'Refactoring With SCSS',
        'Public Session': 'No',
        Room: 'K2037',
      },
    ],
  },
  meetings: { rows: [] },
  infrastructure: {
    workstations: [
      { host: 'England', address: 'foo.bar', status: 'up' },
      { host: 'Italy', address: 'baz.foo.bar', status: 'down' },
      { host: 'Sweden', address: 'baz.foo.bar', status: 'down' },
      { host: 'German', address: 'baz.foo.bar', status: 'up' },
      { host: 'France', address: 'baz.foo.bar', status: 'down' },
      { host: 'Spain', address: 'baz.foo.bar', status: 'up' },
      { host: 'Canada', address: 'baz.foo.bar', status: 'down' },
      { host: 'Brazil', address: 'baz.foo.bar', status: 'up' },
      { host: 'Argentina', address: 'baz.foo.bar', status: 'up' },
      { host: 'Japan', address: 'baz.foo.bar', status: 'down' },
    ],
    dns: [
      {
        domain: 'foo.bar.',
        type: 'NS',
        ttl: '227',
        class: 'IN',
        value: 'mail.server.common.',
      },
      {
        domain: 'foo.bar.',
        type: 'NS',
        ttl: '227',
        class: 'IN',
        value: 'print.server.prod.',
      },
      {
        domain: 'foo.bar.',
        type: 'NS',
        ttl: '227',
        class: 'IN',
        value: 'ostep.server.common.',
      },
      {
        domain: 'foo.bar.',
        type: 'NS',
        ttl: '227',
        class: 'IN',
        value: 'code.server.prod.',
      },
      {
        domain: 'foo.bar.',
        type: 'NS',
        ttl: '227',
        class: 'IN',
        value: 'action.server.common.',
      },
      {
        domain: 'foo.bar.',
        type: 'NS',
        ttl: '227',
        class: 'IN',
        value: 'lint.server.prod.',
      },
      {
        domain: 'foo.bar.',
        type: 'NS',
        ttl: '227',
        class: 'IN',
        value: 'node.server.common.',
      },
      {
        domain: 'foo.bar.',
        type: 'NS',
        ttl: '227',
        class: 'IN',
        value: 'java.server.prod.',
      },
      {
        domain: 'foo.bar.',
        type: 'NS',
        ttl: '227',
        class: 'IN',
        value: 'aws.server.common.',
      },
      {
        domain: 'foo.bar.',
        type: 'NS',
        ttl: '227',
        class: 'IN',
        value: 'husky.server.prod.',
      },
    ],
    servers: [
      {
        description: 'Server',
        name: 'aandy',
        domain: 'baz.foo.bar',
        port: '2200',
        status: 'down',
      },
      {
        description: 'Server',
        name: 'bbob',
        domain: 'baz.foo.bar',
        port: '2202',
        status: 'down',
      },
      {
        description: 'Server',
        name: 'cchris',
        domain: 'baz.foo.bar',
        port: '2205',
        status: 'up',
      },
      {
        description: 'Server',
        name: 'ddouglas',
        domain: 'baz.foo.bar',
        port: '22',
        status: 'up',
      },
    ],
  },
  github: [
    {
      author: { name: 'Vladimir Kramnik', date: '6/4/2019, 6:24:40 PM' },
      repoName: 'ostep-dashboard',
      branchName: 'voltage-fluct-57',
      message: 'Add debug feature to dashboard.',
    },
    {
      author: { name: 'Paul Morphy', date: '6/4/2019, 6:24:40 PM' },
      repoName: 'ostep-dashboard',
      branchName: 'issue-57',
      message: 'refactor: Math.min for Ellipse tool',
    },
    {
      author: { name: 'Boris Spassky', date: '6/4/2019, 6:24:40 PM' },
      repoName: 'ostep-dashboard',
      branchName: 'debug-frontend',
      message:
        'Merge pull request #64 from issues/63-add-missing-imports Add missing imports to EODList.js',
    },
    {
      author: { name: 'Gary Kasparov', date: '6/4/2019, 6:24:40 PM' },
      repoName: 'ostep-dashboard',
      branchName: 'voltage-fluct-57',
      message:
        'add cookie validation utilities -isCookie(cookie) -validateCookie add UnhandledPromptBehaviourValues add RunScriptValues add isBrowserOptionse',
    },
    {
      author: { name: 'Magnus Carlsen', date: '6/4/2019, 6:24:40 PM' },
      repoName: 'ostep-dashboard',
      branchName: 'voltage-fluct-57',
      message: 'Delegated calculations for load updates to individual assets',
    },
    {
      author: { name: 'Some Random RA', date: '6/4/2019, 6:24:40 PM' },
      repoName: 'ostep-dashboard',
      branchName: 'voltage-fluct-57',
      message: 'Added state __str__ overload for assets',
    },
  ],
  'github%2Fpull-requests': [
    {
      title: 'Added Dropdown Feature',
      author: { name: 'Marty McFly' },
      created: '6/4/2019, 6:24:40 PM',
      number: '45',
      reviewers: [
        {
          name: 'Doc Brown',
          avatar: 'https://avatars1.githubusercontent.com/u/7077433?v=4',
        },
        {
          name: 'Biff',
          avatar: 'https://avatars2.githubusercontent.com/u/32024054?v=4',
        },
      ],
      labels: [
        {
          name: 'Priority: High',
          color: 'f58484',
        },
        {
          name: 'Type: Enhancement',
          color: '37b4e5',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      repoName: 'ostep-dashboard',
      url: 'https//backToTheFuture.com',
    },
    {
      title: 'Installed Linters',
      author: { name: 'Salieri' },
      created: '05/10/2020, 6:24:40 PM',
      number: '76',
      reviewers: [
        {
          name: 'Beethoven',
          avatar: 'https://avatars0.githubusercontent.com/u/13407723?v=4',
        },
        {
          name: 'Bach',
          avatar: 'https://avatars0.githubusercontent.com/u/21987387?v=4',
        },
      ],
      labels: [
        {
          name: 'Priority: High',
          color: 'f58484',
        },
        {
          name: 'Area: Backend',
          color: '02d673',
        },
        {
          name: 'Type: Enhancement',
          color: '37b4e5',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      repoName: 'Tech Stack',
      url: 'https//IdidntKillMozart.com',
    },
    {
      title: 'Fixed UI Scaling Bug',
      author: { name: 'Vince Vega' },
      created: '7/8/2019, 6:24:40 PM',
      number: '116',
      reviewers: [
        {
          name: 'Jules',
          avatar: 'https://avatars2.githubusercontent.com/u/26641473?v=4',
        },
        {
          name: 'Marsellus Wallace',
          avatar: 'https://avatars2.githubusercontent.com/u/23108901?v=4',
        },
      ],
      labels: [
        {
          name: 'Type: Bug',
          color: 'd73a4a',
        },
        {
          name: 'Priority: Medium',
          color: 'e4fc5a',
        },
        {
          name: 'Difficulty: Medium',
          color: 'e67e22',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      repoName: 'plumadriver',
      url: 'https//.com',
    },
    {
      title: 'Purged Unused CSS',
      author: { name: 'Neo' },
      created: '1/1/2019, 6:24:40 PM',
      number: '116',
      reviewers: [
        {
          name: 'Morpheus',
          avatar: 'https://avatars0.githubusercontent.com/u/30670414?v=4',
        },
        {
          name: 'Trinity',
          avatar: 'https://avatars1.githubusercontent.com/u/7077433?v=4',
        },
      ],
      labels: [
        {
          name: 'Priority: Low',
          color: 'fbca04',
        },
        {
          name: 'Area: Documentation',
          color: 'f7ec59',
        },
        {
          name: 'Type: Enhancement',
          color: 'a3a4e2',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      repoName: 'L-Tech',
      url: 'https//.com',
    },
  ],
};
