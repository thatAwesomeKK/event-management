import SignInForm from "@/components/Forms/SignInForm";
import { getAuthSession } from "@/lib/config/authOptions";
import Link from "next/link";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getAuthSession();
  if (session?.user) redirect("/");
  
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="mb-10">
        <h1 className="font-bold text-5xl mb-2 text-primary">SignIn</h1>
        <p className="text-gray-400 text-sm text-center">
          Not a User?
          <Link className="text-blue-500 hover:text-blue-400" href="/signup">
            Click Here
          </Link>
        </p>
      </div>
      <SignInForm />
    </main>
  );
};

export default SignIn;
