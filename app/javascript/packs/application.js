// import 'bootstrap/dist/css/bootstrap.min.css';
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");

ReactRailsUJS.useContext(componentRequireContext);
