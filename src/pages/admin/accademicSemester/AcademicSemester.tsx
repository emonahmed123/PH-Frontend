import React from "react";
import { useGetAllSemestersQuery } from "../../../redux/features/accedemicSemster/accedemicSemsterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>this is Ecademic</h1>
    </div>
  );
};

export default AcademicSemester;
