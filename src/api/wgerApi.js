import axios from "axios";

const apiUrl = "https://wger.de/api/v2/";
const accessToken = "d7d9235232061142c8bd021e40f90e7a8ad3ebd0";

const headers = {
    Authorization: `Token ${accessToken}`
};

export const fetchWorkouts = () => {
    return axios.get(`${apiUrl}workout/`, { headers });
};

export const fetchExerciseDays = (workoutId) => {
    return axios.get(`${apiUrl}day/?training=${workoutId}`, { headers });
};

export const fetchSets = (exerciseDayId) => {
    return axios.get(`${apiUrl}set/?exerciseday=${exerciseDayId}`, { headers });
};

export const fetchSettingSets = async (settingSetIds) => {
    const promesasBasesEjercicio = settingSetIds.map(async (id) => {
        const { data } = await axios.get(`${apiUrl}setting/?set=${id.id}`, { headers });
        return data.results.map(result => ({
            exercise_base: result.exercise_base,
            reps: result.reps,
            rir: result.rir
        }));
    });

    const datosBasesEjercicio = await Promise.all(promesasBasesEjercicio);
    const basesEjercicio = datosBasesEjercicio.flat();
    return basesEjercicio;
};

export const fetchExerciseBaseInfo = async (exerciseBaseIds) => {
    const promesasInfoEjercicio = exerciseBaseIds.map(async (id) => {
        const { data } = await axios.get(`${apiUrl}exercisebaseinfo/${id.exercise_base}`, { headers });
        return {
            name: data.exercises[0].name,
            reps: id.reps,
            rir: id.rir
        };
    });

    const datosInfoEjercicio = await Promise.all(promesasInfoEjercicio);
    return datosInfoEjercicio;
};



export const searchExercice = async (word) => {
    try {
        const { data } = await axios.get(`${apiUrl}exercise/search/?language=es,en&term=${word}`, { headers });
        return data.suggestions
    } catch (error) {
        console.error(`An error occurred while getting exercise with word ${word}:`, error);
    }
};
export const createNewRoutine = async ({ day, description, training }) => {
    try {
        const response = await axios.post(`${apiUrl}day/`,
            {
                day,
                description,
                training
            },
            { headers })
        return response

    } catch (error) {
        console.error(error)
    }
}

// export const postPrueba = async (data) => {
//     try {
//         const response = await axios.post(`${apiUrl}setting/`, {
//             "id": 792401,
//             "set": 180015,
//             "exercise_base": data.base_id,
//             "repetition_unit": 1,
//             "reps": data.repetitions,
//             "weight": data.weight,
//             "weight_unit": 1,
//             "rir": data.rir,
//             "order": 1,
//             "comment": ""
//         }, { headers })
//         return response
//     } catch (error) {
//         console.error(error)
//     }
// }
