import React from 'react'
import './winnerList.css'

const WinnerList = ({winnerList=[]}) => {
    return (
        <div className='winnerList'style={{color:"#fff"}}>
            <h1>Winners List :</h1>
                {winnerList.length>0?(<>
                    {winnerList.map((winner,index)=>{
                        return<div className='winner'><span className='order'>{index+1}</span><span>{winner}</span></div>
                    })}
                            </>) :null}
                                </div>
    )
}

export default WinnerList

