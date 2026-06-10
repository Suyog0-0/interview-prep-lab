import { InterviewQuestion } from "../../types";
import { getDayQuestionsP1 } from "./leapfrog_daily_content_p1";
import { getDayQuestionsP2 } from "./leapfrog_daily_content_p2";

export function getDayQuestions(dayNum: number): InterviewQuestion[] {
  if (dayNum >= 1 && dayNum <= 10) {
    // Days 1 to 10
    // We make an exception for day 7 which is handled in P2 for convenience
    if (dayNum === 7) return getDayQuestionsP2(7);
    return getDayQuestionsP1(dayNum);
  } else if (dayNum >= 11 && dayNum <= 21) {
    // Days 11 to 21
    return getDayQuestionsP2(dayNum);
  }
  
  return [];
}
