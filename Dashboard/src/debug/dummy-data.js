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
  rapresenter: {
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
    workstations: [
      { host: 'one', address: 'foo.bar', status: 'up' },
      { host: 'two', address: 'baz.foo.bar', status: 'up' },
      { host: 'three', address: 'baz.foo.bar', status: 'up' },
      { host: 'four', address: 'baz.foo.bar', status: 'up' },
      { host: 'five', address: 'baz.foo.bar', status: 'up' },
      { host: 'six', address: 'baz.foo.bar', status: 'up' },
      { host: 'seven', address: 'baz.foo.bar', status: 'up' },
      { host: 'eight', address: 'baz.foo.bar', status: 'up' },
      { host: 'nine', address: 'baz.foo.bar', status: 'up' },
      {
        host: 'ten',
        address: 'switzerland.foo.bar',
        status: 'down'
      },
      { host: 'eleven', address: 'japan.foo.bar', status: 'up' },
      { host: 'twelve', address: 'ukraine.foo.bar', status: 'down' }
    ],
    dns: [
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
    servers: [
      {
        description: 'Server',
        name: 'first',
        domain: 'baz.foo.bar',
        port: '2200',
        status: 'up'
      },
      {
        description: 'Server',
        name: 'second',
        domain: 'baz.foo.bar',
        port: '2202',
        status: 'up'
      },
      {
        description: 'Server',
        name: 'third',
        domain: 'baz.foo.bar',
        port: '2205',
        status: 'up'
      },
      {
        description: 'Server',
        name: 'fourth',
        domain: 'baz.foo.bar',
        port: '22',
        status: 'up'
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
  ],
  helpWanted: [
    {
      ra: 'scrust',
      repository: 'telemed',
      number: 165,
      title: 'Consider migrating to TypeScript',
      description:
        'Once we finish the `First Prototype` milestone and get feedback, it may be worth our while to migrate the codebase to TypeScript.\r\n\r\n`create-react-app` comes with a lot of machinery built-in to support TypeScript projects, and I was able to transition `App` and `MeasurementContext` to TypeScript with only a few interface and type definitions as [`exps/add-typescript`](https://github.com/Seneca-CDOT/telemed/tree/exps/add-typescript) with very little effort.\r\n\r\nMy feeling is `First Prototype` will help us lock down the shape of a lot of our objects (especially for e.g. `Measurement`s), and codifying these in a type system will support us well as we got forward in the project.',
      language: 'Python',
      labels: ['enhancement', 'help wanted', 'question', 'priority:low'],
      state: 'open',
      assignees: [],
      milestone: null,
      created: '6/25/2019, 4:20:11 PM',
      updated: '6/25/2019, 4:20:11 PM'
    },
    {
      ra: 'miggs125',
      repository: 'ostep-dashboard',
      number: 65,
      title: 'Project Restructuring - Discussion',
      description:
        "The code-base for dashboard, although functional, is somewhat convoluted and at times redundant. I propose a restructuring of the project (with the input of it's contributors of course) to make the code-base more readable and maintainable and eliminate redundancies before we continue adding more functionality and features to the project. Perhaps we should create a document detailing classes, functionality and structure agreed upon by all before beginning to implement the restructure. This would also make it easier for new RAs to get involved with the project and spare senior RAs from having to explain how the project functions by pointing them to the proposed documentation. We could take this opportunity to implement the ostep repo standards into the dashboard as well.",
      language: 'JavaScript',
      labels: ['help wanted', 'type: discussion', 'type: question', 'priority:critical'],
      state: 'open',
      assignees: [
        {
          name: 'naiuhz',
          avatar: 'https://avatars1.githubusercontent.com/u/7077433?v=4'
        },
        {
          name: 'belavina',
          avatar: 'https://avatars0.githubusercontent.com/u/13407723?v=4'
        },
        {
          name: 'newbRaymond',
          avatar: 'https://avatars0.githubusercontent.com/u/14317628?v=4'
        },
        {
          name: 'scrust',
          avatar: 'https://avatars0.githubusercontent.com/u/21987387?v=4'
        },
        {
          name: 'manekenpix',
          avatar: 'https://avatars2.githubusercontent.com/u/23108901?v=4'
        },
        {
          name: 'klymenkoo',
          avatar: 'https://avatars2.githubusercontent.com/u/26641473?v=4'
        },
        {
          name: 'poftadeh',
          avatar: 'https://avatars0.githubusercontent.com/u/30670414?v=4'
        },
        {
          name: 'miggs125',
          avatar: 'https://avatars2.githubusercontent.com/u/32024054?v=4'
        }
      ],
      milestone: null,
      created: '6/4/2019, 10:12:30 AM',
      updated: '6/17/2019, 2:43:50 PM'
    },
    {
      ra: 'miggs125',
      repository: 'ostep-dashboard',
      number: 61,
      title: 'convert css files to sass and refactor code',
      description:
        'The style files are, specifically App.css is getting rather large and needs to be refactored and modulated in order to keep the codebase maintainable as the project scales',
      language: 'java',
      labels: ['area: frontend', 'help wanted', 'type: enhancement', 'priority:medium'],
      state: 'open',
      assignees: [],
      milestone: null,
      created: '6/1/2019, 11:49:53 PM',
      updated: '6/7/2019, 7:27:52 PM'
    },
    {
      ra: 'poftadeh',
      repository: 'plumadriver',
      number: 8,
      title: 'Convert Project Code to Typescript',
      description:
        'As discussed, static type-checking will be useful as the project grows in size. ',
      language: 'bash',
      labels: ['Type: Enhancement', 'help wanted','priority:high'],
      state: 'open',
      assignees: [],
      milestone: null,
      created: '2/22/2019, 11:29:08 AM',
      updated: '5/30/2019, 4:21:25 PM'
    }
  ]
};
