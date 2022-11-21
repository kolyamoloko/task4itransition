import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/response/IUser";
import UserService from "./services/UserService";
import {Container, Button, Navbar,Table} from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { CgUnblock } from 'react-icons/cg';
import { BiBlock } from 'react-icons/bi';
/* import UserTable from './users-table/UserTable'; */

const App: FC = () => {
  const {store} = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return <Container>Waiting...</Container>
  }

  if (!store.isAuth) {
    return (
      <Container>
        <LoginForm/>
      </Container>
    );
  }

  const tableTemplate = users.map((user) => {
    return <tr key={user.email}>
      <td></td>
      <td>{user.email}</td>
      <td>{user.isActive? 'Active': 'Non Active'}</td>
      <td>{user.isBlocked? 'Blocked': 'Non Blocked'}</td>
      </tr>
  })

  return (
    <Container>
        <Navbar.Brand>{store.isAuth ? `User is authorized ${store.user.email}` : 'Sign in'}</Navbar.Brand>
        <h1>{store.user.isBlocked ? 'Account is blocked' : 'account is not blocked'}</h1>
        <Button variant="outline-danger" onClick={() => store.logout()}>Logout</Button>
        <Button variant="outline-success" onClick={getUsers}>Get users</Button>
        <div>
        <Button variant="outline-danger"><BiBlock /></Button>
        <Button variant="outline-warning"><AiFillDelete /></Button>
        <Button variant="outline-success"><CgUnblock /></Button>
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Status</th>
              <th>Block status</th>
            </tr>
          </thead>
          <tbody>
            {tableTemplate}
          </tbody>
        </Table>
    </Container>
  );
};

export default observer(App);