import { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';

function ManageExpenses({route, navigation}) {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId; //!! converts value into boolean falsy value into false and truthy value into true

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

 
  function deleteExpenseHandler(){
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(){
    if (isEditing){
      expensesCtx.updateExpense(
        editedExpenseId,
        {
          description: 'Test!!!', 
          amount: 29.99, 
          date: new Date('2022-05-20')
        }
      );
    } else {
      expensesCtx.addExpense({
        description: 'Test', 
        amount: 19.99, 
        date: new Date('2022-05-19')
      }
      );
    }
    navigation.goBack();
  }

  return (
  <View style={styles.container}>
    <View style={styles.buttons}>
      <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
      <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
    </View>
    {isEditing && (
      <View style={styles.deleteContainer}>
      <IconButton 
        icon="trash" 
        color={GlobalStyles.colors.error500} 
        size={36} 
        onPress={deleteExpenseHandler}
      />
      </View>
    )}
  </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary500
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    midWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});