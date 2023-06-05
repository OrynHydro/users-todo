import FormUser from "./Components/form/Form";
import UsersData from "./Components/usersData/UsersData.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css'

function App() {
  return (
    <div className="App">
      <FormUser />
      <UsersData />
    </div>
  );
}

export default App;
