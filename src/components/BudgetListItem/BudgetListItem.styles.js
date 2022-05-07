import styled from 'styled-components';

const StyledBudgetListItem = styled.li`
  margin: 0.3rem 0;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    background-color: #eee;
  }

  & > div:first-child {

    & h4 {
      display: flex;
      justify-content: space-between;
      margin: 0 0 0.5rem 0;
      padding-bottom: 0.3rem;
      border-bottom: 1px solid #ddd;

      & span {
        font-weight: normal;
        color: #999;
      }
    }

    & p {
      margin: 0 0 0.5rem;
    }

    & ul {
      padding: 0 0 0 1rem;
      list-style: circle;

      li {
        margin: 0;
        font-size: 0.8em;

        &:last-child {
          list-style: none;
          margin: 0.5rem 0 0 -1rem;
          font-size: 1em;
          font-weight: bold;
          color: #666;
        }
      }
    }
  }
`;

export default StyledBudgetListItem;
