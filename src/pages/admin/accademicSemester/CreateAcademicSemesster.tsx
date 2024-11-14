import { FieldValues, SubmitHandler } from "react-hook-form";
import PhFrom from "../../../components/form/PhFrom";
import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { monthOptions } from "../../../Constans/gobal";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { academicSemesterSchma } from "../../../schema/academicMangementSchema";
import { useAddAcademicSemestersMutation } from "../../../redux/features/admin/accademicMangement.api";
import { toast } from "sonner";

const CreateAcademicSemesster = () => {
  const [addAcademicSemester] = useAddAcademicSemestersMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const name = nameOption[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data.name,
      year: data?.year,
      startMonth: data.start,
      endMonth: data.end,
    };
    try {
      const res = await addAcademicSemester(semesterData);
      console.log(res);
    } catch (error) {
      toast.error("something went wrong ");
    }
  };

  const nameOption = [
    {
      value: "01",
      label: "Autumn",
    },
    {
      value: "02",
      label: "Summer",
    },
    {
      value: "03",
      label: "Fall",
    },
  ];

  const currentYear = new Date().getFullYear();
  console.log(currentYear + 1);
  const yearOptins = [0, 1, 2, 3, 4].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
  }));

  return (
    <Flex justify="center" align="center">
      <Col span={10}>
        <PhFrom
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchma)}
        >
          <PhSelect name="name" label="Name" options={nameOption} />
          <PhSelect name="year" label="Year" options={yearOptins} />
          <PhSelect name="start" label="Start Month" options={monthOptions} />
          <PhSelect name="end" label="End Month" options={monthOptions} />

          <Button htmlType="submit">Submit</Button>
        </PhFrom>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemesster;
