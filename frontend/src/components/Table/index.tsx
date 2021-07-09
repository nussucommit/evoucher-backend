import React from "react";
import { Table as AntTable, TableProps } from "antd";

import "antd/dist/antd.css";

type Props<DataType> = TableProps<DataType> & {
    // props to be extended with
};

const Table = <DataType extends object>({
    dataSource,
    columns,
    ...rest
}: Props<DataType>) => {
    return <AntTable dataSource={dataSource} columns={columns} {...rest} />;
};

export default Table;
