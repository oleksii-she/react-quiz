// import styles from "./test.module.scss";
import { nanoid } from "nanoid";
import { useState } from "react";

export const AddQuestion = () => {
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState("");
  const [visableInputAnswer, setVisibleInputAnswer] = useState(false);
  const [answerValue, setAnswerValue] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [blockButton, setBlockButton] = useState(false);
  const [edited, setEdited] = useState("");

  const numberAssignment = () => {
    let number;
    let color;
    switch (answers.length) {
      case 0:
        number = "A";
        color = "bg-green-700";
        return { number, color };
      case 1:
        number = "B";
        color = "bg-blue-700";
        return { number, color };
      case 2:
        number = "C";
        color = "bg-violet-700";
        return { number, color };
      case 3:
        number = "D";
        color = "bg-fuchsia-700";
        return { number, color };
      case 4:
        number = "E";
        color = "bg-rose-700";
        return { number, color };

      default:
        break;
    }
  };
  const addAnswer = () => {
    if (answers.length === 5 || answerValue.trim() === "") {
      return console.log("Ooops");
    }
    const { number, color } = numberAssignment();

    console.log(number, "number", color, ":color");
    let newAnswer = {
      id: nanoid(),
      answer: answerValue,
      number: number,
      color: color,
      truth: false,
    };

    setAnswers((prValue) => [newAnswer, ...prValue]);
    setAnswerValue("");
  };
  console.log(answers.length, answers, "newAnswer");

  const handlerCorrectAnswer = (id) => {
    const trueId = answers.filter((el) => {
      let newArray = [];
      if (el.id === id) {
        el.truth = true;
        setSelectedAnswer(el.answer);
        newArray.push(el);
      }
      if (el.id !== id) {
        newArray.push(el);
      }

      return newArray;
    });
    setBlockButton(true);
    setAnswers(trueId);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (answers.length < 2) {
      return console.log("There must be at least two answers");
    }
    const newObj = {
      id: nanoid(),
      question,
      answers,
    };

    const getItems = window.localStorage.getItem("questions");

    if (!getItems) {
      window.localStorage.setItem("questions", JSON.stringify([newObj]));
    } else {
      const itemsParse = JSON.parse(getItems);
      const newData = [...itemsParse, newObj];

      window.localStorage.setItem("questions", JSON.stringify(newData));
    }
  };

  const reselectAnswer = () => {
    const cancellation = answers.filter((el) => {
      if (el.truth === true) {
        el.truth = false;
        setBlockButton(false);
      }
      return el;
    });

    setAnswers(cancellation);
  };

  return (
    <form className="mx-auto" onSubmit={onSubmit}>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Question
        </label>

        <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="write a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        ></textarea>
      </div>
      {visableInputAnswer && (
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Write the answer
          </label>
          <input
            type="text"
            id="add-answer"
            value={answerValue}
            onChange={(e) => setAnswerValue(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            // required
          />
        </div>
      )}

      {answers && (
        <div>
          <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Click on the correct answer
          </h3>
          <div className="flex">
            {answers.map((el) => (
              <div key={el.id} className="flex flex-col items-center">
                <button
                  type="button"
                  disabled={blockButton}
                  onClick={() => handlerCorrectAnswer(el.id)}
                  className={
                    blockButton
                      ? `block font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 bg-gray-700 text-white `
                      : `text-white ${el.color} font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300`
                  }
                >
                  {el.number}) {el.answer}
                </button>

                <button
                  className={`text-white ${el.color} font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300`}
                  onClick={() => {
                    setEdited(el.id);
                    setAnswerValue(el.answer);

                    if (edited === el.id) {
                      const newValue = answers.filter((answer) => {
                        if (answer.id === el.id) {
                          answer.answer = answerValue;
                        }
                        return answer;
                      });

                      setAnswers(newValue);
                    }
                  }}
                  type="button"
                >
                  {edited === el.id ? "Edited" : "Edited question"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const deleteId = answers.filter((answer) => {
                      if (el.id === answer.id) {
                        if (el.truth === true) {
                          reselectAnswer();
                        }
                      }
                      if (answer.id !== el.id) {
                        return answer;
                      }
                    });
                    setAnswers(deleteId);
                  }}
                  className={`text-white ${el.color} font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300`}
                >
                  Delete question
                </button>
              </div>
            ))}
          </div>
          {blockButton && selectedAnswer && (
            <div className="flex items-center">
              <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                selectedAnswer:{selectedAnswer}
              </p>
              <button
                type="button"
                onClick={() => reselectAnswer()}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-3"
              >
                Re-elect
              </button>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        className={
          "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        }
        onClick={() => setVisibleInputAnswer(!visableInputAnswer)}
      >
        {!visableInputAnswer ? "Add a answer" : "Cancell"}
      </button>

      {visableInputAnswer && (
        <button
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => addAnswer()}
        >
          Add a answer
        </button>
      )}
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add question
      </button>
    </form>
  );
};

// import styles from "./test.module.scss";
// import { nanoid } from "nanoid";
// import { useState } from "react";

// export const AddQuestion = () => {
//   const [answers, setAnswers] = useState([]);
//   const [visableInputAnswer, setVisibleInputAnswer] = useState(false);
//   const [answerValue, setAnswerValue] = useState("");
//   const [selectedAnswer, setSelectedAnswer] = useState("");
//   const [blockButton, setBlockButton] = useState(false);

//   const numberAssignment = () => {
//     let number;
//     let color;
//     switch (answers.length) {
//       case 0:
//         number = "A";
//         color = "bg-green-700";
//         return { number, color };
//       case 1:
//         number = "B";
//         color = "bg-blue-700";
//         return { number, color };
//       case 2:
//         number = "C";
//         color = "bg-violet-700";
//         return { number, color };
//       case 3:
//         number = "D";
//         color = "bg-fuchsia-700";
//         return { number, color };
//       case 4:
//         number = "E";
//         color = "bg-rose-700";
//         return { number, color };
//       default:
//         break;
//     }
//   };

//   const addAnswer = () => {
//     if (answers.length === 5 || answerValue.trim() === "") {
//       return console.log("Ooops");
//     }
//     const { number, color } = numberAssignment();

//     let newAnswer = {
//       id: nanoid(),
//       answer: answerValue,
//       number: number,
//       color: color,
//       truth: false,
//     };

//     setAnswers((prevAnswers) => [newAnswer, ...prevAnswers]);
//     setAnswerValue("");
//   };

//   const handlerCorrectAnswer = (id) => {
//     const updatedAnswers = answers.map((el) =>
//       el.id === id ? { ...el, truth: true } : { ...el, truth: false }
//     );
//     const correctAnswer = updatedAnswers.find((el) => el.id === id);
//     setSelectedAnswer(correctAnswer.answer);
//     setBlockButton(true);
//     setAnswers(updatedAnswers);
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//   };

//   const reselectAnswer = () => {
//     const updatedAnswers = answers.map((el) => ({ ...el, truth: false }));
//     setBlockButton(false);
//     setAnswers(updatedAnswers);
//   };

//   const handleInputChange = (id, value) => {
//     const updatedAnswers = answers.map((answer) =>
//       answer.id === id ? { ...answer, answer: value } : answer
//     );
//     setAnswers(updatedAnswers);
//   };

//   const handleDeleteAnswer = (id) => {
//     const updatedAnswers = answers.filter((answer) => answer.id !== id);
//     setAnswers(updatedAnswers);
//   };

//   return (
//     <form className="mx-auto" onSubmit={onSubmit}>
//       <div className="mb-5">
//         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//           Question
//         </label>
//         <textarea
//           id="message"
//           rows="4"
//           className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//           placeholder="Write a question..."
//         ></textarea>
//       </div>

//       {visableInputAnswer && (
//         <div className="mb-5">
//           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//             Write the answer
//           </label>
//           <input
//             type="text"
//             id="add-answer"
//             value={answerValue}
//             onChange={(e) => setAnswerValue(e.target.value)}
//             className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//             required
//           />
//         </div>
//       )}

//       {answers.length > 0 && (
//         <div>
//           <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//             Click on the correct answer
//           </h3>
//           <div className="flex flex-wrap">
//             {answers.map((el) => (
//               <div key={el.id} className="flex flex-col items-center m-2">
//                 <input
//                   type="text"
//                   value={el.answer}
//                   onChange={(e) => handleInputChange(el.id, e.target.value)}
//                   className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2`}
//                   disabled={blockButton}
//                 />
//                 <button
//                   type="button"
//                   disabled={blockButton}
//                   onClick={() => handlerCorrectAnswer(el.id)}
//                   className={`text-white ${
//                     el.color
//                   } font-medium rounded-lg text-sm px-5 py-2.5 mb-2 hover:bg-opacity-75 focus:outline-none ${
//                     blockButton ? "bg-gray-700" : ""
//                   }`}
//                 >
//                   {el.number}) Mark as Correct
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => handleDeleteAnswer(el.id)}
//                   className={`text-white ${el.color} font-medium rounded-lg text-sm px-5 py-2.5 mb-2 hover:bg-opacity-75 focus:outline-none`}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>

//           {blockButton && selectedAnswer && (
//             <div className="flex items-center mt-4">
//               <p className="block text-sm font-medium text-gray-900 dark:text-white">
//                 Selected Answer: {selectedAnswer}
//               </p>
//               <button
//                 type="button"
//                 onClick={reselectAnswer}
//                 className="ml-3 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
//               >
//                 Re-select
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       <button
//         type="button"
//         className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
//         onClick={() => setVisibleInputAnswer(!visableInputAnswer)}
//       >
//         {visableInputAnswer ? "Cancel" : "Add an answer"}
//       </button>

//       {visableInputAnswer && (
//         <button
//           type="button"
//           className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
//           onClick={addAnswer}
//         >
//           Add Answer
//         </button>
//       )}
//       <button
//         type="submit"
//         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//       >
//         Add Question
//       </button>
//     </form>
//   );
// };
