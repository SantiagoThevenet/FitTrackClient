import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
function RegisterPage() {
  const {
    register,
    handleSubmit
  } = useForm();
  
  const {registerAuth, isAuthenticated} = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) navigate('/routines')
  }, [isAuthenticated])

  const onSubmit = handleSubmit((data) => {
    registerAuth(data)
  })
  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-stone-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-stone-100">
          Sign up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-stone-100"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register("username", {required: true})}
                className="block w-full rounded-md border-0 py-1.5 bg-stone-100 text-stone-100 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-stone-100"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                {...register("email", {required: true})}
                className="block w-full rounded-md border-0 py-1.5 bg-stone-100 text-stone-100 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-stone-100"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                autoComplete="on"
                {...register("password", {required: true})}
                className="block w-full rounded-md border-0 py-1.5 bg-stone-100 text-stone-100 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-stone-800 px-3 py-1.5 text-sm font-semibold leading-6 text-stone-100 shadow-sm hover:bg-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
