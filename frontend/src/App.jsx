import { Button } from 'react-bootstrap';
import Table from './Table';
import axios from 'axios'
function App() {

  axios.defaults.baseURL='https://hunt-mediass.vercel.app/';
axios.defaults.withCredentials=true;
  return (
    <div className="container ">
      <h2>Daily Run Rate</h2>
      <div>
        <Button>Add New</Button>
      </div>
      <div>
      <Table/>
      </div>
    </div>
  );
}

export default App;
