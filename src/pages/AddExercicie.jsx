import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { searchExercice } from "../api/wgerApi";
import { useState } from "react";

function AddExercicie() {
  const { register, handleSubmit } = useForm();
  const { loginAuth } = useAuth();
  const [exercice, setExercice] = useState("");
  const [suggestExercice, setSuggestExercice] = useState([]);

  const onSubmit = handleSubmit((data) => {
    loginAuth(data);
  });

  const handleChange = async (event) => {
    setExercice(event.target.value);
    if (event.target.value.length > 2) {
      const response = await searchExercice(event.target.value);
      setSuggestExercice(response);
    }
  };
  const selectExercice = (id) => {
    setExercice(suggestExercice[id].value)
    setSuggestExercice([])
    console.log(id)
  }
  return (
    <div className="flex h-[85vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
          Add Exercice
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="exercice"
              className="block text-sm font-medium leading-6 text-gray-800"
            >
              Exercice
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="exercice"
                name="exercice"
                autoComplete="on"
                onChange={handleChange}
                value={exercice}
                // {...register("exercice", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
            <ul className="overflow-y-scroll max-h-40 flex flex-col gap-2 ">
              {suggestExercice.map((sugExercice, index) => (
                <li onClick={() => selectExercice(index)} className="hover:bg-gray-300" key={index}>
                  {sugExercice.value}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="repetitions"
                className="block text-sm font-medium leading-6 text-gray-800"
              >
                Repetitions
              </label>
            </div>
            <div className="mt-2">
              <input
                type="number"
                autoComplete="on"
                {...register("repetitions", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="rir"
                className="block text-sm font-medium leading-6 text-gray-800"
              >
                RIR
              </label>
            </div>
            <div className="mt-2">
              <input
                type="number"
                autoComplete="on"
                {...register("rir", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-50 shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
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
