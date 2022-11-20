import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/response/IUser";
import UserService from "./services/UserService";
import {Container, Button, Navbar} from 'react-bootstrap';

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

  return (
    <Container>
        <Navbar.Brand>{store.isAuth ? `User is authorized ${store.user.email}` : 'Sign in'}</Navbar.Brand>
        <h1>{store.user.isBlocked ? 'Account is blocked' : 'account is not blocked'}</h1>
        <Button variant="outline-danger" onClick={() => store.logout()}>Logout</Button>
        <div>
          <Button variant="outline-success" onClick={getUsers}>Get users</Button>
        </div>
        {users.map(user =>
          <div key={user.email}>{user.email}</div>
        )}
    </Container>
  );
};

export default observer(App);