import { Line } from "react-chartjs-2";
import { useContext } from "react";
import { dataContext } from "../../dataState";
import classes from './NPV_discountRateChart.component.module.css'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
} from 'chart.js'

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
)

// const media_query = window.matchMedia("(max-width: 1024px)")
// let responsiveness = true

// const media_query_check = (media_condition)=>{
//     if (media_condition.matches){
//         responsiveness = false
//     }
//     else {
//         responsiveness = true
//     }
// }
// media_query_check(media_query)
// window.addEventListener("resize", ()=>{
// media_query_check(media_query)
// })



function NPV_discrate(){
    const {project_NPV} = useContext(dataContext)
    const labels = project_NPV.project_1.map(pair => pair.discount_rate)
    const NPV_1 = project_NPV.project_1.map(pair => pair.NPV)
    const NPV_2 = project_NPV.project_2.map(pair => pair.NPV)
    const data = {
        labels: labels,
        datasets : [{
            label: 'Project 1 NPV ',
            data: NPV_1,
            backgroundColor: 'grey',
            borderColor: 'grey',
            pointBorderColor: 'grey',
            borderWidth: 2,
            pointRadius: 2,  
            tension: 0.6
        },
            {label: 'Project 2 NPV ',
            data: NPV_2,
            backgroundColor: 'white',
            borderColor: 'white',
            pointBorderColor: 'white',
            pointRadius: 2,
            borderWidth: 2,
            tension: 0.6
        } 
    
    ]
    }

    const options = {
        responsive: true,
        plugins:{
            legend: {
                display: true,
                position: "right",
                labels: {
                    font: {
                        size: 20,
                        family: "Agdasima"
                        
                    },
                    color: "white"  
                }
                
            }
        },

        scales: {
            y: {
                min: NPV_1[NPV_1.length -1] < NPV_2[NPV_1.length -1] ? NPV_1[NPV_1.length -1]/2 : NPV_2[NPV_1.length -1]/2,
                max: NPV_1[0] > NPV_2[0] ? NPV_1[0] : NPV_2[0],
                title: {
                    display: true,
                    text: "NPV",
                    font: {
                        size: 30,
                        family: "Agdasima"
                        
                    },
                    color: "white"     
                },
                ticks: {
                    font: {
                        size: 18,
                        family: "Agdasima"
                    },
                    color: "white"
                },
                grid: {
                    color: "rgb(64, 64, 64)",
                    lineWidth: 1
                    
                }
            },

            x:{
                title:{
                    display: true,
                    text: "Discount Rates",
                    font: {
                        size: 30,
                        family: "Agdasima"
                        
                    },
                    color: "white"
                    
                },
                ticks: {
                    font: {
                        size: 18,
                        family: "Agdasima"
                    },
                    color: "white"
                },
                grid: {
                    color: "rgb(64, 64, 64)",
                    lineWidth: 2
                    
                }
            },

            

           
        }

       
        
    }
    return(
        <div className={classes.chart_container}>
            <h2>NPV by Discount Rates of 2 Different Projects</h2>
            <div className={classes.canvas}>
                <Line data = {data} options = {options}/>
            </div>
            
        </div>
    )
    
  
}


export default NPV_discrate