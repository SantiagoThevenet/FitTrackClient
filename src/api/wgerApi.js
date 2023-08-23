import axios from "axios";

const apiUrl = "https://wger.de/api/v2/";
const accessToken = "d7d9235232061142c8bd021e40f90e7a8ad3ebd0";
let exercise_base = []
let exercises = []

const headers = {
    Authorization: `Token ${accessToken}`
}

export const fetchWorkouts = () => {
    return axios.get(`${apiUrl}workout/`, { headers })
}

export const fetchExerciseDays = (workoutId) => {
    return axios.get(`${apiUrl}day/?training=${workoutId}`, { headers });
};

export const fetchSets = (exerciseDayId) => {
    return axios.get(`${apiUrl}set/?exerciseday=${exerciseDayId}`, { headers });
};

export const fetchSettingSets = async (settingSetId) => {
    async function fetchAllData() {
        for (const id of settingSetId) {
            const {data} = await axios.get(`${apiUrl}setting/?set=${id.id}`, { headers });
            exercise_base.push(data.results[0].exercise_base)
        }
    }
    
    await fetchAllData();
    return exercise_base
};

export const fetchExerciseBaseInfo = async (exercise_base_id) => {
    async function fetchAllData() {
        for (const id of exercise_base_id) {
            const {data} = await axios.get(`${apiUrl}exercisebaseinfo/${id}`, { headers });
            exercises.push(data.exercises[0].name)
        }
    }
    
    await fetchAllData();
    return exercises

};
