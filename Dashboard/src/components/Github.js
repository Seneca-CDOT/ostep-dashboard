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
        <Panel
          title={COMPONENT_NAME}
          refreshData={this.refreshData}
        >
          {this.state.data &&
            this.state.data.map((entry, i) => {
              const commitDate = parseDate(entry.author.date);

              return (
                <div key={entry + i} className="github-entry">
                  <img className="github-icon" src={github} alt="Github icon" />
                  <span className="github-name" >{entry.author.name}</span>
                  <span> committed to </span>
                  <a 
                    href={`https://github.com/Seneca-CDOT/${entry.repoName}/tree/${entry.branchName}`}  
                    target="_blank"
                  >
                  <span className="github-repo github-link"> {` ${entry.repoName}/${entry.branchName} `}</span>
                  </a>
                  <span className="github-time">{` @${commitDate}`}</span>
                  <p className="github-message">{`"${entry.message}"`}</p>
                </div>
              );
            })
          }
        </Panel>
      </div>
    );
  }
}

export default Github;