import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Index = () => {
  const [selectedTable, setSelectedTable] = useState(2);
  const [maxNumber, setMaxNumber] = useState(10);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(0);

  useEffect(() => {
    generateQuestion();
  }, [selectedTable]);

  const generateQuestion = () => {
    const multiplicand = Math.floor(Math.random() * maxNumber) + 1;
    const multiplier = Math.floor(Math.random() * maxNumber) + 1;
    setCurrentQuestion({
      multiplicand,
      multiplier,
      answer: multiplicand * multiplier
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(userAnswer) === currentQuestion.answer) {
      setScore(score + 1);
    }
    setQuestionsAsked(questionsAsked + 1);
    setUserAnswer('');
    generateQuestion();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">Multiplication Quiz</h1>
        
        <div className="mb-4">
          <Label htmlFor="max-number">Maximum Number</Label>
          <Select onValueChange={(value) => setMaxNumber(parseInt(value))} defaultValue="10">
            <SelectTrigger>
              <SelectValue placeholder="Select maximum number" />
            </SelectTrigger>
            <SelectContent>
              {[10, 12, 15, 20].map((num) => (
                <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="mb-4">
          <p className="text-xl font-semibold">
            {currentQuestion.multiplicand} × {currentQuestion.multiplier} = ?
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="answer">Your Answer</Label>
            <Input
              type="number"
              id="answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Submit</Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-lg">Score: {score} / {questionsAsked}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
