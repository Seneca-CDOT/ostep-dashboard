import React from 'react';
import Panel from './common/Panel';
import Container from './common/Container';
import github from './assets/github.svg';
const COMPONENT_NAME = "github";

class Github extends Container {
  constructor(props) {
    super(props, COMPONENT_NAME);
  }

  render() {
    const parseDate = (date) => {
      const newDate = new Date(date);
      let minutes = String(newDate.getMinutes());
      if (minutes.length === 1) minutes = '0' + minutes;
      let hours = newDate.getHours();

      return `${hours}:${minutes}`;
    };

    return (
      <div>
        <Panel title={COMPONENT_NAME}>
          {this.state.data &&
            this.state.data.map((commit, i) => (
              <div key={commit + i} className="github-entry">
                <img className="github-icon" src={github} alt="Github icon" />
                <span className="github-name">{commit.author.name}</span> committed to
              <span className="github-repo"> {commit.repoName}</span> at {parseDate(commit.author.date)}
                <p className="github-message">{commit.message}</p>
              </div>
            ))
          }
        </Panel>
      </div>
    );
  }
}

export default Github;