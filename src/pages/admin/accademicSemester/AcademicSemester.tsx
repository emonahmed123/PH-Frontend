import { Table, TableColumnsType, TableProps } from "antd";

import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/accademicMangement.api";
import { useState } from "react";
import { TQueryParams } from "../../../types/gobal";

type TDataType = Pick<
  TAcademicSemester,
  "_id" | "name" | "startMonth" | "endMonth" | "year"
>;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>([]);

  const { data: semesterData, isFetching } = useGetAllSemestersQuery(params);
  console.log(semesterData);
  const tableData = semesterData?.data.map(
    ({ _id, name, startMonth, endMonth, year }: TAcademicSemester) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  const columns: TableColumnsType<TDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summer",
          value: "Summer",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: 2024,
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
      ],
    },
    {
      title: "startMonth",
      dataIndex: "startMonth",
    },
    {
      title: "endMonth",
      dataIndex: "endMonth",
    },
  ];

  const onChange: TableProps<TDataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });
      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: item });
      });
      setParams(queryParams);
    }
  };

  return (
    <div>
      <Table<TDataType>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
      />
    </div>
  );
};

export default AcademicSemester;
