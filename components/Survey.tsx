// import React, { useState } from 'react';
// import { Card, Button, Radio, Spacer, CardHeader, CardBody, RadioGroup, CardFooter } from "@nextui-org/react";

// interface SurveyProps {
//   question: string;
//   options: string[];
//   onSubmit: (answer: string) => void;
//   isLoading: boolean;
// }

// const Survey: React.FC<SurveyProps> = ({ question, options, onSubmit, isLoading }) => {
//   const [selectedOption, setSelectedOption] = useState<string>('');

//   const handleChange = (value: string) => {
//     setSelectedOption(value);
//   };

//   const handleSubmit = () => {
//     if (selectedOption && !isLoading) {
//       onSubmit(selectedOption);
//     }
//   };

//   return (
//     <Card className="max-w-[400px]">
//       <CardHeader className="flex gap-3">
//         <h3>{question}</h3>
//       </CardHeader>
//       <CardBody>
//         <RadioGroup value={selectedOption} onValueChange={handleChange}>
//           {options.map((option, index) => (
//             <Radio key={index} value={option}>
//               {option}
//             </Radio>
//           ))}
//         </RadioGroup>
//       </CardBody>
//       <CardFooter>
//         <Spacer y={1} />
//         <Button 
//           disabled={!selectedOption || isLoading} 
//           onPress={handleSubmit}
//         >
//           Submit
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default Survey;
import React, { useState } from 'react';
import { Card, Button, Radio, Spacer, CardHeader, CardBody, RadioGroup, CardFooter } from "@nextui-org/react";

interface SurveyProps {
  question: string;
  options: string[];
  onSubmit: (answer: string) => void;
  isLoading: boolean;
  isLastQuestion: boolean;
}

const Survey: React.FC<SurveyProps> = ({ question, options, onSubmit, isLoading, isLastQuestion }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleSubmit = () => {
    if (selectedOption && !isLoading) {
      onSubmit(selectedOption);
    }
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <h3>{question}</h3>
      </CardHeader>
      <CardBody>
        <RadioGroup value={selectedOption} onValueChange={handleChange}>
          {options.map((option, index) => (
            <Radio key={index} value={option}>
              {option}
            </Radio>
          ))}
        </RadioGroup>
      </CardBody>
      <CardFooter>
        <Spacer y={1} />
        <Button 
          disabled={!selectedOption || isLoading} 
          onPress={handleSubmit}
        >
          {isLastQuestion ? 'Submit' : 'Next'} {/* Change button text based on isLastQuestion */}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Survey;