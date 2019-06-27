import React from 'react';
import Panel from './common/Panel';
import Container from './common/Container';
import helpWanted from './assets/help-wanted.svg';
import javascript from './assets/javascript.svg';
import C from './assets/C.svg';
import cPlusPlus from './assets/c++.svg';
import bash from './assets/console.png';
import css from './assets/css.svg';
import html from './assets/html.svg';
import docker from './assets/docker.svg';
import nodejs from './assets/nodejs.png';
import python from './assets/python.svg';
import react from './assets/react.svg';
import java from './assets/java.svg';

const COMPONENT_NAME = 'helpWanted';

export default class HelpWanted extends Container {
  constructor(props) {
    super(props, COMPONENT_NAME);
  }

  render() {
    return (
      <Panel title='help wanted' refreshData={this.refreshData}>
        {this.state.data &&
          this.state.data.map(issue => {
            let priority = this.getPriority(issue.labels);
            return (
              <div
                key={`${issue.repository}${issue.number.toString()}`}
                className='github-issue'
                
              >
                <div className='github-issue__details'>
                  <img
                    className='github-issue__icon'
                    src={helpWanted}
                    alt='Help wanted icon'
                  />
                  <span className='github-issue__name' title={issue.description}>{issue.title}</span>
                  <span className='github-issue__number'>
                    {' '}
                    #{issue.number}{' '}
                  </span>
                  in{' '}
                  <span className='github-issue__repo'>{`${
                    issue.repository
                  }`}</span>
                  
                </div>
                <div className='github-issue__priority'>
                  <span className={`github-issue__priority-${priority}`}>{`${
                    priority ? `Priority: ${priority}` : ''
                  }`}</span>
                  <div className='github-issue__stack'>
                    {/* This needs to be re-written to accomodate an array in the future */}
                    <img
                      className='github-issue__stack__language'
                      src={this.getIcon(issue.language)}
                      title={`${issue.language.toLowerCase()}`}
                    />
                  </div>
                </div>
                
                <div className='github-issue__assignees'>
                  {issue.assignees.map(assignee => (
                    <img
                      className='github-issue__avatar'
                      src={`${assignee.avatar}`}
                      title={`${assignee.name}`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </Panel>
    );
  }

  getPriority(labels) {
    let priority = false;
    labels.forEach(label => {
      if (label.includes('priority')) {
        priority = label.slice(label.indexOf(':') + 1);
      }
    });
    return priority;
  }

  getIcon(language) {
    switch (language.toLowerCase()) {
      case 'javascript':
        return javascript;
      case 'python':
        return python;
      case 'c++':
        return cPlusPlus;
      case 'c':
        return C;
      case 'bash':
        return bash;
      case 'java':
        return java;
      case 'html':
        return html;
      case 'css':
        return css;
      case 'react':
        return react;
      case 'nodejs':
        return nodejs;
      case 'docker':
        return docker;
    }
  }
}
