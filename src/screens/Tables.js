import React, { Component } from 'react'
import AllInvitationQuery from '../components/graphql/AllInvitationsQuery'
import ReactTable from "react-table"
import "react-table/react-table.css"
import _ from 'lodash'

export default class Tables extends Component {


  sum(tableData, prop, event) {
    let sum = 0
    tableData.forEach(data => {
      if (
        event === null ||
        (event != null && event === 'ceremony' && data._original.ceremony === true) ||
        (event != null && event === 'dinner' && data._original.dinner === true)
      ) {
        sum += data._original[prop]
      }
    })
    return sum
  }
  
  render() {
    return (
      <div>
        <div className="codeblock">
          <AllInvitationQuery>
            {({ allInvitations }) =>
              <React.Fragment>
                <ReactTable
                  data={allInvitations}
                  filterable
                  
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]).toLowerCase().indexOf(filter.value.toLowerCase()) != -1}
                  
                  columns={[
                    {
                      Header: "Table",
                      id: 'table',
                      accessor: "table"
                    },
                    {
                      Header: "Code",
                      id: 'code',
                      accessor: "code",
                     
                    },
                    {
                      Header: "Name",
                      id: 'name',
                      accessor: "name",
                      
                    },
                    {
                      Header: "Adults",
                      accessor: "numberOfAdults",
                      aggregate: vals => _.sum(vals),
                    },
                    {
                      Header: "Infants",
                      accessor: "numberOfInfants",
                      aggregate: vals => _.sum(vals),
                    },
                    {
                      Header: "Comment",
                      id: 'comment',
                      accessor: "comment"
                    },
                  
                    // {
                    //   Header: "Submitted?",
                    //   id: 'isSubmitted',
                    //   accessor: d => "" + d.isSubmitted,
                    //   filterMethod: (filter, row) => {
                    //     if (filter.value === "all") {
                    //       return true;
                    //     }
                    //     if (filter.value === "true") {
                    //       return row[filter.id] === 'true';
                    //     }
                    //     return row[filter.id] === 'false';
                    //   },
                    //   Filter: ({ filter, onChange }) =>
                    //     <select
                    //       onChange={event => onChange(event.target.value)}
                    //       style={{ width: "100%" }}
                    //       value={filter ? filter.value : "all"}
                    //     >
                    //       <option value="all">Show All</option>
                    //       <option value="true">Submitted</option>
                    //       <option value="false">Not Submitted</option>
                    //     </select>
                    // },
                   
                  ]}
                 
                  defaultPageSize={12}
                  pivotBy={["table"]}
                  className="-striped -highlight"
                />
              </React.Fragment>
            }
          </AllInvitationQuery>
        </div>
      </div>
    )
  }
}

//<pre>{JSON.stringify(allInvitations, null, 2)}</pre>