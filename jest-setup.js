/* eslint-disable */

const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
window.React = require('react');
window.propTypes = require('prop-types');

enzyme.configure({adapter: new Adapter()});
