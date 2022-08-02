import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of sneakers',
    amount: 59.99,
    date: new Date('2021-08-02')
  },
  {
    id: 'e2',
    description: 'Netflix Subscription',
    amount: 29.99,
    date: new Date('2021-08-03'),
  },
  {
    id: 'e3',
    description: 'Spotify Subsciption',
    amount: 9.99,
    date: new Date('2021-08-04'),
  },
  {
    id: 'e4',
    description: 'Apple Music Subscription',
    amount: 19.99,
    date: new Date('2021-08-05'),
  },
  {
    id: 'e5',
    description: 'Book',
    amount: 18.59,
    date: new Date('2021-08-06'),
  },
  {
    id: 'e6',
    description: 'A pair of sneakers',
    amount: 59.99,
    date: new Date('2022-08-02')
  },
  {
    id: 'e7',
    description: 'Netflix Subscription',
    amount: 29.99,
    date: new Date('2022-08-03'),
  },
  {
    id: 'e8',
    description: 'Spotify Subsciption',
    amount: 9.99,
    date: new Date('2022-08-04'),
  },
  {
    id: 'e9',
    description: 'Apple Music Subscription',
    amount: 19.99,
    date: new Date('2022-08-05'),
  },
  {
    id: 'e10',
    description: 'Book',
    amount: 18.59,
    date: new Date('2022-08-06'),
  },
  {
    id: 'e11',
    description: 'A pair of sneakers',
    amount: 59.99,
    date: new Date('2022-08-02')
  },
  {
    id: 'e12',
    description: 'Netflix Subscription',
    amount: 29.99,
    date: new Date('2022-08-03'),
  },
  {
    id: 'e13',
    description: 'Spotify Subsciption',
    amount: 9.99,
    date: new Date('2022-08-04'),
  },
  {
    id: 'e14',
    description: 'Apple Music Subscription',
    amount: 19.99,
    date: new Date('2022-08-05'),
  },
  {
    id: 'e15',
    description: 'Book',
    amount: 18.59,
    date: new Date('2022-08-06'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, {description, amount, date}) => {}
});

//reducer functions job is to return a new state value
function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD': 
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateableExpense = state[updateableExpenseIndex];
      const updatedItem = {...updateableExpense, ...action.payload.data }; //... spread operator
      const updatedExpenses = [...state];
      updatedExpenses[updateableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({children}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense({expenseData}) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id});
  }

  function updateExpense(id, expenseData){
    dispatch({type: 'UPDATE', payload: {id: id, data: expenseData }});
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;