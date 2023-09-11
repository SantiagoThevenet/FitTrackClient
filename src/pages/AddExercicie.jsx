import { useForm } from "react-hook-form";
import { postPrueba, searchExercice } from "../api/wgerApi";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddExercicie() {
  const { register, handleSubmit } = useForm();
  const [exercice, setExercice] = useState("");
  const [suggestExercice, setSuggestExercice] = useState([]);
  const [postExercice, setPostExercice] = useState(null)


  const navigate = useNavigate()
  const {selectedExerciseDayId} = useParams()

  const onSubmit = handleSubmit((data) => {
    data.exercice = exercice
    data.base_id = postExercice.data.base_id
    data.exercieDayId = selectedExerciseDayId
    const response = postPrueba(data)
    if (response) navigate("/routines")

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
    setPostExercice(suggestExercice[id])
    setSuggestExercice([])
  }

  return (
    <div className="flex h-screen bg-stone-950 flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-stone-200">
          Add Exercice
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="exercice"
              className="block text-sm font-medium leading-6 text-stone-200"
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
                className="block w-full rounded-md border-0 py-1.5 text-stone-900 bg-stone-100 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
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
                htmlFor="weight"
                className="block text-sm font-medium leading-6 text-stone-200"
              >
                Weight
              </label>
            </div>
            <div className="mt-2">
              <input
                type="number"
                autoComplete="on"
                {...register("weight", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-stone-900 bg-stone-100 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="sets"
                className="block text-sm font-medium leading-6 text-stone-200"
              >
                Sets
              </label>
            </div>
            <div className="mt-2">
              <input
                type="number"
                autoComplete="on"
                {...register("sets", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-stone-900 bg-stone-100 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="repetitions"
                className="block text-sm font-medium leading-6 text-stone-200"
              >
                Repetitions
              </label>
            </div>
            <div className="mt-2">
              <input
                type="number"
                autoComplete="on"
                {...register("repetitions", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-stone-900 bg-stone-100 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="rir"
                className="block text-sm font-medium leading-6 text-stone-200"
              >
                RIR
              </label>
            </div>
            <div className="mt-2">
              <input
                type="number"
                autoComplete="on"
                {...register("rir", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-stone-900 bg-stone-100 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
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
