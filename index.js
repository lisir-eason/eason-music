/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

window.XMLHttpRequest = window.originalXMLHttpRequest || window.XMLHttpRequest;

console.disableYellowBox = true;

const ignoredWarnings = ['Expected style'];

function isWarnIgnored(...args) {
  return args.some(arg => {
    if (typeof arg !== 'string') {
      return false;
    }

    return ignoredWarnings.some(ignoredWarning => {
      return arg.includes(ignoredWarning);
    });
  });
}

if (__DEV__) {
  const _warn = console.warn;
  console.warn = function (...args) {
    if (isWarnIgnored(...args)) {
      return;
    }
    _warn(...args);
  };

  LogBox.ignoreLogs(ignoredWarnings);
}

AppRegistry.registerComponent(appName, () => App);
