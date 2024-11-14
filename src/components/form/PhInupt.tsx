import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
type TInputProps = {
  type: string;
  registers: string;
  label?: string;
};

const PhInupt = ({ type, registers, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={registers}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={registers}
              // {...register(registers)}
            />
            {error && <small>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhInupt;
