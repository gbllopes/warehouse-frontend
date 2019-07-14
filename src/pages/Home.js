import React from 'react';
import { rest } from '../authentication/tokenConfig';
import { ENDPOINT } from '../constants/token';

class Home extends React.Component {
  constructor(){
    super();
    this.state = {dados: []}
  }
  componentDidMount = () =>{
    console.log(localStorage.getItem("access_token"))
    rest('').get(`${ENDPOINT}/empresa`);
  }

  render(){
    return(
      <div>{JSON.stringify(this.state.dados)}</div>
    )

  }

}

export default Home;
