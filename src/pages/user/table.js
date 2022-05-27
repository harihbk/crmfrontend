import React from 'react'
import MaterialTable from 'material-table';

export default function Table({ ...props } ) {
    const { _columns , title , actions , _data} = props
  return (
    <MaterialTable title={title} columns = {_columns} actions={actions} data ={_data}/>

  )
}
