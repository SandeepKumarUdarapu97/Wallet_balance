import {createSlice} from '@reduxjs/toolkit';

interface Transaction {
  amount: number;
  type: string;
  date_time: string;
}

interface UserType {
  name: string;
  id: number;
  balance: number;
  last_transaction: Transaction[];
  last_amount_added: number;
}

const initialState = {
  user: {
    data: <UserType[]>[
      {
        name: 'Test1',
        id: 1,
        balance: 100,
        last_transaction: [
          {
            amount: 10,
            type: 'debit',
            date_time: '25/01/2024',
          },
          {
            amount: 10,
            type: 'debit',
            date_time: '24/01/2024',
          },
          {
            amount: 10,
            type: 'debit',
            date_time: '23/01/2024',
          },
        ],
        last_amount_added: 10,
      },
      {
        name: 'Test2',
        id: 2,
        balance: 1000,
        last_transaction: [
          {
            amount: 100,
            type: 'debit',
            date_time: '25/01/2024',
          },
          {
            amount: 110,
            type: 'debit',
            date_time: '24/01/2024',
          },
          {
            amount: 120,
            type: 'debit',
            date_time: '23/01/2024',
          },
        ],
        last_amount_added: 10,
      },
      {
        name: 'Test3',
        id: 3,
        balance: 100,
        last_transaction: [
          {
            amount: 10,
            type: 'debit',
            date_time: '25/01/2024',
          },
          {
            amount: 10,
            type: 'debit',
            date_time: '24/01/2024',
          },
          {
            amount: 10,
            type: 'debit',
            date_time: '23/01/2024',
          },
        ],
        last_amount_added: 10,
      },
      {
        name: 'Test4',
        id: 4,
        balance: 100,
        last_transaction: [
          {
            amount: 10,
            type: 'debit',
            date_time: '25/01/2024',
          },
          {
            amount: 10,
            type: 'debit',
            date_time: '24/01/2024',
          },
          {
            amount: 10,
            type: 'debit',
            date_time: '23/01/2024',
          },
        ],
        last_amount_added: 10,
      },
      {
        name: 'Test5',
        id: 5,
        balance: 100,
        last_transaction: [
          {
            amount: 10,
            type: 'debit',
            date_time: '25/01/2024',
          },
          {
            amount: 10,
            type: 'debit',
            date_time: '24/01/2024',
          },
          {
            amount: 10,
            type: 'debit',
            date_time: '23/01/2024',
          },
        ],
        last_amount_added: 10,
      },
    ],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add: (state, action) => {
      const {id, balance, type, date} = action.payload;

      // Use map to create a new array with updated items
      state.user.data = state.user.data.map(item =>
        item.id === id
          ? {
              ...item,
              balance: item.balance + Number(balance),
              last_transaction: [
                {type, amount: Number(balance), date_time: date},
                ...item.last_transaction,
              ],
              last_amount_added: balance,
            }
          : item,
      );
    },
  },
});

export const {add} = userSlice.actions;
export default userSlice.reducer;
