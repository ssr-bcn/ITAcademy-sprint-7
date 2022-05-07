import StyledBudgetListItem from "./BudgetListItem.styles";

const BudgetListItem = ( {data} ) => {
  return (
    <StyledBudgetListItem>
      <div>
        <h4>{data.budgetName}<span>{data.date.toLocaleString()}</span></h4>
        <p>Pressupost realitzat pel client {data.client}:</p>
        <ul>
          {
            Boolean(data.web) &&
            <li>
              {data.web}<br/>
              {data.pages} pàgines en {data.languages} idiomes: {data.pages * data.languages * 30}€
            </li>
          }
          {
            Boolean(data.seo) &&
            <li>{data.seo}</li>
          }
          {
            Boolean(data.ads) &&
            <li>{data.ads}</li>
          }
          <li>Total: {data.budget}€</li>
        </ul>
      </div>
    </StyledBudgetListItem>
  );
}

export default BudgetListItem;
