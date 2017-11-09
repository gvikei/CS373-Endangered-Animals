import React from 'react';
import packageJSON from '../../package.json';

let version = packageJSON.version;

if (/public/.test(version)) {
  version = version.split('-')[0];
}

const PageFooter = React.createClass({
  render() {
    return (
      <footer className="bs-public-footer" role="contentinfo">
        <div className="container">
          <div className="bs-public-social">
            <ul className="bs-public-social-buttons">
              <li>
                <iframe
                  className="github-btn"
                  src="https://ghbtns.com/github-btn.html?user=gvikei&repo=idb&type=watch&count=true"
                  width={95}
                  height={20}
                  title="Star on GitHub"/>
              </li>
              <li>
                <iframe
                  className="github-btn"
                  src="https://ghbtns.com/github-btn.html?user=gvikei&repo=idb&type=fork&count=true"
                  width={92}
                  height={20}
                  title="Fork on GitHub"/>
              </li>
            </ul>
          </div>
          <p>Code licensed under <a href="https://github.com/react-bootstrap/react-bootstrap/blob/master/LICENSE" target="_blank">MIT</a>.</p>
        </div>
      </footer>
    );
  },
});

export default PageFooter;
