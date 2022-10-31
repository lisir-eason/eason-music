/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

window.XMLHttpRequest = window.originalXMLHttpRequest || window.XMLHttpRequest;

AppRegistry.registerComponent(appName, () => App);
