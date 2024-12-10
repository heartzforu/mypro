import { Box, Button, List, ListItem, TextField } from '@mui/material'
import React, { useState } from 'react'

function Expense() {

    const [description,setDescription]=useState('')
    const [amount,setAmount]=useState('')
    const [date,setDate]=useState('')
    const [expenses,setExpenses]=useState([])
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(description && amount && date){
            const newExpense={description,amount:parseFloat(amount),date}
            setExpenses([...expenses,newExpense])
            setDescription('')
            setAmount('')
            setDate('')
        }
    }
    const deleteExpense=(index)=>{
        setExpenses(expenses.filter((_,i)=>i!==index))
    }
  return (
    <Box>
        <Box className=''>
            <form onSubmit={handleSubmit}>
      
                <TextField type='text' value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Description'/>
                <TextField type='number' value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder='Amount'/>
                <TextField type='date' value={date} onChange={(e)=>setDate(e.target.value)} placeholder='Date'/>
                <Button variant='contained' type='submit'>Add</Button>

                
            </form>
        </Box>
        <Box>
            <List>
                {expenses.map((expense,index)=>(
                    <ListItem key={index}>
                        <span>{expense.description}-${expense.amount.toFixed(2)} on {new Date(expense.date).toLocaleDateString()}</span>
                        <Button variant='contained' onClick={()=>deleteExpense(index)}>
                            Delete
                        </Button>
                    </ListItem>
                ))
                }
            </List>
        </Box>
    </Box>
  )
}

export default Expense
