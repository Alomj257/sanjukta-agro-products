import React from 'react';
import DataTable from 'react-data-table-component';

const CustomDataTable = ({ columns, data, customStyles }) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      customStyles={customStyles}
      pagination
      sortable
      highlightOnHover
      responsive
    />
  );
};

export default CustomDataTable;
