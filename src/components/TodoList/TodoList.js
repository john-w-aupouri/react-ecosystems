import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NewTodoForm from '../NewTodoForm/NewTodoForm';
import TodoListItem from '../TodoListItem/TodoListItem';
import { 
  loadTodos, 
  removeTodoRequest, 
  markTodoAsCompletedRequest 
} from '../../redux/thunks';
import { 
  getTodosLoading, 
  getCompletedTodos, 
  getIncompleteTodos 
} from '../../redux/selectors';
import styled from 'styled-components';

// styles
const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`

const TodoList = ({ completedTodos, incompleteTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
  
  const loadingMessage = <div>Loading todos</div>
  const content = (
    <ListWrapper>
      <NewTodoForm />
      <h3>Incomplete:</h3>
      {incompleteTodos.map((todo, key) => 
        <TodoListItem 
          key={key}
          todo={todo} 
          onRemovePressed={onRemovePressed} 
          onCompletedPressed={onCompletedPressed}
        />
      )}
      <h3>Completed:</h3>
      {completedTodos.map((todo, key) => 
        <TodoListItem 
          key={key}
          todo={todo} 
          onRemovePressed={onRemovePressed} 
          onCompletedPressed={onCompletedPressed}
        />
      )}
    </ListWrapper>
  );
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state)
});

const mapDispatchToProps = dispatch => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: id => dispatch(removeTodoRequest(id)),
  onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
