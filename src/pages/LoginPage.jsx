import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit
  } = useForm();
  
  const {loginAuth, isAuthenticated} = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    loginAuth(data)
  })
  useEffect(() => {
    console.log(isAuthenticated,123)
    if (isAuthenticated) navigate("/tasks")
  }, [isAuthenticated])

  return (
    <div className="flex h-[85vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-50">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-50"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                {...register("email", {required: true})}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-50"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                {...register("password", {required: true})}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
