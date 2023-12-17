const Feedback = () => {
  return (
    <>
      <h2>
        <button
          className="btn btn-ghost hover:underline hover:bg-transparent"
          onClick={() =>
            (
              document.getElementById("contacto") as HTMLDialogElement
            )?.showModal()
          }
        >
          Tens alguma sugestão?
        </button>
      </h2>
      <dialog id="contacto" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Tu aí!</h3>
          <p className="py-4">
            Se tens alguma sugestão para te podermos servir melhor, contacta-nos
            através do email&nbsp;
            <b>uachadomachado@gmail.com</b>!
          </p>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Entendido!</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Feedback;
