import { useEffect, useState } from "react";
import ButtonThreDots from "../components/ButtonThreeDots.jsx";
import CircleLoading from "../components/CircleLoading.jsx";
import {
  fetchWorkouts,
  fetchExerciseDays,
  fetchSets,
  fetchSettingSets,
  fetchExerciseBaseInfo,
} from "../api/wgerApi.js";
import { Link } from "react-router-dom";

function TaskPage() {
  const [exerciseDays, setExerciseDays] = useState([]);
  const [exerciceSelected, setExerciceSelected] = useState(0);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(0);
  const [selectedExerciseDayId, setSelectedExerciseDayId] = useState(0);
  const [settingSetId, setSettingSetId] = useState(0);
  const [exerciseBaseId, setExerciseBaseId] = useState([]);
  const [exercices, setExercices] = useState([]);

  useEffect(() => {
    fetchWorkouts()
      .then(({ data }) => {
        setExerciseDays(data.results);
        setSelectedWorkoutId(data.results[0].id);
      })
      .catch((error) => {
        console.error("Error fetching workouts:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedWorkoutId) {
      fetchExerciseDays(selectedWorkoutId)
        .then(({ data }) => {
          setExerciseDays(data.results);
          setSelectedExerciseDayId(data.results[exerciceSelected].id);
        })
        .catch((error) => {
          console.error("Error fetching exercise days:", error);
        });
    }
  }, [selectedWorkoutId, exerciceSelected]);

  useEffect(() => {
    if (selectedExerciseDayId) {
      fetchSets(selectedExerciseDayId)
        .then(({ data }) => {
          setSettingSetId(data.results);
        })
        .catch((error) => {
          console.error("Error fetching setting set:", error);
        });
    }
  }, [selectedExerciseDayId]);

  useEffect(() => {
    if (settingSetId) {
      fetchSettingSets(settingSetId)
        .then((data) => {
          setExerciseBaseId(data);
        })
        .catch((error) => {
          console.error("Error fetching exercise base:", error);
        });
    }
  }, [settingSetId]);

  useEffect(() => {
    if (exerciseBaseId.length > 0) {
      fetchExerciseBaseInfo(exerciseBaseId)
        .then((data) => {
          setExercices(data);
        })
        .catch((error) => {
          console.error("Error fetching exercices:", error);
        });
    }
  }, [exerciseBaseId]);
  function changeRoutine(index) {
    setExerciceSelected(index);
  }
  return (
    <section className="flex justify-center items-center bg-landing-page bg-black-gradient h-[85vh] bg-left-top bg-cover text-gray-800 px-72 ">
      <div className="h-3/4 w-full flex gap-2">
        <section className="w-1/4">
          <h1 className="font-bold text-gray-800">TUS RUTINAS</h1>
          <div className="h-3/4 backdrop-blur-3xl rounded-3xl flex flex-col p-4 border shadow-md">
            {exerciseDays.length > 0 ? (
              exerciseDays.map((workout, index) => (
                <section
                  onClick={() => changeRoutine(index)}
                  key={index}
                  className="flex justify-center py-5"
                >
                  <h2 className="cursor-pointer">{workout.description}</h2>
                </section>
              ))
            ) : (
              <section className="flex justify-center py-5">
                <h2 className="cursor-pointer">No hay rutina</h2>
              </section>
            )}
            <div className="flex justify-center py-5">
              <Link
                to="/add-routine"
                className="rounded-lg bg-gray-600 text-white py-2 px-6 flex font-medium hover:bg-gray-500"
              >
                Añadir Rutina
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full">
          <h1 className="font-bold text-gray-800">PUSH A - 20 SERIES</h1>
          <ul className="flex flex-col w-full h-3/4 rounded-3xl border p-4 shadow-md divide-y divide-gray-200 overflow-y-scroll">
            {exercices.length > 0 ? (
              exercices.map((exercice, index) => (
                <li key={index} className="flex flex-col gap-x-6 py-5">
                  {
                    <>
                      <div className="flex justify-between">
                        <span className="font-semibold">1 Serie</span>
                        <div className="flex gap-4 items-center">
                          <span>{exercice.reps} REPS</span>
                          <span>{exercice.rir} RIR</span>
                          <ButtonThreDots />
                        </div>
                      </div>
                      <section>
                        <h3 className="font-light text-sm">{exercice.name}</h3>
                      </section>
                    </>
                  }
                </li>
              ))
            ) : (
              <CircleLoading />
            )}
            <div className="flex justify-end gap-x-6 py-5">
              <Link
                to="/add-exercice"
                className="rounded-lg bg-gray-600 text-white py-2 px-6 flex font-medium hover:bg-gray-500"
              >
                Añadir Ejercicio
              </Link>
            </div>
          </ul>
        </section>
      </div>
    </section>
  );
}

export default TaskPage;
