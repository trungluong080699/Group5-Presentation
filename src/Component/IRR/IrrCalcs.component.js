import {useContext} from 'react'
import { dataContext } from '../../dataState'
import NPV_discrate from '../NPV/NPV_discountRateChart'
import classes from './IrrCalcs.component.module.css'



function IrrCalculation(){
    const data = useContext(dataContext)
    return (
        <div>
           
            <div className={classes.container}>
                <div className={classes.form_container}>
                    <h2>Project 1</h2>
                    <form>
                    {data.project1.map(cash_flow => {
                        return (
                            <div className={classes.cashflow} key={cash_flow.cash_flow}>
                                <label className={classes.label} htmlFor={cash_flow.cash_flow}>{cash_flow.cash_flow}</label>
                                <input placeholder={cash_flow.value} onKeyDown={(event)=>{data.addCashFlow_1(cash_flow, event)}} name={cash_flow.cash_flow} />
                            </div>
                            );
               
                     })}
                    </form>
                </div>

                <div className={classes.form_container}>
                    <h2>Project 2</h2>
                    <form>
                        {data.project2.map(cash_flow => {
                            return (
                                <div className={classes.cashflow} key={cash_flow.cash_flow}>
                                <label className={classes.label} htmlFor={cash_flow.cash_flow}>{cash_flow.cash_flow}</label>
                            <   input  placeholder={cash_flow.value} onKeyDown={(event)=>{data.  addCashFlow_2(cash_flow, event)}} name={cash_flow.cash_flow} />
                            </div>
                    );
               
                    })}
              
                </form>

                </div>
               

               
            </div>
            <div className={classes.table_container}>
                <table>
                    <tr>
                        <th className={classes.empty}></th>
                        <th><div>IRR</div></th>
                        <th><div>NPV</div></th>
                        
                    </tr>
                    <tr>
                        <td><div>Project 1</div></td>
                        <td><div>{Math.round(data.IRR_NPV.project_1[1].NPV * 100)/100}</div></td>
                        <td><div>{`${Math.round(data.IRR_NPV.project_1[0].IRR*10000)/100}%`}</div></td>
                    </tr>
                    <tr>
                        <td><div>Project 2</div></td>
                        <td><div>{Math.round(data.IRR_NPV.project_2[1].NPV * 100)/100}</div></td>
                        <td><div>{`${Math.round(data.IRR_NPV.project_2[0].IRR*10000)/100}%`}</div></td>
                    </tr>
                    <tr>
                        <td>
                        Discount Rate: <input onKeyDown={(event)=>{
                            data.calculatingNPVandIRR(event)
                        }} onChange={(event)=>{data.onChangeDiscountRate(event)}} />
                        </td>
                     
                    </tr>
                
                </table>
            </div> 

            
            <div className={classes.changing_dataset}>
                <label>Change Dataset</label>
                <select onChange={(event)=>{
                   data.onChangeDataset(event)
                }}>
                    <option value="dataset 1">Dataset 1</option>
                    <option value="dataset 2">Dataset 2</option>
                    <option value="dataset 3">Dataset 3</option>
                </select>
            </div>
            

            <NPV_discrate/>
            
        </div>
    );
        
    


}

export default IrrCalculation