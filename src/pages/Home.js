import React from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import {Line} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';

import { ENDPOINT } from '../constants/token';
import { rest } from '../authentication/tokenConfig';

class Home extends React.Component {

    data = {
        labels: [
            'Red',
            'Green',
            'Yellow'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
        }]
    };

    data2 = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      };

    state = {dados: []}

    componentDidMount = () =>{
        console.log(localStorage.getItem("access_token"))
        rest('').get(`${ENDPOINT}/company`);
    }

    render(){
        return(
        <div>
            <Container fixed >
                <Grid container spacing={8}>
                    <Grid item xs={6}>
                        <Card >
                            <Pie data={this.data} />
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card >
                            <Line data={this.data2} />
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
        )
    }

}

export default Home;
