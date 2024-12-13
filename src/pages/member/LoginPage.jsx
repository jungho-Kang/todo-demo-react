import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .required("이메일은 필수입니다.")
    .email("올바른 이메일 형식이 아닙니다."),
  pw: yup
    .string()
    .required("비밀번호는 필수입니다.")
    .min(8, "비밀번호는 8자 이상입니다.")
    .max(16, "비밀번호는 16자까지 가능합니다.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
    ),
});

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = data => {
    console.log("전송시 데이터 ", data);
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>이메일</label>
          <input {...register("email")} />
          {errors.email && <div>{errors.email.message}</div>}
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" {...register("pw")} />
          {errors.pw && <div>{errors.pw.message}</div>}
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
        <div>
          <Link to="">비밀번호 찾기 | </Link>
          <Link to="">이메일 찾기 | </Link>
          <Link to="/member">회원가입하기</Link>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
