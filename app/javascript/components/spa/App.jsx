import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import LibraryIndexView from "../library/LibraryIndexView";

export default App = (props) => {
  return (
    <Router>
      <div>
        <Route
          path='/'
          component={LibraryIndexView}
        />
      </div>
    </Router>
  )
}