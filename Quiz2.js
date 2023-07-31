const mongoose=require("mongoose")
const QuizSchema2=new mongoose.Schema({
    email:String,
    question1:String,
    option1:String,
    option2:String,
    option3:String,
    answer1:String,
    question2:String,
    option4:String,
    option5:String,
    option6:String,
    answer2:String,
    question3:String,
    option7:String,
    option8:String,
    option9:String,
    answer3:String  
},
{
    collection:"quizinfo2"
})
mongoose.model("quizinfo2",QuizSchema2);