import React, { useState } from "react";
import { StreamCopyUsage } from "three";

const Parts = ({ obj }) => {
  const parts = obj["object"]["children"];
  const partsList = parts.map((part) => <button>{part.name}</button>);
  console.log(parts);
  return (
    <div>
      <p>Model Parts</p>
      {partsList}
    </div>
  );
};

const TutorialEditor = ({ parts, handleSubmit }) => {
  const [steps, setSteps] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [selection, setSelection] = useState("None");

  const selectionStyle = {};
  const allSteps = steps.map((step) => (
    <li key={step.id}>
      {step.part} - {step.text}
    </li>
  ));
  const allParts = parts.map((part) => (
    <option value={part.name}>{part.name}</option>
  ));

  const handleStepChange = (event) => {
    setInstruction(event.target.value);
  };

  const handlePartChange = (event) => {
    setSelection(event.target.value);
  };

  const addStep = () => {
    setSteps([
      ...steps,
      {
        id: steps.length,
        text: instruction,
        part: selection,
      },
    ]);
    setInstruction("");
    setSelection("None");
  };

  const submitTutorial = () => {
    console.log(steps);
    handleSubmit(steps);
  };

  return (
    <div>
      <form>
        <ol>{allSteps}</ol>
        <label htmlFor="tutorialStep">Write your instruction</label>
        <input
          type="text"
          name="tutorialStep"
          id="tutorialStep"
          value={instruction}
          onChange={handleStepChange}
        />
        <label>
          Select a part of the model to highlight
          <select value={selection} onChange={handlePartChange}>
            <option value="None">None</option>
            {allParts}
          </select>
        </label>
        <input type="button" value="Create new step" onClick={addStep} />
        <input type="button" value="Submit tutorial" onClick={submitTutorial} />
      </form>
    </div>
  );
};

const Panel = ({ obj, handleSubmit }) => {
  if (!obj) {
    return <p>Select a model</p>;
  } else {
    const parts = obj["object"]["children"];
    return parts ? (
      <TutorialEditor parts={parts} handleSubmit={handleSubmit} />
    ) : null;
  }
};

export default Panel;
