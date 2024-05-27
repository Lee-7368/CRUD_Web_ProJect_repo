import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoList from './components/TodoList';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/todos" component={TodoList} />
                    <Route path="/" component={TodoList} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;