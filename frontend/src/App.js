import React from 'react';
import axios from "axios";
import { API_URI } from './const'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sta_users: [],
      sta_id: 0,
      sta_name: '',
      sta_email: '',
      sta_password: ''
    }

  }
  componentDidMount() {
    axios.get(API_URI)
      .then((res) => {
        this.setState({
          sta_users: res.data,
          sta_id: 0,
          sta_name: '',
          sta_email: '',
          sta_password: ''
        })
      })
      .catch(e => { alert('SELECT all ERR!!!: ' + e) })
  }
  submit(event, id) {
    event.preventDefault();
    const { sta_id, sta_name, sta_email, sta_password } = this.state
    if (id === 0) {
      axios.post(API_URI, {
        name: sta_name,
        email: sta_email,
        password: sta_password
      })
        .then(() => {
          this.componentDidMount();
        })
        .catch(e => { alert('INSERT ERR!!!: ' + e) })
    } else {
      axios.put(API_URI, {
        id: sta_id,
        name: sta_name,
        email: sta_email,
        password: sta_password
      }).then(() => {
        this.componentDidMount();
      })
        .catch(e => { alert('UPDATE ERR!!!: ' + e) })
    }

  }
  onDelete(id) {
    axios.delete(`${API_URI}${id}`)
      .then(() => {
        this.componentDidMount();
      })
      .catch(e => { alert('DELETE ERR!!!: ' + e) })
  }
  onEdit(id) {
    axios.get(`${API_URI}${id}`)
      .then((res) => {
        const { id, name, email, password } = res.data
        this.setState({
          sta_id: id,
          sta_name: name,
          sta_email: email,
          sta_password: password
        })
      })
      .catch(e => { alert('SELECT one ERR!!!: ' + e) })
  }
  render() {
    const { sta_users, sta_id, sta_name, sta_email, sta_password } = this.state
    return (
      <div className="container" >

        <div className="row">
          <div className="col s6">
            <form onSubmit={(e) => this.submit(e, sta_id)}>
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input onChange={(e) => this.setState({ sta_name: e.target.value })} value={sta_name} type="text" id="sta_name" className="autocomplete" placeholder="input username..." />
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input onChange={(e) => this.setState({ sta_email: e.target.value })} value={sta_email} type="email" id="email" className="autocomplete" placeholder="input email..." />
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">vpn_key</i>
                <input onChange={(e) => this.setState({ sta_password: e.target.value })} value={sta_password} type="password" id="password" className="autocomplete" placeholder="input password..." />
              </div>
              <button className="btn waves-effect waves-light right" type="submit" name="action">Submit
          <i className="material-icons right">send</i>
              </button>
            </form>
          </div>
          <div className="col s6">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {
                  sta_users.map((item_user, index) =>
                    <tr key={index}>
                      <td>{item_user.name}</td>
                      <td>{item_user.email}</td>
                      <td>{item_user.password}</td>
                      <td>
                        <button onClick={(e) => this.onEdit(item_user.id)} className="btn waves-effect waves-light" type="submit" name="action">
                          <i className="material-icons">edit</i>
                        </button>
                      </td>
                      <td>
                        <button onClick={(e) => this.onDelete(item_user.id)} className="btn waves-effect waves-light" type="submit" name="action">
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  )
                }

              </tbody>
            </table>
          </div>

        </div>
      </div>
    );
  }
}

export default App;