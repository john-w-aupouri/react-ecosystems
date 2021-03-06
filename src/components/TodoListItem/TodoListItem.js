import React from 'react';
import styled from 'styled-components';

// styles
const TodoItemContainer = styled.div`
  background: #fff;
	border-radius: 8px;
	margin-top: 8px;
	padding: 16px;
	position: relative;
	box-shadow: 0 4px 8px grey;
`;
const TodoItemContainerWithWarning = styled(TodoItemContainer)`
  border-bottom: ${props => (new Date(props.createdAt) > new Date(Date.now() - 8640000 * 1) // if older than a day
    ? 'none'
    : '2px solid red')};
`;
const ButtonsContainer = styled.div`
  position: absolute;
	right: 12px;
	bottom: 12px;
`;
const CompletedButton = styled.button`
  font-size: 16px;
	padding: 8px;
	border: none;
	border-radius: 8px;
	outline: none;
	cursor: pointer;
  display: inline-block;
	background-color: #22ee22;
`;
const RemoveButton = styled.button`
  font-size: 16px;
	padding: 8px;
	border: none;
	border-radius: 8px;
	outline: none;
	cursor: pointer;
  display: inline-block;
	background-color: #ee2222;
	margin-left: 8px;
`;

const todoListItem = ({ todo, onRemovePressed, onCompletedPressed }) => {
  const Container = todo.isCompleted ? TodoItemContainer : TodoItemContainerWithWarning
  return(
    <Container createdAt={todo.createdAt}>
      <h3>{todo.text}</h3>
      <p>
        Created at:&nbsp;
        {(new Date(todo.createdAt)).toDateString()}
      </p>
      <ButtonsContainer>
        {
          todo.isCompleted ? null : 
          <CompletedButton
            className="completed-button"
            onClick={() => onCompletedPressed(todo.id)}
          >
            Mark As Completed
          </CompletedButton>
        }
        <RemoveButton onClick={() => onRemovePressed(todo.id)}>
          Remove
        </RemoveButton>
      </ButtonsContainer> 
    </Container>
  );
}

export default todoListItem;
