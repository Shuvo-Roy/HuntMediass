import { Button } from 'react-bootstrap';
import Table from './Table';
function App() {
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
