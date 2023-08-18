import axios from "axios";

const apiUrl = "https://wger.de/api/v2/workout/";
const accessToken = "d7d9235232061142c8bd021e40f90e7a8ad3ebd0";

const headers = {
  Authorization: `Token ${accessToken}`,
};

axios
  .get(apiUrl, { headers })
  .then((response) => {
    console.log("Respuesta de la API:", response.data);
  })
  .catch((error) => {
    console.error("Error al hacer la solicitud:", error);
  });

function HomePage() {
  return (
    <section className="flex justify-center items-center flex-col bg-landing-page bg-black-gradient h-[80vh] bg-left-top bg-cover text-white">
      <h1 className="text-9xl font-semibold">FIT TRACK</h1>
      <h3 className="text-center font-light text-2xl text-gray-200">
        Tailored Gym Routines for a Stronger You
        <br />
        Unlock Your Potential
      </h3>
    </section>
  );
}

export default HomePage;
