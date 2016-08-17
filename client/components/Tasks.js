/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, no-string-refs */
/* eslint-disable */

import React from 'react';
import axios from 'axios';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
    // const authorization = `JWT ${localStorage.getItem('token')}`;
    // this.state = { tasks: [], authorization };
    this.state = { tasks: [] };
  }

  componentWillMount() {
    // axios.get('/api/tasks', { headers: { authorization: this.state.authorization } })
    axios.get('http://localhost:9001/api/tasks')
    .then((rsp) => {
      this.setState({ tasks: rsp.data.content });
    });
  }

  create(e) {
    e.preventDefault();
    const name = this.refs.name.value;
    const url = this.refs.url.value;
    axios.post('/api/pokemon', { name, url }, { headers: { authorization: this.state.authorization } })
    .then((rsp) => {
      this.setState({ tasks: [...this.state.tasks, rsp.data.tasks] });
    });
  }

  render() {
    return (
      <div>

        <h1>Task Master</h1>

        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input ref="name" type="text" className="form-control" id="name" />
              </div>

              <div className="form-group">
                <label htmlFor="url">Image Url</label>
                <input ref="url" type="text" className="form-control" id="url" />
              </div>

              <button onClick={this.create} type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
          <div className="col-xs-9">
          </div>
        </div>

        <div className="row">
          <div className="col-xs-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Due</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Complete</th>
                </tr>
              </thead>
              <tbody>

                {this.state.tasks.map(t => (
                  <tr key={t._id}>
                    <td>{t.name}</td>
                    <td>{t.category}</td>
                    <td>{t.due}</td>
                    <td>{t.createdAt}</td>
                    <td>{t.updatedAt}</td>
                    <td>{t.complete}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
          <div className="col-xs-9"></div>
        </div>

      </div>
    );
  }
}
