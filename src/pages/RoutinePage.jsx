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

function RoutinePage() {
  const [exerciseDays, setExerciseDays] = useState([]);
  const [exerciceSelected, setExerciceSelected] = useState(0);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(0);
  const [selectedExerciseDayId, setSelectedExerciseDayId] = useState(0);
  const [settingSetId, setSettingSetId] = useState(0);
  const [exerciseBaseId, setExerciseBaseId] = useState([]);
  const [exercices, setExercices] = useState([]);
  const [workoutNameSelected, setWorkoutNameSelected] = useState("");
  const [contentExists, setContentExists] = useState(true);

  useEffect(() => {
    fetchWorkouts()
      .then(({ data }) => {
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
          setWorkoutNameSelected(data.results[exerciceSelected].description);
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
          if (data.results.length > 0) {
            setSettingSetId(data.results);
          } else {
            setContentExists(false);
          }
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
    let cont = 0;
    if (exerciseBaseId.length > 0) {
      fetchExerciseBaseInfo(exerciseBaseId)
        .then(async (data) => {
          data.map((i) => (cont += i.reps));
          setExercices(data);
        })
        .catch((error) => {
          console.error("Error fetching exercices:", error);
        });
    }
  }, [exerciseBaseId]);
  async function changeRoutine(index) {
    await setExercices([]);
    await setExerciceSelected(index);
  }
  return (
    <section className="bgroutine flex justify-center items-center bg-landing-page bg-black-gradient h-screen text-gray-100 px-72 ">
      <div className="h-3/4 w-full flex gap-2">
        <section className="w-1/4">
          <h1 className="font-semibold text-gray-100">Your routines</h1>
          <div className="h-3/4 backdrop-blur-3xl rounded-3xl flex flex-col p-4 overflow-y-scroll custom-scrollbar">
            {exerciseDays.length > 0 ? (
              exerciseDays.map((workout, index) => (
                <section
                  onClick={() => changeRoutine(index)}
                  key={index}
                  className="flex justify-center py-5"
                >
                  <h2 className="cursor-pointer text-stone-200">{workout.description}</h2>
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
                className="rounded-lg bg-stone-900 text-stone-100 py-2 px-6 flex font-medium hover:bg-stone-800"
              >
                Add Routine
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full">
          <h1 className="font-semibold text-gray-100">
            {workoutNameSelected}:{" "}
            {exercices[0]?.sets.reduce((sum, item) => sum + item, 0)} sets
          </h1>
          <ul className="flex flex-col w-full h-3/4 rounded-3xl p-4 backdrop-blur-3xl divide-y divide-stone-700 overflow-y-scroll custom-scrollbar">
            {exercices.length > 0 ? (
              exercices.map((exercice, index) => (
                <li key={index} className="flex flex-col gap-x-6 py-5">
                  {
                    <>
                      <div className="flex justify-between">
                        <span className="font-semibold text-stone-200">
                          {" "}
                          Sets: {exercice.sets[index]}
                        </span>
                        <div className="flex gap-4 items-center">
                          <span className="text-stone-100">{exercice.reps} REPS</span>
                          <span className="text-stone-100">{exercice.rir} RIR</span>
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
            ) : contentExists === true ? (
              <CircleLoading />
            ) : contentExists === false ? (
              <section className="flex justify-center py-5">
                <h2 className="cursor-pointer">No hay ejercicios</h2>
              </section>
            ) : null}
            <div className="flex justify-end gap-x-6 py-5">
              <Link
                to={`/add-exercice/${selectedExerciseDayId}`}
                className="rounded-lg bg-stone-700 text-stone-100 py-2 px-6 flex font-medium hover:bg-stone-800"
              >
                Add Exercice
              </Link>
            </div>
          </ul>
        </section>
      </div>
    </section>
  );
}

export default RoutinePage;
