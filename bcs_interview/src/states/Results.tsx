import { useEffect, useState } from "react";

export function Results(props){

    const [apiResponse, setapiResponse] = useState(null)
    const [feedback, setFeedback] = useState(null)
    const [rating, setRating] = useState(0);

  //feedback, rating

    useEffect(()=>{

        (async function(){
            const response = await props.openai.createCompletion({
              model: "text-davinci-003",
              prompt: `You are the interviewer at a company and you are conducting a behavioural interview. You have a rating system from 0 (weakest response) to 5 (strongest response) with the possibility of 0.5, 1.5, 2.5, 3.5, and 4.5 ratings depending on the interviewee answer. Please provide a json object with only a rating and feedback, including areas of improvement, that addresses the interviewee to this interview question and response
              \n Question: ${props.question}
              \n Answer: ${props.userAnswer}`,
              temperature: 0,
              max_tokens: 2000,
            });
                
            setapiResponse(response.data.choices[0].text);


            console.log(response)
            console.log(response.data.choices[0].text);
            const jsonObject = JSON.parse(response.data.choices[0].text);
            console.log(jsonObject);
            try{
              setRating(jsonObject.rating);
              setFeedback(jsonObject.rating);
            } catch {

            }
        })();

    },[]);

    return(
    <div>
        <p>Question: {props.question}</p>
        <p>this is the results page component</p>
        <p>Rating: {rating}</p>
        <p>Feedback: {feedback}</p>
        <p>Your transcribed answer: {props.userAnswer}</p>
        <p>{apiResponse}</p>
    </div>);
}