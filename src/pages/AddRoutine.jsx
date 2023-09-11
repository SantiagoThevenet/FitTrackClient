import { useForm } from "react-hook-form";
import { createNewRoutine } from "../api/wgerApi";
import { useNavigate } from "react-router-dom";


function AddExercicie() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    data.training = 333386
    createNewRoutine(data)
    navigate("/routines")
  });

  const daysOfWeek = [
    { name: "Monday", number: 1 },
    { name: "Tuesday", number: 2 },
    { name: "Wednesday", number: 3 },
    { name: "Thursday", number: 4 },
    { name: "Friday", number: 5 },
    { name: "Saturday", number: 6 },
    { name: "Sunday", number: 7 },
  ];
  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-stone-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-stone-200">
          Add Routine
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-stone-200"
              >
                Title
              </label>
            </div>
            <div className="mt-2">
              <input
                type="text"
                autoComplete="on"
                {...register("description", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            {daysOfWeek.map((day, index) => (
              <div className="flex items-center gap-2" key={index}>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="day"
                    className="block text-sm font-medium leading-6 text-stone-200"
                  >
                    {day.name}
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    value={day.number}
                    {...register("day", { required: true })}
                  />
                </div>
              </div>
            ))}
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-stone-800 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-50 shadow-sm hover:bg-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Add Exercice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExercicie;
