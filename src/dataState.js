import {useReducer, useEffect, createContext, useState} from 'react'
import IrrCalculation from './Component/IRR/IrrCalcs.component'

export const dataContext = createContext()

const datasets = {
    dataset_1: [
        {cash_flow: "cash_flow_0", value: -526},
        {cash_flow: "cash_flow_1", value: 125},
        {cash_flow: "cash_flow_2", value: 140},
        {cash_flow: "cash_flow_3", value: 149},
        {cash_flow: "cash_flow_4", value: 155},
        {cash_flow: "cash_flow_5", value: 161}
    ],
    dataset_2: [
        {cash_flow: "cash_flow_0", value: -17000},
        {cash_flow: "cash_flow_1", value: 16000},
        {cash_flow: "cash_flow_2", value: 16000},
        {cash_flow: "cash_flow_3", value: 16000},
        {cash_flow: "cash_flow_4", value: 16000},
        {cash_flow: "cash_flow_5", value: -52000}
    ],
    dataset_3: [
        {cash_flow: "cash_flow_0", value: -526},
        {cash_flow: "cash_flow_1", value: 200},
        {cash_flow: "cash_flow_2", value: 175},
        {cash_flow: "cash_flow_3", value: 149},
        {cash_flow: "cash_flow_4", value: 155},
        {cash_flow: "cash_flow_5", value: 161}
    ],
    
    

}


const reducer_1 = (state, action)=>{
    return state.map(cash_flow =>{
        if (cash_flow.cash_flow === action.cash_flow){
            return {...cash_flow, value: action.value}
        }
        else {return cash_flow}
    })
}

const reducer_2 = (state, action)=>{
    if (action.trigger === "manual_input"){
        return state.map(cash_flow =>{
            if (cash_flow.cash_flow === action.cash_flow){
                return {...cash_flow, value: action.value}
            }
            else {return cash_flow}
        })
    }
    else{
        return action.value
    }
   
}


const reducer_3 = (state, action) =>{
    const project_1_arr = state.project_1.map(pair =>{
        if (pair.discount_rate === action.project_1.discount_rate){
            return {...pair, NPV: action.project_1.NPV}
        }
        else {
            return pair
        }
    })
    const project_2_arr = state.project_2.map(pair =>{
        if (pair.discount_rate === action.project_2.discount_rate){
            return {...pair, NPV: action.project_2.NPV}
        }
        else {
            return pair
        }
    })
    return {project_1: project_1_arr, project_2: project_2_arr}
}

const reducer_4 = (state, action) =>{
    return {project_1: [{IRR: action.project_1[0].IRR}, {NPV: action.project_1[1].NPV}], project_2: [{IRR: action.project_2[0].IRR}, {NPV: action.project_2[1].NPV}]}
}




const NPV = (project, disc_rate)=>{
    let NPV = 0
    for (let k =0; k<project.length; k++){
        NPV= NPV + (project[k].value / Math.pow((1+disc_rate), k))
    }
    return NPV
}

let i = 0 
let discRate_list = []
while (i < 1){
    discRate_list.push(Math.round(i * Math.pow(10, 3))/Math.pow(10,3))
    i = i+0.01
    
}

const project1_NPV_discrate = discRate_list.map(rate =>{
    return {discount_rate: rate, NPV: 0}
})

const project2_NPV_discrate = discRate_list.map(rate =>{
    return {discount_rate: rate, NPV: 0}
})


const projectIRR =(project)=>{
    let max = 1.0
    let min = 0.0
    let NPV
    let avg
   do {
        NPV = 0
        avg = (max+min)/2
        for (let i =0; i<project.length; i++){
            NPV= NPV + (project[i].value / Math.pow((1+avg), i))
        }

        NPV > 0 ? min = avg : max = avg
    } while (Math.abs(NPV) > 0.000001)  
    return avg 
}



