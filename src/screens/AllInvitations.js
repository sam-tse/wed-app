import React, { Component } from 'react'
import AllInvitationQuery from '../components/graphql/AllInvitationsQuery'
import ReactTable from "react-table"
import "react-table/react-table.css"

export default class AllInvitations extends Component {


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
                  getTdProps={(state, rowInfo, column, instance) => {
                    return {
                      onClick: (e, handleOriginal) => {
                        if (column.Header === 'Response' && rowInfo.original.comment.length > 0) {
                          alert("\"" + rowInfo.original.comment + "\" -" + rowInfo.original.name)
                        }
                        // console.log('A Td Element was clicked!')
                        // console.log('it produced this event:', e)
                        // console.log('It was in this column:', column)
                        // console.log('It was in this row:', rowInfo)
                        // console.log('It was in this table instance:', instance)

                        // IMPORTANT! React-Table uses onClick internally to trigger
                        // events like expanding SubComponents and pivots.
                        // By default a custom 'onClick' handler will override this functionality.
                        // If you want to fire the original onClick handler, call the
                        // 'handleOriginal' function.
                        if (handleOriginal) {
                          handleOriginal()
                        }
                      }
                    }
                  }}
                  columns={[
                    {
                      Header: "Code",
                      id: 'code',
                      accessor: "code",
                      Footer: (table) => (
                        <span>
                          <strong>
                            {table.data.length} entries
                          </strong>
                        </span>
                      )
                    },
                    {
                      Header: "Name",
                      id: 'name',
                      accessor: d => `${d.name} (${d.maxNumberOfAdults}/${d.maxNumberOfInfants})`,
                      Footer: (table) => {
                        let csv = ''
                        let csv2 = ''
                        table.data.forEach( d => {
                          csv += `${d.code} ${d._original.name} (${d._original.numberOfAdults}/${d._original.numberOfInfants}),`
                        })
                        console.log('names v1', csv)
                        console.log('names v2', csv2)
                        console.log(table)
                      }
                    },
                    {
                      Header: "Belong To",
                      id: 'belongTo',
                      accessor: "belongTo"
                    },
                    {
                      Header: "Table",
                      id: 'table',
                      accessor: d => Number.isInteger(`${d.table}`) ? parseInt(`${d.table}`) : `${d.table}`,
                      filterMethod: (filter, row) => row[filter.id] === filter.value
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
                    {
                      Header: "Response",
                      id: 'response',
                      accessor: d => {
                        let reply = ''

                        if (d.isSubmitted) {
                          if (d.ceremony || d.dinner) {
                            reply = 'Yes - '
                            reply += d.ceremony ? 'cer ' : ''
                            reply += d.dinner ? 'din ' : ''
                            reply += ` (${d.numberOfAdults}/${d.numberOfInfants}) / `
                            reply += d.comment ? `${d.comment}` : ''
                          } else {
                            reply = 'No - Not attending'
                          }
                        } else {
                          reply = "Waiting for response"
                        }
                        return reply
                      },
                      Footer: (table) => (
                        <span>
                          <strong>
                            Ceremony ({this.sum(table.data, 'numberOfAdults', 'ceremony')}/{this.sum(table.data, 'numberOfInfants', 'ceremony')}),  
                            Dinner ({this.sum(table.data, 'numberOfAdults', 'dinner')}/{this.sum(table.data, 'numberOfInfants', 'dinner')})
                          </strong>
                        </span>
                      )
                    },
                  ]}
                  defaultSorted={[
                    {
                      id: "response",
                      desc: true
                    }
                  ]}
                  defaultPageSize={12}
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