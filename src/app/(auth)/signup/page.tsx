import SignUpForm from "@/components/Forms/SignUpForm";
import Link from "next/link";
const SignUp = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="mb-10">
        <h1 className="font-bold text-5xl mb-2 text-primary">SignUp</h1>
        <p className="text-gray-400 text-sm text-center">
          Already A User?
          <Link className="text-blue-500 hover:text-blue-400" href="/signin">
            Click Here
          </Link>
        </p>
      </div>
      <SignUpForm />
    </main>
  );
};

export default SignUp;