function DataState(){
    const [project1, addCashFlow_Pro1] = useReducer(reducer_1, [
        {cash_flow: "cash_flow_0", value: -1200},
        {cash_flow: "cash_flow_1", value: 265},
        {cash_flow: "cash_flow_2", value: 315},
        {cash_flow: "cash_flow_3", value: 345},
        {cash_flow: "cash_flow_4", value: 365},
        {cash_flow: "cash_flow_5", value: 385},
    ])

    const [project2, addCashFlow_Pro2] = useReducer(reducer_2, [
        {cash_flow: "cash_flow_0", value: -526},
        {cash_flow: "cash_flow_1", value: 125},
        {cash_flow: "cash_flow_2", value: 140},
        {cash_flow: "cash_flow_3", value: 149},
        {cash_flow: "cash_flow_4", value: 155},
        {cash_flow: "cash_flow_5", value: 161}
    ])

    const [project_NPV, calculatingNPV] = useReducer(reducer_3, {project_1: project1_NPV_discrate, project_2: project2_NPV_discrate})

    const [IRR_NPV, calculating] = useReducer(reducer_4, {project_1: [{IRR: 0}, {NPV: 0}], project_2: [{IRR: 0}, {NPV: 0}] })


    const [discount, setDiscountRate] = useState(0.05)

    const onChangeDataset = (event)=>{
        if (event.target.value === "dataset 1"){
            addCashFlow_Pro2({trigger: "dataset changed", value: datasets.dataset_1})
        }
        else if (event.target.value === "dataset 2"){
            addCashFlow_Pro2({trigger: "dataset changed", value: datasets.dataset_2})
        }
        else{
            addCashFlow_Pro2({trigger: "dataset changed", value: datasets.dataset_3})
        }
    }


  

    useEffect(()=>{
        let i = 0
        while (i<1){
            const pro1NPV = NPV(project1, Math.round(i * Math.pow(10, 3))/Math.pow(10,3))
            const pro2NPV = NPV(project2, Math.round(i * Math.pow(10, 3))/Math.pow(10,3))
            calculatingNPV({project_1: {discount_rate: Math.round(i * Math.pow(10, 3))/Math.pow(10,3), NPV: pro1NPV}, project_2: {discount_rate: Math.round(i * Math.pow(10, 3))/Math.pow(10,3) , NPV: pro2NPV} })
           i = i+ 0.01
           
           
        }

    }, [project1, project2])

  


    const addCashFlow_1 = (cash_flow, event)=>{
        if (event.keyCode === 13){
            addCashFlow_Pro1({cash_flow: cash_flow.cash_flow, value: parseInt(event.target.value)})
        }
       
    }
    const addCashFlow_2 = (cash_flow, event)=>{
        if (event.keyCode === 13){
            addCashFlow_Pro2({trigger: "manual_input", cash_flow: cash_flow.cash_flow, value: parseInt(event.target.value)})
        }
        
    }

        const calculatingNPVandIRR = (event)=>{
            if (event.keyCode === 13){
                const project_1_NPV = NPV(project1, discount)
                const project_2_NPV = NPV(project2, discount)
                const project_1_IRR = projectIRR(project1)
                const project_2_IRR = projectIRR(project2)
                calculating({project_1: [{IRR: project_1_IRR}, {NPV: project_1_NPV}], project_2: [{IRR: project_2_IRR}, {NPV: project_2_NPV}]})
            }
        
    } 

    const onChangeDiscountRate = (event)=>{
        setDiscountRate(parseFloat(event.target.value))
        
        
    }

    return (
        <dataContext.Provider value = {{project1: project1, project2: project2, projectIRR: projectIRR, addCashFlow_1: addCashFlow_1, addCashFlow_2: addCashFlow_2,  project_NPV: project_NPV, IRR_NPV: IRR_NPV, calculatingNPVandIRR: calculatingNPVandIRR, onChangeDiscountRate: onChangeDiscountRate,onChangeDataset: onChangeDataset, discount_rate: discount }}>
            <IrrCalculation/>
        </dataContext.Provider>
    )

}

export default DataState
