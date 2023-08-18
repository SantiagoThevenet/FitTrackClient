function TaskPage() {
  return (
    <section className="flex justify-center items-center bg-landing-page bg-black-gradient h-[85vh] bg-left-top bg-cover text-white px-72">
      <div className="h-3/4 w-full flex gap-2">
        <div className="w-1/5">
          <h1 className="font-bold text-gray-100">TUS RUTINAS</h1>
          <div className="h-3/4 backdrop-blur-3xl rounded-3xl flex flex-col gap-6 border-gray-600 border-2">
            <div className="flex justify-center">
              <h2 className="hover:bg-slate-600 cursor-pointer">Push A</h2>
            </div>
            <div className="flex justify-center">
              <h2 className="hover:bg-slate-600 cursor-pointer">Push A</h2>
            </div>
            <div className="flex justify-center">
              <h2 className="hover:bg-slate-600 cursor-pointer">Push A</h2>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h1 className="font-bold text-gray-100">PUSH A - 20 SERIES</h1>
          <div className="flex flex-col gap-6 w-full h-3/4 rounded-3xl border-gray-700 border-2 p-4">
            <div className="flex flex-col hover:bg-slate-700">
              <div className="flex justify-between">
                <span>1 Serie</span>
                <div className="flex gap-4">
                  <span>5-7 REPS</span>
                  <span>2 RIR</span>
                </div>
              </div>
              <div>
                <h3>Hack Squat</h3>
              </div>
            </div>
            <div className="flex flex-col hover:bg-slate-700">
              <div className="flex justify-between">
                <span>1 Serie</span>
                <div className="flex gap-4">
                  <span>5-7 REPS</span>
                  <span>2 RIR</span>
                </div>
              </div>
              <div>
                <h3>Hack Squat</h3>
              </div>
            </div>
            <div className="flex flex-col hover:bg-slate-700">
              <div className="flex justify-between">
                <span>1 Serie</span>
                <div className="flex gap-4">
                  <span>5-7 REPS</span>
                  <span>2 RIR</span>
                </div>
              </div>
              <div>
                <h3>Hack Squat</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TaskPage;
