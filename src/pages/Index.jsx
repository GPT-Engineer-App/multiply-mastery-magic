import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Index = () => {
  const [selectedTable, setSelectedTable] = useState(2);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [questionQueue, setQuestionQueue] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted) {
      generateQuestion();
    }
  }, [quizStarted]);

  const generateQuestion = () => {
    if (questionQueue.length > 0) {
      setCurrentQuestion(questionQueue[0]);
      setQuestionQueue(questionQueue.slice(1));
    } else {
      const multiplier = questionsAsked % 10 + 1;
      setCurrentQuestion({
        multiplicand: selectedTable,
        multiplier,
        answer: selectedTable * multiplier
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(userAnswer) === currentQuestion.answer) {
      setScore(score + 1);
    } else {
      setQuestionQueue([...questionQueue, currentQuestion]);
    }
    setQuestionsAsked(questionsAsked + 1);
    setUserAnswer('');
    generateQuestion();
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setScore(0);
    setQuestionsAsked(0);
    setQuestionQueue([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">Multiplication Quiz</h1>
        
        {!quizStarted ? (
          <div className="mb-4">
            <Label htmlFor="table-select">Select Table</Label>
            <Select onValueChange={(value) => setSelectedTable(parseInt(value))} defaultValue="2">
              <SelectTrigger>
                <SelectValue placeholder="Select table" />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={startQuiz} className="w-full mt-4">Start Quiz</Button>
          </div>
        ) : (
          <>
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
              <p className="text-sm mt-2">Questions remaining: {10 - (questionsAsked % 10) + questionQueue.length}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
