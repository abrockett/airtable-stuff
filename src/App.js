import React from 'react';
import logo from './logo.svg';
import './App.css';
import './slant.css';
import Airtable from 'airtable';

const config = {
  base: 'BASE',
  table: 'Surveys',
  view: 'Grid',
  apiKey: 'API_KEY',
  maxRecords: 20
}

var base = new Airtable({ apiKey: 'keyrpYdBivLIIg4Ep' }).base('app7neTLSxES87Wp9');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { records: [] };
  }

  async componentDidMount() {
    //await this.fetchAirtable()
    base('Surveys').select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 3,
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
  
      records.forEach(function(record) {
          console.log('Retrieved', record.get('Id'));
      });
  
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
  
    }, function done(err) {
      if (err) { console.error(err); return; }
    });

    base('Surveys').create({
      "Results": "1. Testing\n2. One\n3. Two\n4. Three",
      "Email": "abrockett@testing.com",
      "Name": "AB",
      "SurveyDate": "2017-09-04"
    }, function(err, record) {
        if (err) { console.error(err); return; }
        console.log(record.getId());
    });
  }

  // async fetchAirtable() {
  //   var resp = await fetch(request).catch(err => {console.log(err)})
  //   if(resp.status >= 200 && resp.status < 300) {
  //     var json = await resp.json()
  //     const {records} = json;
  //     this.setState({ records });
  //   }
  // }



  render() {
    var {records} = this.state
    return (

      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
    
        <div>
        {records && records.length > 0 ? records.map(record =>
          <p>{JSON.stringify(record)}</p>
        ) : <p>Double-check that you have added your API key to .env.</p>}
        </div>
      </div>
    );
  }
}

export default App;
